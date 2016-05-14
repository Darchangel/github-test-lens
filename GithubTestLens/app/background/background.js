var GITHUB_LENS_BACKGROUND_URL_PATTERN_REGEXPS = [
        /https?:\/\/github.com\/.*\/pull\/.*\/files.*/,
        /https?:\/\/github.com\/.*\/compare\/.*\/files.*/
];
chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
    var urlMatchesExpectedPattern = GITHUB_LENS_BACKGROUND_URL_PATTERN_REGEXPS.map(regex => regex.test(details.url)).reduce((prev, curr) => prev || curr);

    if (urlMatchesExpectedPattern)
        chrome.tabs.executeScript(null, { file: "main.js" });
});