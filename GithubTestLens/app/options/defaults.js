var GithubTestLens = GithubTestLens || {};
GithubTestLens.options = GithubTestLens.options || {};

GithubTestLens.options.defaults =  (function() {
    var optionsKey = "github_codelens.options";

    var defaultOptions = [{
        fileRegex: "([^/]*)\/(.*)\/([^/]*)\.cs$",
        testRegex: "$1.Tests?\/$2\/$3Tests?.cs$"
    }];

    return {
        optionsKey: optionsKey,
        defaultOptions: defaultOptions
    }

})();
