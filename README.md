# wload
This is a pure Javascript, zero dependency site loader with dependency support. It declares an object with methods you can call to do an orderly web site load and call a function when all dependencies are loaded.

Usage is pretty simple, here's an example:

<pre><!--
<html><head>
<script src="scripts/wload.js"></script>
</head>
<body>
<div id="app"></div>
<script>
var ld_site = new wload;
ld_site.src_seq([{"type": "js", "url": "scripts/layered_canvas.js"}, {"type": "js", "url": "scripts/carouseljs.js"}, {"type": "js", "url": "scripts/posts.js"}, {"type": "js", "url": "scripts/webthing_ui.js"}]);
ld_site.src_file({"type": "css",  "id": "ldr_style",  "url": "the_site.css"});
ld_site.src_file({"type": "css",  "id": "cyanotype_font",  "url": "https://fontlibrary.org/face/cyanotype"});
ld_site.src_file({"type": "css",  "id": "feltpen_font",    "url": "https://fontlibrary.org/face/feltpen"});
ld_site.src_file({"type": "css",  "id": "typewriter_font", "url": "https://fontlibrary.org/face/rufscript"});
ld_site.load_all(function(){console.log('app loaded');});
</script>
</body>
</html>
</pre>
-->
