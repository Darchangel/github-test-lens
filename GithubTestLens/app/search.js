var GithubTestLens = GithubTestLens || {};

GithubTestLens.search = (function() {

    function findElementWithClosestTitle(candidateElements, textToMatch) {
        var bestCandidate = candidateElements.map(candidate => ({
            candidate: candidate,
            distance: window.Levenshtein.get(textToMatch, candidate.title)
        })).reduce((prev, curr) => curr.distance < prev.distance ? curr : prev, { candidate: null, distance: Number.MAX_VALUE });

        return bestCandidate.candidate;
    }

    function filterElementsWithTitleMatchingRegex(elements, regex) {
        function innerLoop(elements, result) {
            if (elements.length === 0)
                return result;

            var pivot = elements[0];

            var nextResultArray = regex.test(pivot.title) ?
                result.concat([pivot]) :
                result;

            return innerLoop(elements.slice(1), nextResultArray);
        }

        return innerLoop(Array.from(elements), []);
    }

    return {
        filterElementsWithTitleMatchingRegex: filterElementsWithTitleMatchingRegex,
        findElementWithClosestTitle: findElementWithClosestTitle
    };
})();
