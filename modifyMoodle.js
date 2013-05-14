function isPDF(node) {
    var img = node.getElementsByTagName('img')[0];
    return img.src.indexOf('pdf') !== -1;
}

function getLink(node) {
    return node.getElementsByTagName('a')[0].href;
}

function getDirectPDF(page) {
    try {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", page, false);
        xmlHttp.send(null);
    } catch (e) {
        return null;
    }
    var response = xmlHttp.responseText;
    var parser = new DOMParser();
    var doc = parser.parseFromString(response, 'text/xml');
    return doc.getElementById('resourceobject').data;
}

function getRows() {
    return document.getElementsByClassName("activity resource modtype_resource");
}

function fixLi(li) {
    var div = li.children[0];
    var a = div.children[0];
    var originalhref = a.href;
    a.href = "javascript:;";

        
    a.addEventListener("click", function() {loadLink(originalhref);}, false);
}

function loadLink(orignalURL) {
    var direct = getDirectPDF(orignalURL);
    if (direct == null) {
        alert("Please log in to Moodle again, your session has expired");
        return;
    }
    var a = document.createElement("a");
    a.href = direct;
    a.click();
}

var lis = document.getElementsByClassName("activity resource modtype_resource");
for (var i=0; i<lis.length; i++) {
    if (isPDF(lis[i])) { fixLi(lis[i]); };
}


