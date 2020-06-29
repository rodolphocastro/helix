import {
  isUnix,
  NpmWrapper,
  createRestoreCommand,
  createScriptCommand,
  createGenericCommand,
  NpmCommand,
} from "./_utils.ts";
import {
  createWindowsWrapper,
} from "./_windows.ts";
import {
  createLinuxWrapper,
} from "./_unix.ts";

function createWrapper(): NpmWrapper {
  return isUnix() ? createLinuxWrapper() : createWindowsWrapper();
}

export {
  NpmCommand,
  RestorePackagesCommand,
  RunScriptCommand,
} from "./_utils.ts";

/**
 * Checks if NPM is installed and available. This requires the --allow-run permission.
 */
export function isNpmInstalled(): Promise<boolean> {
  const wrapper = createWrapper();
  return wrapper.isInstalled();
}

/**
 * Restore packages for a given Directory. This requires the --allow-run permission.
 * @param dir Directory containing packages.json
 */
export function restoreNpmPackages(dir?: string): Promise<boolean> {
  dir = dir ?? Deno.cwd();
  const wrapper = createWrapper();
  const command = createRestoreCommand(dir);
  return wrapper.run(command);
}

/**
 * Runs a NPM Script via "npm run <script>". This requires the --allow-run permission.
 * @param scriptName Script to be executed
 * @param dir Directory containing packages.json
 */
export function runNpmScript(
  scriptName: string,
  dir?: string,
): Promise<boolean> {
  dir = dir ?? Deno.cwd();
  const wrapper = createWrapper();
  const command = createScriptCommand(dir, scriptName);
  return wrapper.run(command);
}

/**
 * Runs a NPM command. This requires the --allow-run permission.
 * @param commandArgs Command to be run, e.g. fund
 * @param dir Directory for context
 */
export function runNpmCommand(
  commandArgs: string[],
  dir?: string,
): Promise<boolean> {
  dir = dir ?? Deno.cwd();
  const wrapper = createWrapper();
  const command = createGenericCommand(commandArgs, dir);
  return wrapper.run(command);
}

/**
 * Runs a NPM command. This requires the --allow-run permission.
 * @param npmCommand Command to be run
 */
export function runGenericNpmCommand(npmCommand: NpmCommand) {
  const wrapper = createWrapper();
  return wrapper.run(npmCommand);
}
