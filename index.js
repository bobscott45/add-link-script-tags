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

function loadCss(filePath, onloadEvent) {

    if(isResourceLoaded(filePath, 'link', 'href')) {
        return;
    }
    var element=document.createElement("link");
    element.rel="stylesheet";
    element.type="text/css";
    element.href=filePath;
    element.onload=onloadEvent;
    document.head.appendChild(element);
}

function loadScript(filePath, onloadEvent) {
    if(isResourceLoaded(filePath, 'script', 'src')) {
        onloadEvent();
        return;
    }
    var element=document.createElement("script");
    element.type="application/javascript";
    element.src=filePath;
    element.onload=onloadEvent
    document.body.appendChild(element);
}

const load = function(filePath, onloadEvent) {
    if(typeof(document) === 'undefined') {
        console.log('document not defined');
        return;
    }
    switch(path.extname(filePath)) {
        case '.css':
            loadCss(filePath);
            break;
        case '.js':
            loadScript(filePath, onloadEvent);
            break;
    }
}

const isLoaded = function(filePath) {
    if(typeof(document) === 'undefined') {
         console.log('document not defined');
         return;
    }
    switch(path.extname(filePath)) {
        case '.css':
            return isResourceLoaded(filePath, 'link', 'href');
            break;
        case '.js':
            return isResourceLoaded(filePath, 'script', 'src');
            break;
    }
}

module.exports = {
    load,
    isLoaded
}