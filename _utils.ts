/**
 * Checks if we're running under an Unix based system or Windows.
 */
export function isUnix(): boolean {
  const { build } = Deno;
  return build.os !== "windows";
}

/**
 * Defines required functions for a NpmWrapper.
 */
export interface NpmWrapper {
  /**
   * Checks if NPM is currently installed and available.
   */
  isInstalled(): Promise<boolean>;

  /**
   * Attempts to run a NPM command.
   * @param cmd Command to be executed
   */
  run(cmd: RunnableCommand): Promise<boolean>;
}

/**
 * Defines required properties for a Command.
 */
export interface RunnableCommand {
  base: string;
  command: string;
  verbose: boolean;
  dir?: string;
  args?: string[];
  argsChain: string[];
  output: "piped" | "inherit";
}

/**
 * Base NPM command.
 */
export abstract class BaseCommand implements RunnableCommand {
  base = "npm";
  verbose = true;
  args: string[] = [];
  dir?: string;

  abstract command: string;

  get argsChain() {
    return [this.base, this.command, ...this.args];
  }

  get output() {
    return this.verbose ? "inherit" : "piped";
  }
}

class CheckVersionCommand extends BaseCommand {
  command = "--version";
  verbose = false;
}

class RestorePackagesCommand extends BaseCommand {
  command = "install";
  verbose = true;

  constructor(directory: string) {
    super();
    this.dir = directory;
  }
}

class RunScriptCommand extends BaseCommand {
  command = "run";
  verbose = true;

  constructor(directory: string, scriptName: string) {
    super();
    this.dir = directory;
    this.args = [scriptName];
  }
}

class NpmCommand extends BaseCommand {
  command: string;
  verbose = true;

  /**
   *
   */
  constructor(command: string, directory?: string, args?: string[]) {
    super();
    this.command = command;
    this.dir = directory;
    this.args = args ?? [];
  }
}

/**
 * Creates a new --version command.
 */
export function createVersionCommand(): CheckVersionCommand {
  return new CheckVersionCommand();
}

/**
 * Create a new install command.
 * @param directory Directory containing a packages.json
 */
export function createRestoreCommand(directory: string) {
  return new RestorePackagesCommand(directory);
}

/**
 * Creates a new run command.
 * @param directory Directory containing a package.json
 * @param script Script to be executed
 */
export function createScriptCommand(directory: string, script: string) {
  return new RunScriptCommand(directory, script);
}

/**
 * Runs a NPM command.
 * @param command Command to be executed, e.g. fund, install, help
 * @param directory Directory for context
 * @param args Arguments to be passed
 */
export function createGenericCommand(args: string[], directory?: string) {
  const [cmd, ...rest] = args;
  return new NpmCommand(cmd, directory, rest);
}
