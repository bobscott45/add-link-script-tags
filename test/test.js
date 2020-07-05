var assert = require('chai').assert;
var stdout = require('test-console').stdout;
var loader = require('../index');
var jsdom = require('jsdom-global');

var html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Test</title>
    <link href="xxx.css"</link>
</head>
<body>
<script type = "text/javascript" src="yyy.js"></script>    
</body>
</html>
`;

it('should log message to console when document not defined', function() {
    var testConsole = stdout.inspect();
    loader.isLoaded('xxx.yyy');
    testConsole.restore();
    assert.deepEqual(testConsole.output,["document not defined\n"]);
});

it('should return true when document defined and script is loaded', function() {
    jsdom(html);
    assert.isTrue(loader.isLoaded('yyy.js'));
});

it('should return true when document defined and css loaded', function() {
    jsdom(html);
    assert.isTrue(loader.isLoaded('xxx.css'));
});

it('should add script tag to dom', function() {
    jsdom();
    loader.load('xxx.js');
    var scriptTags = document.getElementsByTagName('script');
    assert.equal(scriptTags.length, 1);
    assert.equal(scriptTags[0].outerHTML, "<script type=\"application/javascript\" src=\"xxx.js\"></script>");
});

it('should add link tag to dom', function() {
    jsdom();
    loader.load('xxx.css');
    var linkTags = document.getElementsByTagName('link');
    assert.equal(linkTags.length, 1);
    assert.equal(linkTags[0].outerHTML, "<link rel=\"stylesheet\" type=\"text/css\" href=\"xxx.css\">")
})

