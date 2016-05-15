var GithubTestLens = GithubTestLens || {};

GithubTestLens.search = (function() {

    function findElementWithClosestPath(candidateElements, textToMatch) {
        var bestCandidate = candidateElements.map(candidate => ({
            candidate: candidate,
            distance: window.Levenshtein.get(textToMatch, candidate.dataset.path)
        })).reduce((prev, curr) => curr.distance < prev.distance ? curr : prev, { candidate: null, distance: Number.MAX_VALUE });

        return bestCandidate.candidate;
    }

    function filterElementsWithPathMatchingRegex(elements, regex) {
        function innerLoop(elements, result) {
            if (elements.length === 0)
                return result;

            var pivot = elements[0];

            var nextResultArray = regex.test(pivot.dataset.path) ?
                result.concat([pivot]) :
                result;

            return innerLoop(elements.slice(1), nextResultArray);
        }

        return innerLoop(Array.from(elements), []);
    }

    return {
        filterElementsWithPathMatchingRegex: filterElementsWithPathMatchingRegex,
        findElementWithClosestPath: findElementWithClosestPath
    };
})();
