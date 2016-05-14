var GithubTestLens = GithubTestLens || {};
GithubTestLens.options = GithubTestLens.options || {};

GithubTestLens.options.defaults =  (function() {
    var optionsKey = "github_codelens.options";

    var defaultOptions = [{
        name: "C# example (Default)",
        fileRegex: "[^/]*/.*/([^/]*).cs$",
        testRegex: ".*.Tests?/.*/$1Tests?.cs$"
    }];

    return {
        optionsKey: optionsKey,
        defaultOptions: defaultOptions
    }

})();
