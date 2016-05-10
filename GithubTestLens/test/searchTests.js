/// <reference path="../scripts/qunit.js" />
/// <reference path="../app/search.js" />

module("GithubTestLens.search.test()", {
    setup: function () {
    },
    teardown: function () {
    }
});

test("filterElementsWithTitleMatchingRegex: if an element with a matching title exists, returns an array with only that element", function () {
    var element1 = document.createElement("a");
    element1.id = "id1";
    element1.title = "title1";
    var element2 = document.createElement("a");
    element2.id = "id2";
    element2.title = "title2";
    var element3 = document.createElement("a");
    element3.id = "id3";
    element3.title = "title3";

    var elements = [
        element1,
        element2,
        element3
    ];
    var matchingTitleRegex = /title2/;
    var expectedResult = [element2];

    var result = GithubTestLens.search.filterElementsWithTitleMatchingRegex(elements, matchingTitleRegex);

    deepEqual(result, expectedResult, "The element was not found");
});

test("filterElementsWithTitleMatchingRegex: if multiple elements with a matching title exist, returns an array with all those elements in the same order", function () {
    var element1 = document.createElement("a");
    element1.id = "id1";
    element1.title = "title1";
    var element2 = document.createElement("a");
    element2.id = "id2";
    element2.title = "title1";
    var element3 = document.createElement("a");
    element3.id = "id3";
    element3.title = "title3";

    var elements = [
        element1,
        element2,
        element3
    ];
    var matchingTitleRegex = /title1/;
    var expectedResult = [element1, element2];

    var result = GithubTestLens.search.filterElementsWithTitleMatchingRegex(elements, matchingTitleRegex);

    deepEqual(result, expectedResult, "The elements were not in the result as expected");
});

test("filterElementsWithTitleMatchingRegex: if no elements with a matching title exist, returns an empty array", function () {
    var element1 = document.createElement("a");
    element1.id = "id1";
    element1.title = "title1";
    var element2 = document.createElement("a");
    element2.id = "id2";
    element2.title = "title1";
    var element3 = document.createElement("a");
    element3.id = "id3";
    element3.title = "title3";

    var elements = [
        element1,
        element2,
        element3
    ];
    var matchingTitleRegex = /bananas/;
    var expectedResult = [];

    var result = GithubTestLens.search.filterElementsWithTitleMatchingRegex(elements, matchingTitleRegex);

    deepEqual(result, expectedResult, "The array was not empty as expected");
});

test("filterElementsWithTitleMatchingRegex: if no elements are passed in, returns an empty array", function () {
    var elements = [];
    var matchingTitleRegex = /bananas/;
    var expectedResult = [];

    var result = GithubTestLens.search.filterElementsWithTitleMatchingRegex(elements, matchingTitleRegex);

    deepEqual(result, expectedResult, "The array was not empty as expected");
});
