// converts (array of dicts) browser activity to csv string
function arr_to_str(arr) {
    var result = "";
    var keys_str = Object.keys(arr[0]).join(',');
    result += keys_str + '\n';
    for (var i = 0; i < arr.length; i++) {
        var entry = arr[i];
        var entry_str = Object.values(entry).join(',');
        result += entry_str + "\n";
    }
    return result;
}

// downloads a file containing {text} named {filename}
function download(filename, text) {
    var element = document.createElement("a");

    element.setAttribute('href', 'data:application/octet-stream,' + text);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

// save browsing activity to csv file
function save_activity() {
    var activity = [
        {type: 'START', time: '5-3-2', url: 'www.google.com'},
        {type: 'END', time: '9-100-2', url: 'www.facebook.com'}
    ];
    var activity_str = arr_to_str(activity);
    download("test.csv", activity_str);
}

document.getElementById('download').addEventListener('click', save_activity);
