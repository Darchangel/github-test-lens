var OPTIONS_TABLE_ID = "optionsTable";

var storage = chrome.storage.sync;

function loadOptions(retrievedOptions) {
    var options = retrievedOptions[OPTIONS_KEY] || DEFAULT_OPTIONS;

    var table = document.getElementById(OPTIONS_TABLE_ID);
    var body = table.tBodies[0];

    body.innerHTML = "";

    options.forEach(regexPair => {
        var row = createRow(regexPair, "regexrow_" + new Date().getTime()); 
        appendRowToOptionsTable(row);
    });
}

function appendRowToOptionsTable(row) {
    var table = document.getElementById(OPTIONS_TABLE_ID);
    var body = table.tBodies[0];

    body.appendChild(row);
}

function createRow(regexPair, id) {
    var row = document.createElement("tr");
    row.id = id;

    row.appendChild(createInputCell(regexPair.fileRegex));
    row.appendChild(createInputCell(regexPair.testRegex));

    var buttonCell = document.createElement("td");
    buttonCell.appendChild(createRemoveButton(id));
    row.appendChild(buttonCell);

    return row;
}

function createNewRow(id) {
    return createRow({
        fileRegex: "",
        testRegex: ""
    }, id);
}

function createRemoveButton(rowId) {
    var btn = document.createElement("button");
    var text = document.createTextNode("Remove");
    btn.appendChild(text);
    btn.onclick = () => removeElement(rowId);

    return btn;
}

function removeElement(id) {
    var elm = document.getElementById(id);
    elm.parentNode.removeChild(elm);
}

function createInputCell(text) {
    var cell = document.createElement("td");
    var inputBox = document.createElement("input");
    inputBox.type = "text";
    inputBox.value = text;

    cell.appendChild(inputBox);
    return cell;
}

function addRegexRow() {
    var row = createNewRow(String(new Date().getTime()));
    appendRowToOptionsTable(row);
}

function saveOptions() {
    var table = document.getElementById(OPTIONS_TABLE_ID);
    var body = table.tBodies[0];

    var cells = body.getElementsByTagName("td");
    var regexps = gatherRegexps(cells);
    var pairs = createRegexPairs(regexps);

    var options = {};
    options[OPTIONS_KEY] = pairs;
    storage.set(options, () => console.log("Saved!"));
}

function gatherRegexps(cells) {
    var regexps = [];

    for (var i = 0; i < cells.length; ++i) {
        var cell = cells[i];
        var value = getValueFromCell(cell);
        if(value)
            regexps.push(value);
    }

    return regexps;
}

function createRegexPairs(regexps) {
    var pairs = [];
    for (var i = 0; i < regexps.length; i+=2) {
        pairs.push({
            fileRegex: regexps[i],
            testRegex: regexps[i+1]
        });
    }

    return pairs;
}

function getValueFromCell(cell) {
    var result = null;
    var text = cell.getElementsByTagName("input")[0];
    if(text)
        result = text.value;

    return result;
}

document.getElementById("add").onclick = addRegexRow;
document.getElementById("save").onclick = saveOptions;

storage.get(OPTIONS_KEY, loadOptions);

