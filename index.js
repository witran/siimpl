'use strict';

const http = require('http');

const PORT = process.env.PORT || 1234;

var RE_FORMAT = /^\/(\d+)(?:x(\d+))?(?:\/([\da-f]{6}|[\da-f]{3}))?(?:\/([\da-f]{6}|[\da-f]{3}))?\/?(?:\??text=(.+))?$/i;

function requestHandler(req, res) {
  var m = req.url.match(RE_FORMAT) || [];

  var width = m[1] || 100;
  var height = m[2] || width;
  var timeout = m[3] || 500;
  var text = m[4] ? decodeURIComponent(m[5]) : (width + 'x' + height);
  var color_bg = m[5] || 'eee';
  var color = m[6] || 'aaa';

  var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '" style="width: 100%;height: 100%;margin:auto;background-color:#' + color_bg + ';" viewBox="0 0 ' + width + ' ' + height + '" preserveAspectRatio="none">\
<text x="50%" y="50%" dy=".3em" fill="#' + color + '" style="text-anchor:middle;font:bold 15pt arial,sans-serif">' + text + '</text>\
</svg>';

  res.writeHead(200, {'Content-Type': 'image/svg+xml'});

  setTimeout(() => {
    res.end(svg);
  }, timeout);
};

const app = http.createServer(requestHandler);

app.listen(PORT, _ => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
