# 🐚 Helix

**Helix** is a non-ambitious wrappers for `npm` commands! Run your favorite `npm` commands directly from your Deno app!

The only permission required for this Module is `--allow-run`, we need this permission to invoke `npm`.

---

## 🚦 Build Status

**Master**(latest): ![Deno - Cache](https://github.com/rodolphocastro/helix/workflows/Deno%20-%20Cache/badge.svg)

## ⚡ Quickstart

Simply import `mod.ts` and call the *wrapper* functions:

+ `isNpmInstalled`: Checks if NPM is installed and available, returns a boolean.
+ `restoreNpmPackages`: Attempts to run `npm install` within a *directory*, returns a boolean.
+ `runNpmScript`: Attempts to run `npm run` for a *script* and within a *directory*, returns a boolean.
+ `runNpmCommand`: Attempts to run `npm <command>` within a *directory*, returns a boolean.
+ `runGenericNpmCommand`: Attempts to run a `npm <command>` created as a Object *inheriting* the `NpmCommand` class.

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

// Run with deno run --allow-run myfile.ts
```

## 🛣 Roadmap

+ [X] Windows Wrappers
  + [X] Module (*tested on Win10 2004*)
  + [ ] Automated Tests
+ [X] Linux Wrappers
  + [X] Module (*tested on Ubuntu 20.04 running within WSL2*)
  + [ ] Automated Tests
+ [ ] CLI
+ [ ] Mac Tests
  + [ ] Module
  + [ ] Automated Tests
+ [ ] Improve Logging
+ [X] Allow extensibility
