# Github TestLens

Chrome extension to make checking tests in Github pull requests easier.
Adds buttons to jump between test files and their respective code files (assumes 1-1 matching).

The name matching works based on pairs of regular expressions:

- The first expression matches the "code" files. That is, the files being tested. Capture groups in this expression will be used in the second one.
- The second expression tries to find matching test files. It uses the captured matches from the first one to find test files with a name that corresponds to the "code" file.

These pairs of expressions can be managed in the options window.
The regular expressions use the javascript syntax. Most notably, the capture groups are referenced by $1, $2, etc.

The extension comes pre-configured with a simple example expression matching C# files.

The extension works by setting up pairs of regular expressions (javascript format, they're directly converted to JS RegExp objects):
- The first one matches "code" files. Any captured parts in this regex will be used for the second one.
- The second one takes the result of the first regex and tries to match the corresponding test files. It uses any captures from the first match to match a corresponding file name.

The extension starts out with a default regex pair that suited my immediate needs.
To set up more, please use the extension's options (in chrome settings).

Suggestions and contributions welcome.
