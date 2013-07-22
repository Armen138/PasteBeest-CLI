#!/usr/bin/env node
var querystring = require('querystring');
var http = require("http");
var fs = require("fs");

var filetypes = {
    "html": "xml",
    "js": "javascript",
    "ts": "javascript",
    "json": "javascript",
    "c": "clike",
    "cpp": "clike",
    "h": "clike",
    "cs": "clike",
    "java": "clike",
    "less": "less",
    "lua": "lua",
    "clojure": "clojure",
    "coffee": "coffeescript",
    "css": "css",
    "diff": "diff",
    "md": "markdown",
    "pl": "perl",
    "py": "python",
    "hs": "haskell",
    "php": "php",
    "rb": "ruby",
    "rs": "rust",
    "sass": "sass",
    "sh": "shell",
    "bash": "shell",
    "sql": "sql",
    "xml": "xml"
};

var file = process.argv[2];
var extension = file.substr(file.lastIndexOf(".") + 1);
var language = filetypes[extension] || "plaintext";
var code = fs.readFileSync(file) + "";
var data = querystring.stringify({
    "code": code,
    "language": language,
    "name": "PasteBeest-CLI"
});
var options = {
    "host": "www.pastebeest.com",
    "port": 80,
    "path": "/",
    "method": "POST",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': data.length
    }
};

var request = http.request(options, function(res) {
    res.setEncoding("utf8");
    console.log("http://www.pastebeest.com" + res.headers.location);
    process.exit(0);
});

request.write(data);
request.end();
