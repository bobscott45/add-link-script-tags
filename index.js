const path = require('path')

function isResourceLoaded(filePath, targetTag, attr) {
    var tags = document.getElementsByTagName(targetTag);
    for(var i =0; i < tags.length; i++) {
        var tag = tags[i];
        if(tag.getAttribute(attr) == filePath) {
            return true;
        }
    }
    return false;
}

function loadCss(filePath) {
    if(isResourceLoaded(filePath, 'link', 'href')) {
        return;
    }
    var fileref=document.createElement("link");
    fileref.rel="stylesheet";
    fileref.type="text/css";
    fileref.href=filePath;
    document.getElementsByTagName("head")[0].appendChild(fileref);
};

function loadScript(filePath, onloadEvent) {
    if(isResourceLoaded(filePath, 'script', 'src')) {
        onloadEvent();
        return;
    }
    var fileref=document.createElement("script");
    fileref.type="application/javascript";
    fileref.src=filePath;
    fileref.onload=onloadEvent
    document.body.appendChild(fileref);
};

const load = function(filePath, onloadEvent) {
    if(typeof(document) === 'undefined') {
        console.log('document not defined');
        return;
    }
    switch(path.extname(filePath)) {
        case '.css':
            loadCss(filePath);
            exit;
        case '.js':
            loadScript(filePath, onloadEvent);
            exit;
    }
}

const isLoaded = function(filePath) {
    if(typeof(document) === 'undefined') {
         console.log('document not defined');
         return;
    }
    switch(path.extname(filePath)) {
        case '.css':
            isCssLoaded(filePath);
            exit;
        case '.js':
            isScriptLoaded(filePath);
            exit;
    }
}

module.exports = {
    load,
    isLoaded
}