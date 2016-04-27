var pairs = [
    [".*\/([^/]*)\.cs$", "$1Tests?.cs"]
];

var regex = new RegExp(pairs[0][0]);

var fileElements = Array.from(document.getElementsByClassName("file-info"));

var fileNameElements = fileElements.map(function(fileElement) {
    return Array.from(fileElement.getElementsByClassName("user-select-contain"));
}).reduce(function(prev, curr) {
    return prev.concat(curr);
}, []);

var matchingFileNameElements = getElementsWithMatchingTitle(fileNameElements, regex);

matchingFileNameElements.forEach(function(element){
    element.style.border = "solid thick red";
});


function getElementsWithMatchingTitle(elements, titleRegex) {
    function innerLoop(titleRegex, elements, result) {
        if (elements.length === 0)
            return result;

        var pivot = elements[0];
        var nextResultArray = titleRegex.test(pivot.title) ?
            result.concat([pivot]) :
            result;

        return innerLoop(titleRegex, elements.slice(1), nextResultArray);
    }

    return innerLoop(titleRegex, Array.from(elements), []);
}