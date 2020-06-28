const windowsCmd = ["cmd", "/c"];

/**
 * Builds a subprocess for Windows environments.
 * @param command Command to be wrapped
 * @param dir Directory for context
 * @param stdout Stdout to be used
 */
function createProcessWindows(
  command: string[],
  dir?: string,
  stdout?: "piped",
) {
  return Deno.run({
    cmd: [...windowsCmd, ...command],
    cwd: dir,
    stdout,
  });
}

/**
 * Checks if NPM is installed within a Windows environment.
 * @param versionParam version flag for NPM
 */
export async function checkInstalledWindows(
  versionParam: string = "--version",
): Promise<boolean> {
  const p = createProcessWindows(["npm", versionParam], Deno.cwd(), "piped");
  const { success } = await p.status();
  p.close();
  return success;
}

/**
 * Attempts to restore NPM packages.
 * @param dir Directory containing packages.json
 */
export async function restorePackagesWindows(
  dir: string = Deno.cwd(),
): Promise<boolean> {
  const p = createProcessWindows(["npm", "install"], dir);
  const { success } = await p.status();
  p.close();
  return success;
}

/**
 * Attempts to run a NPM script.
 * @param scriptName Script to be executed
 * @param dir Directory containing packages.json
 */
export async function runScriptWindows(
  scriptName: string,
  dir: string = Deno.cwd(),
) {
  const p = createProcessWindows(["npm", "run", scriptName], dir);
  const { success } = await p.status();
  p.close();
  return success;
}

/**
 * Attempts to run a NPM Command.
 * @param params Execution params, defaults to --version
 * @param dir Directory for context
 * @param verbose Flag to hide/show NPM output
 */
export async function runNpmWindows(
  params: string[] = ["--version"],
  dir: string = Deno.cwd(),
  verbose: boolean = false,
): Promise<boolean> {
  const p = createProcessWindows(
    ["npm", ...params],
    dir,
    verbose ? "piped" : undefined,
  );
  const { success } = await p.status();
  p.close();
  return success;
}
