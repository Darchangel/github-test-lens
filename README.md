# Github TestLens

Chrome extension to make checking tests in Github pull requests easier.
Adds buttons to jump between files and their respective code files.

---
**Please take into account that this is still very much a work in progress**
---

The extension works by setting up pairs of regular expressions (javascript format, they're directly converted to JS RegExp objects):
- The first one matches "code" files. Any captured parts in this regex will be used for the second one.
- The second one takes the result of the first regex and tries to match the corresponding test files. It uses any captures from the first match to match a corresponding file name.

The extension starts out with a default regex pair that suited my immediate needs.
To set up more, please use the extension's options (in chrome settings).

Suggestions and contributions welcome.

More documentation to follow.
