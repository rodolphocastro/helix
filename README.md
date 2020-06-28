# 🐚 Helix

**Helix** is a simple wrapper for `npm` commands! Run your favorite `npm` commands fron within Deno itself!

## ⚡ Quickstart

Simply import `mod.ts` and call the *wrapper* functions:

+ `checkNpmInstalled`: Checks if NPM is installed and available, returns a boolean.
+ `restorePackages`: Attempts to run `npm install` within a *directory*, returns a boolean.
+ `runScript`: Attempts to run `npm run` for a *script* and within a *directory*, returns a boolean.

## 🛣 Roadmap

+ [ ] Windows Wrappers
  + [ ] Module
  + [ ] Automated Tests
+ [ ] Linux Wrappers
  + [ ] Module
  + [ ] Automated Tests
+ [ ] Mac Tests
  + [ ] Module
  + [ ] Automated Tests
+ [ ] CLI