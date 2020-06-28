/**
 * Checks if we're running under an Unix based system or Windows.
 */
export function isUnix(): boolean {
  const { build } = Deno;
  return build.os !== "windows";
}
