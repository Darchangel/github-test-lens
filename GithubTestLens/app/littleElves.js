var storage = chrome.storage.sync;

storage.get(OPTIONS_KEY, optionsLoadedCallback);

function optionsLoadedCallback(retrievedOptions) {
    var options = retrievedOptions[OPTIONS_KEY] || DEFAULT_OPTIONS;

    options.forEach(pair => applyTestButtons(pair.fileRegex, pair.testRegex));
}

function applyTestButtons(fileRegex, testRegex) {
    var regex = new RegExp(fileRegex);
    var fileElements = Array.from(document.getElementsByClassName("file-info"));

    var fileNameElements = fileElements.map(fileElement => Array.from(fileElement.getElementsByClassName("user-select-contain")))
                                       .reduce((prev, curr) => prev.concat(curr), []);

    var mainTitleFileNameElements = filterElementsWithMatchingTitleRegex(fileNameElements, regex);

    var candidateTestTitleMatches = mainTitleFileNameElements.map(element => ({
        mainElement: element,
        testRegex: new RegExp(element.title.replace(regex, testRegex))
    }));

    var fileNameMatches = candidateTestTitleMatches.map(match => ({
        mainElement: match.mainElement,
        testElements: filterElementsWithMatchingTitleRegex(fileNameElements, match.testRegex)
    }));

    fileNameMatches.forEach(pair => {
        var mainElement = pair.mainElement;
        var testElement = null;

        if (pair.testElements.length === 1)
            testElement = pair.testElements[0];
        else if (pair.testElements.length > 1)
            testElement = bestTitleMatch(mainElement.title, pair.testElements);

        if(testElement != null){
            var testLinkPair = createButtonPair(testElement, "View tests");
            testElement.parentElement.insertBefore(testLinkPair.anchor, testElement);
            mainElement.parentElement.insertBefore(testLinkPair.button, mainElement);

            var mainLinkPair = createButtonPair(mainElement, "View tested code");
            mainElement.parentElement.insertBefore(mainLinkPair.anchor, mainElement);
            testElement.parentElement.insertBefore(mainLinkPair.button, testElement);
        }
    });
}


function bestTitleMatch(text, candidateElements) {
    var bestCandidate = candidateElements.map(candidate => ({
        candidate: candidate,
        distance: window.Levenshtein.get(text, candidate.title)
    })).reduce((prev, curr) => curr.distance < prev.distance ? curr : prev, { candidate: null, distance: Number.MAX_VALUE });

    return bestCandidate.candidate;
}

function anchorId(element) {
    return "anchor_" + element.title;
}

function createButtonPair(toElement, text) {
    var button = document.createElement("a");
    button.href = "";
    button.hash = anchorId(toElement);
    button.text = text;
    button.className = "btn btn-sm btn-outline";
    button.role = "button";

    var anchor = document.createElement("a");
    anchor.id = anchorId(toElement);

    return {
        anchor: anchor,
        button: button
    };
}

function filterElementsWithMatchingTitleRegex(elements, titleRegex) {
    return filterElementsWithMatchingTitle(elements, titleRegex, compareTitleWithRegex);
}

function filterElementsWithTitle(elements, title) {
    return filterElementsWithMatchingTitle(elements, title, compareTitleWithText);
}

function compareTitleWithRegex(elementTitle, regex) {
    return regex.test(elementTitle);
}

function compareTitleWithText(elementTitle, text) {
    return elementTitle === text;
}

function filterElementsWithMatchingTitle(elements, text, compareFunction) {

    function innerLoop(text, elements, result) {
        if (elements.length === 0)
            return result;

        var pivot = elements[0];

        var nextResultArray = compareFunction(pivot.title, text) ?
            result.concat([pivot]) :
            result;

        return innerLoop(text, elements.slice(1), nextResultArray);
    }

    return innerLoop(text, Array.from(elements), []);
}
