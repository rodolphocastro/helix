import { isUnix } from "./_utils.ts";
import {
  checkInstalledWindows,
  restorePackagesWindows,
  runScriptWindows,
  runNpmWindows,
} from "./_windows.ts";
import { checkInstalledLinux, restorePackagesLinux, runNpmLinux, runScriptLinux } from "./_unix.ts";

/**
 * Checks if NPM is installed and available.
 */
export function isNpmInstalled(): Promise<boolean> {
  if (!isUnix()) {
    return checkInstalledWindows();
  }
  return checkInstalledLinux();
}

/**
 * Restore packages for a given Directory.
 * @param dir Directory containing packages.json
 */
export function restoreNpmPackages(dir?: string): Promise<boolean> {
  dir = dir ?? Deno.cwd();
  if (!isUnix()) {
    return restorePackagesWindows(dir);
  }
  return restorePackagesLinux(dir);
}

/**
 * Runs a NPM Script via "npm run <script>"
 * @param scriptName Script to be executed
 * @param dir Directory containing packages.json
 */
export function runNpmScript(scriptName: string, dir?: string): Promise<boolean> {
  dir = dir ?? Deno.cwd();
  if (!isUnix()) {
    return runScriptWindows(scriptName, dir);
  }
  return runScriptLinux(scriptName, dir);
}

/**
 * 
 * @param commandArgs 
 * @param dir 
 */
export function runNpmCommand(
  commandArgs: string[],
  dir?: string,
): Promise<boolean> {
  dir = dir ?? Deno.cwd();
  if (!isUnix()) {
    return runNpmWindows(commandArgs, dir);
  }
  return runNpmLinux(commandArgs, dir);
}

console.log(await isNpmInstalled());
console.log(await restoreNpmPackages('./subject/'));
console.log(await runNpmScript('build', './subject/'));
console.log(await runNpmCommand(['fund'], './subject/'));