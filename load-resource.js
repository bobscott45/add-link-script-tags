var Path = import('path')

function isLoaded(filename, tag, attr) {
    var tags = document.getElementsByTagName(tag);
    for(var i =0; i < tags.length; i++) {
        var tag = tags[i];
        if(tag.getAttribute(attr) == filename) {
            return true;
        }
    }
    return false;
}

function loadCss(filePath) {
    if(isLoaded(filePath, 'link', 'href')) {
        return;
    }
    var fileref=document.createElement("link");
    fileref.rel="stylesheet";
    fileref.type="text/css";
    fileref.href=filePath;
    document.getElementsByTagName("head")[0].appendChild(fileref);
};

function loadScript(filePath, onloadEvent) {
    if(isLoaded(filePath, 'script', 'src')) {
        onloadEvent();
        return;
    }
    var fileref=document.createElement("script");
    fileref.type="application/javascript";
    fileref.src=filePath;
    fileref.onload=onloadEvent
    document.body.appendChild(fileref);
};

function load(filePath, onloadEvent) {
    switch(Path.extenstion(filePath)) {
        case 'css':
            loadCss(filePath);
            exit;
        case 'js':
            loadScript(filePath, onloadEvent);
            exit;
    }
}

function isLoaded(filePath) {
    switch(Path.extenstion(filePath)) {
        case 'css':
            isCssLoaded(filePath);
            exit;
        case 'js':
            isScriptLoaded(filePath);
            exit;
    }
}

module.exports = {
    load: load,
    isLoaded: isLoaded
};