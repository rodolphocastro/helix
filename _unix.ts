import { NpmWrapper, createVersionCommand, RunnableCommand } from "./_utils.ts";

class LinuxWrapper implements NpmWrapper {
  /**
 * Builds a subprocess for Linux environments.
 * @param command Command to be wrapped
 * @param dir Directory for context
 * @param stdout Stdout to be used
 */
  private createProcessLinux(
    command: string[],
    stdout?: "piped" | "inherit",
    dir?: string,
  ) {
    return Deno.run({
      cmd: [...command],
      cwd: dir,
      stdout,
    });
  }

  async isInstalled() {
    const { argsChain, output } = createVersionCommand();
    try {
      const p = this.createProcessLinux(
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
      const p = this.createProcessLinux(
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
 * Creates a new NPM Wrapper for Linux environments.
 */
export function createLinuxWrapper(): NpmWrapper {
  return new LinuxWrapper();
}
