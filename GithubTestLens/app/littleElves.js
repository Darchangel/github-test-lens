"use strict;"


/**
 * ******************************************************************************
 */

/*! fast-levenshtein 2016-01-26. Copyright Ramesh Nair <ram@hiddentao.com> (http://www.hiddentao.com/) */
!function () { "use strict"; var a = function (a) { for (var b = Array.prototype.slice.call(arguments, 1), c = 0; c < b.length; ++c) { var d = b[c]; for (var e in d) d.hasOwnProperty(e) && (a[e] = d[e]) } return a }, b = function (a) { return "function" == typeof setImmediate ? setImmediate(a) : setTimeout(a, 0) }, c = { get: function (a, b) { if (a === b) return 0; if (0 === a.length) return b.length; if (0 === b.length) return a.length; var c, d, e, f, g, h = new Array(b.length + 1); for (e = 0; e < h.length; ++e) h[e] = e; for (e = 0; e < a.length; ++e) { for (d = e + 1, f = 0; f < b.length; ++f) c = d, d = h[f] + (a.charAt(e) === b.charAt(f) ? 0 : 1), g = c + 1, d > g && (d = g), g = h[f + 1] + 1, d > g && (d = g), h[f] = c; h[f] = d } return d }, getAsync: function (c, d, e, f) { if (f = a({}, { progress: null }, f), c === d) return e(null, 0); if (0 === c.length) return e(null, d.length); if (0 === d.length) return e(null, c.length); var g, h, i, j, k, l, m, n = new Array(d.length + 1); for (i = 0; i < n.length; ++i) n[i] = i; h = 1, i = 0, j = -1; var o = function () { for (l = (new Date).valueOf(), m = l; 1e3 > m - l;) { if (d.length <= ++j) { if (n[j] = h, c.length <= ++i) return e(null, h); h = i + 1, j = 0 } g = h, h = n[j] + (c.charAt(i) === d.charAt(j) ? 0 : 1), k = g + 1, h > k && (h = k), k = n[j + 1] + 1, h > k && (h = k), n[j] = g, m = (new Date).valueOf() } if (null !== f.progress) try { f.progress.call(null, 100 * i / c.length) } catch (a) { return e("Progress callback: " + a.toString()) } b(o) }; o() } }; "undefined" != typeof define && null !== define && define.amd ? define(function () { return c }) : "undefined" != typeof module && null !== module ? module.exports = c : "undefined" != typeof self && "function" == typeof self.postMessage && "function" == typeof self.importScripts ? self.Levenshtein = c : "undefined" != typeof window && null !== window && (window.Levenshtein = c) }();


/**
 * ******************************************************************************
 */

var pairs = [
    ["([^/]*)\/(.*)\/([^/]*)\.cs$", "$1.Tests?\/$2\/$3Tests?.cs$"] //This will go to config
];

var regex = new RegExp(pairs[0][0]);
var testReplace = pairs[0][1];







var fileElements = Array.from(document.getElementsByClassName("file-info"));

var fileNameElements = fileElements.map(fileElement => Array.from(fileElement.getElementsByClassName("user-select-contain")))
                                   .reduce((prev, curr) => prev.concat(curr), []);

var mainTitleFileNameElements = filterElementsWithMatchingTitleRegex(fileNameElements, regex);

var candidateTestTitleMatches = mainTitleFileNameElements.map(element => ({
    mainElement: element,
    testRegex: new RegExp(element.title.replace(regex, testReplace))
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
