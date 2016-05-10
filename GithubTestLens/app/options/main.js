var storage = chrome.storage.sync;

var options_dom = GithubTestLens.options.dom;
var options_defaults = GithubTestLens.options.defaults;

function saveOptions() {
    var regexPairs = options_dom.retrieveOptions();

    var options = {};
    options[options_defaults.optionsKey] = regexPairs;
    storage.set(options, () => console.log("Saved!"));
}

document.getElementById("add").onclick = options_dom.addRegexRow;
document.getElementById("save").onclick = saveOptions;

storage.get(options_defaults.optionsKey, (retrievedOptions) => {
    var options = retrievedOptions[defaults.optionsKey] || defaults.defaultOptions;
    options_dom.setupOptionsTable(options);
});

