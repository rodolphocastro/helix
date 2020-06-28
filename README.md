# 🐚 Helix

**Helix** is a simple wrapper for `npm` commands! Run your favorite `npm` commands fron within Deno itself!

## ⚡ Quickstart

Simply import `mod.ts` and call the *wrapper* functions:

+ `isNpmInstalled`: Checks if NPM is installed and available, returns a boolean.
+ `restoreNpmPackages`: Attempts to run `npm install` within a *directory*, returns a boolean.
+ `runNpmScript`: Attempts to run `npm run` for a *script* and within a *directory*, returns a boolean.
+ `runNpmCommand`: Attempts to run `npm <command>` within a *directory*, returns a boolean.

### 📌 Sample

The following snippet runs the following, using this Module:

1. Check if NPM is installed
   1. IF True then
   2. Attempts to restore dependencies (`npm install`)
   3. Checks for fundraisers (`npm fund`)
   4. Attempts to run a build script (`npm run build`)

```typescript
if (await isNpmInstalled()) {
 await restoreNpmPackages('./subject/');
 await runNpmCommand(['fund'], './subject/');
 await runNpmScript('build', './subject/')   
}
```

## 🛣 Roadmap

+ [X] Windows Wrappers
  + [X] Module
  + [ ] Automated Tests
+ [ ] Linux Wrappers
  + [ ] Module
  + [ ] Automated Tests
+ [ ] Mac Tests
  + [ ] Module
  + [ ] Automated Tests
+ [ ] CLI