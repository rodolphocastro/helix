/**
 * Builds a subprocess for Linux environments.
 * @param command Command to be wrapped
 * @param dir Directory for context
 * @param stdout Stdout to be used
 */
function createProcessLinux(
  command: string[],
  dir?: string,
  stdout?: "piped",
) {
  return Deno.run({
    cmd: [...command],
    cwd: dir,
    stdout,
  });
}

/**
 * Checks if NPM is installed within a Linux environment.
 * @param versionParam version flag for NPM
 */
export async function checkInstalledLinux(
  versionParam: string = "--version",
): Promise<boolean> {
    try {
        const p = createProcessLinux(["npm", versionParam], Deno.cwd(), "piped");
        const { success } = await p.status();
        p.close();
        return success;
    } catch (err) {
        console.error(err);
        return false;
    }
}

/**
 * Attempts to restore NPM packages.
 * @param dir Directory containing packages.json
 */
export async function restorePackagesLinux(
  dir: string = Deno.cwd(),
): Promise<boolean> {
  const p = createProcessLinux(["npm", "install"], dir);
  const { success } = await p.status();
  p.close();
  return success;
}

/**
 * Attempts to run a NPM script.
 * @param scriptName Script to be executed
 * @param dir Directory containing packages.json
 */
export async function runScriptLinux(
  scriptName: string,
  dir: string = Deno.cwd(),
) {
  const p = createProcessLinux(["npm", "run", scriptName], dir);
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
export async function runNpmLinux(
  params: string[] = ["--version"],
  dir: string = Deno.cwd(),
  verbose: boolean = false,
): Promise<boolean> {
  const p = createProcessLinux(
    ["npm", ...params],
    dir,
    verbose ? "piped" : undefined,
  );
  const { success } = await p.status();
  p.close();
  return success;
}
