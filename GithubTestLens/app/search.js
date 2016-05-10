var GithubTestLens = GithubTestLens || {};

GithubTestLens.search = (function() {

    function findElementWithClosestTitle(candidateElements, textToMatch) {
        var bestCandidate = candidateElements.map(candidate => ({
            candidate: candidate,
            distance: window.Levenshtein.get(textToMatch, candidate.title)
        })).reduce((prev, curr) => curr.distance < prev.distance ? curr : prev, { candidate: null, distance: Number.MAX_VALUE });

        return bestCandidate.candidate;
    }

    function filterElementsWithTitleMatchingRegex(elements, titleRegex) {
        return filterElementsWithMatchingTitle(elements, titleRegex, compareTitleWithRegex);
    }

    function filterElementsWithExactTitle(elements, title) {
        return filterElementsWithMatchingTitle(elements, title, compareTitleWithText);
    }


    function compareTitleWithRegex(elementTitle, regex) {
        return regex.test(elementTitle);
    }

    function compareTitleWithText(elementTitle, text) {
        return elementTitle === text;
    }

    function filterElementsWithMatchingTitle(elements, text, compareFunction) {
        function innerLoop(elements, text, result) {
            if (elements.length === 0)
                return result;

            var pivot = elements[0];

            var nextResultArray = compareFunction(pivot.title, text) ?
                result.concat([pivot]) :
                result;

            return innerLoop(elements.slice(1), text, nextResultArray);
        }

        return innerLoop(Array.from(elements), text, []);
    }

    return {
        filterElementsWithTitleMatchingRegex: filterElementsWithTitleMatchingRegex,
        filterElementsWithExactTitle: filterElementsWithExactTitle,
        findElementWithClosestTitle: findElementWithClosestTitle
    };
})();
