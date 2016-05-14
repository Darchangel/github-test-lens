var GithubTestLens = GithubTestLens || {};

GithubTestLens.dom = (function() {

    var BUTTON_CLASS_NAME = "btn btn-sm btn-outline";
    var BUTTON_ROLE = "button";
    var MARKED_DATA_ATTRIBUTE = "data-testlensbuttonset";

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
        anchor.id = anchorPrefix + elementToLinkTo.title;

        return anchor;
    }

    function markElementAsProcessed(element) {
        element.setAttribute(MARKED_DATA_ATTRIBUTE, true);
    }

    function interlinkElements(firstElement, textInButtonShownInFirstElement, secondElement, textInButtonShownInSecondElement) {

        var firstAnchor = createAnchorToElement(firstElement);
        var firstButton = createButtonLinkToAnchor(firstAnchor.id, textInButtonShownInSecondElement);
        firstElement.parentElement.insertBefore(firstAnchor, firstElement);
        secondElement.parentElement.insertBefore(firstButton, secondElement);
        markElementAsProcessed(firstElement);

        var secondAnchor = createAnchorToElement(secondElement);
        var secondButton = createButtonLinkToAnchor(secondAnchor.id, textInButtonShownInFirstElement);
        secondElement.parentElement.insertBefore(secondAnchor, secondElement);
        firstElement.parentElement.insertBefore(secondButton, firstElement);
        markElementAsProcessed(secondElement);
    }


    return {
        interlinkElements: interlinkElements,
        markedDataAttribute: MARKED_DATA_ATTRIBUTE
    };
})();