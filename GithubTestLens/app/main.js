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
    var fileElements = Array.from(document.getElementsByClassName("file-info"));

    var fileNameElements = fileElements.map(fileElement => Array.from(fileElement.getElementsByClassName("user-select-contain")))
        .reduce((prev, curr) => prev.concat(curr), [])
        .filter(element => !element.getAttribute(dom.markedDataAttribute));

    var mainTitleFileNameElements = search.filterElementsWithTitleMatchingRegex(fileNameElements, regex);

    var candidateTestTitleMatches = mainTitleFileNameElements.map(element => ({
        mainElement: element,
        testRegex: new RegExp(element.title.replace(regex, testRegex))
    }));

    var fileNameMatches = candidateTestTitleMatches.map(match => ({
        mainElement: match.mainElement,
        testElements: search.filterElementsWithTitleMatchingRegex(fileNameElements, match.testRegex)
    }));

    fileNameMatches.forEach(pair => {
        var mainElement = pair.mainElement;
        var testElement = null;

        if (pair.testElements.length === 1)
            testElement = pair.testElements[0];
        else if (pair.testElements.length > 1)
            testElement = search.findElementWithClosestTitle(pair.testElements, mainElement.title);

        if(testElement != null) 
            dom.interlinkElements(mainElement, "View tests", testElement, "View tested code");
    });
}

main();
