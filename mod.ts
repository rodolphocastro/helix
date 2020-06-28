import { isUnix } from "./host.ts";
import {
  checkInstalledWindows,
  restorePackagesWindows,
  runScriptWindows,
  runNpmWindows,
} from "./windows.ts";

/**
 * Checks if NPM is installed and available.
 */
export async function isNpmInstalled(): Promise<boolean> {
  if (!isUnix()) {
    return checkInstalledWindows();
  }

  console.error("Not yet implemented for Unix systems");
  return false;
}

/**
 * Restore packages for a given Directory.
 * @param dir Directory containing packages.json
 */
export async function restoreNpmPackages(dir?: string) {
  dir = dir ?? Deno.cwd();
  if (!isUnix()) {
    return restorePackagesWindows(dir);
  }

  console.error("Not yet implemented for Unix systems");
  return false;
}

/**
 * Runs a NPM Script via "npm run <script>"
 * @param scriptName Script to be executed
 * @param dir Directory containing packages.json
 */
export async function runNpmScript(scriptName: string, dir?: string) {
  dir = dir ?? Deno.cwd();
  if (!isUnix()) {
    return runScriptWindows(scriptName, dir);
  }

  console.error("Not yet implemented for Unix systems");
  return false;
}

/**
 * 
 * @param commandArgs 
 * @param dir 
 */
export async function runNpmCommand(commandArgs: string[], dir?: string): Promise<boolean> {
    dir = dir ?? Deno.cwd();
    if (!isUnix()) {
        return runNpmWindows(commandArgs, dir)
    }

    console.error("Not yet implemented for Unix systems");
    return false;
}