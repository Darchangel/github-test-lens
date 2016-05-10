var GithubTestLens = GithubTestLens || {};

GithubTestLens.dom = (function() {

    var BUTTON_CLASS_NAME = "btn btn-sm btn-outline";
    var BUTTON_ROLE = "button";

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
        var anchorPrefix = "anchor_";

        var anchor = document.createElement("a");
        anchor.id = anchorPrefix + elementToLinkTo.title;

        return anchor;
    }

    function interlinkElements(firstElement, textInButtonShownInFirstElement, secondElement, textInButtonShownInSecondElement) {

        var firstAnchor = createAnchorToElement(firstElement);
        var firstButton = createButtonLinkToAnchor(firstAnchor.id, textInButtonShownInSecondElement);
        firstElement.parentElement.insertBefore(firstAnchor, firstElement);
        secondElement.parentElement.insertBefore(firstButton, secondElement);

        var secondAnchor = createAnchorToElement(secondElement);
        var secondButton = createButtonLinkToAnchor(secondAnchor.id, textInButtonShownInFirstElement);
        secondElement.parentElement.insertBefore(secondAnchor, secondElement);
        firstElement.parentElement.insertBefore(secondButton, firstElement);

    }


    return {
        interlinkElements: interlinkElements
    };
})();