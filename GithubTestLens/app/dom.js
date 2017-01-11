var GithubTestLens = GithubTestLens || {};

GithubTestLens.dom = (function() {

    var BUTTON_CLASS_NAME = "btn btn-sm btn-outline";
    var BUTTON_ROLE = "button";
    var MARKED_DATA_ATTRIBUTE = "testlensbuttonset";

    function createButtonLinkToAnchor(anchorId, buttonText) {
        var button = document.createElement("a");
        button.href = "";
        button.hash = anchorId;
        button.text = buttonText;
        button.className = BUTTON_CLASS_NAME;
        button.role = BUTTON_ROLE;

        return button;
    }

    function createAnchorToElement(elementToLinkTo) {
        var anchorPrefix = "testlensanchor_";

        var anchor = document.createElement("a");
        anchor.id = anchorPrefix + elementToLinkTo.dataset.path;

        return anchor;
    }

    function markElementAsProcessed(element) {
        element.dataset[MARKED_DATA_ATTRIBUTE] = true;
    }

    function getLinkTargetChildElement(element) {
        return element.getElementsByClassName("user-select-contain")[0];
    }

    function interlinkElements(firstElement, textInButtonShownInFirstElement, secondElement, textInButtonShownInSecondElement) {

        markElementAsProcessed(firstElement);
        markElementAsProcessed(secondElement);

        var firstTarget = getLinkTargetChildElement(firstElement);
        var secondTarget = getLinkTargetChildElement(secondElement);

        var firstAnchor = createAnchorToElement(firstElement);
        var firstButton = createButtonLinkToAnchor(firstAnchor.id, textInButtonShownInSecondElement);
        firstTarget.parentElement.insertBefore(firstAnchor, firstTarget);
        secondTarget.parentElement.insertBefore(firstButton, secondTarget);


        var secondAnchor = createAnchorToElement(secondElement);
        var secondButton = createButtonLinkToAnchor(secondAnchor.id, textInButtonShownInFirstElement);
        secondTarget.parentElement.insertBefore(secondAnchor, secondTarget);
        firstTarget.parentElement.insertBefore(secondButton, firstTarget);
    }


    return {
        interlinkElements: interlinkElements,
        markedDataAttribute: MARKED_DATA_ATTRIBUTE
    };
})();