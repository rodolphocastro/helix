import {
  isUnix,
  NpmWrapper,
  createRestoreCommand,
  createScriptCommand,
  createGenericCommand,
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

/**
 * Checks if NPM is installed and available.
 */
export function isNpmInstalled(): Promise<boolean> {
  const wrapper = createWrapper();
  return wrapper.isInstalled();
}

/**
 * Restore packages for a given Directory.
 * @param dir Directory containing packages.json
 */
export function restoreNpmPackages(dir?: string): Promise<boolean> {
  dir = dir ?? Deno.cwd();
  const wrapper = createWrapper();
  const command = createRestoreCommand(dir);
  return wrapper.run(command);
}

/**
 * Runs a NPM Script via "npm run <script>"
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
 * Runs a NPM command.
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
