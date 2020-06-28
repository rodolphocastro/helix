/**
 * Checks if we're running under an Unix based system or Windows.
 */
export function isUnix(): boolean {
  return Deno.env.get("OS") !== "Windows_NT";
}
