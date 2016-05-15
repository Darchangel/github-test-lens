var storage = chrome.storage.sync;
var search = GithubTestLens.search;
var dom = GithubTestLens.dom;
var defaults = GithubTestLens.options.defaults;

function main() {
    storage.get(defaults.optionsKey, processOptions);
}

function processOptions(retrievedOptions) {
    var options = retrievedOptions[defaults.optionsKey] || defaults.defaultOptions;

    options.forEach(pair => applyTestButtons(pair.fileRegex, pair.testRegex));
}

function applyTestButtons(fileRegex, testRegex) {
    var regex = new RegExp(fileRegex);
    var fileNameElements = Array.from(document.getElementsByClassName("file-header"))
                                .filter(element => !element.dataset[dom.markedDataAttribute]);

    var mainTitleFileNameElements = search.filterElementsWithPathMatchingRegex(fileNameElements, regex);

    var candidateTestTitleMatches = mainTitleFileNameElements.map(element => ({
        mainElement: element,
        testRegex: new RegExp(element.dataset.path.replace(regex, testRegex))
    }));

    var fileNameMatches = candidateTestTitleMatches.map(match => ({
        mainElement: match.mainElement,
        testElements: search.filterElementsWithPathMatchingRegex(fileNameElements, match.testRegex)
    }));

    fileNameMatches.forEach(pair => {
        var mainElement = pair.mainElement;
        var testElement = null;

        if (pair.testElements.length === 1)
            testElement = pair.testElements[0];
        else if (pair.testElements.length > 1)
            testElement = search.findElementWithClosestPath(pair.testElements, mainElement.dataset.path);

        if (testElement != null)
            dom.interlinkElements(mainElement, "View tests", testElement, "View tested code");
    });
}

main();
