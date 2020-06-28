import { NpmWrapper, RunnableCommand, createVersionCommand } from "./_utils.ts";

class WindowsWraper implements NpmWrapper {
  private readonly windowsCmd = ["cmd", "/c"];

  /**
 * Builds a subprocess for Windows environments.
 * @param command Command to be wrapped
 * @param dir Directory for context
 * @param stdout Stdout to be used
 */
  private createProcessWindows(
    command: string[],
    stdout?: "piped" | "inherit",
    dir?: string,
  ) {
    return Deno.run({
      cmd: [...this.windowsCmd, ...command],
      cwd: dir,
      stdout,
    });
  }

  async isInstalled() {
    const { argsChain, output } = createVersionCommand();
    try {
      const p = this.createProcessWindows(
        argsChain,
        output,
      );
      const { success } = await p.status();
      p.close();
      return success;
    } catch {
      return false;
    }
  }

  async run(cmd: RunnableCommand) {
    const { dir = Deno.cwd(), argsChain, output } = cmd;
    try {
      const p = this.createProcessWindows(
        argsChain,
        output,
        dir,
      );
      const { success } = await p.status();
      p.close();
      return success;
    } catch {
      return false;
    }
  }
}

/**
 * Creates a new NPM wrapper for Windows environments.
 */
export function createWindowsWrapper(): NpmWrapper {
  return new WindowsWraper();
}
