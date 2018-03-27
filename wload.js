//
//  License information: MIT License
//
//  Copyright (c) Chris Schalick 2016 All Rights Reserved.
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is furnished
//  to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all
//    copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
//  INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//  PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
//  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
//  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
//  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// web site loader functions
var wload = function(){
  "use strict";
  this.ldq = [];
  this.done = 0;
};

// UI component loader
wload.prototype.ldobj = function(obj, cb){
  "use strict";
  // IE event handling
  if(obj.readyState){
    obj.onreadystatechange = function(){
      if(obj.readyState === "loaded" || obj.readyState === "complete"){
        obj.onreadystatechange = null;
        cb();
      }
    };
  // all other browser event handling
  } else {
    obj.onload = function(){cb();};
  }

  document.getElementsByTagName("head")[0].appendChild(obj);
};

//  Load script
wload.prototype.ldscr = function(url, cb){
  "use strict";
  var script  = document.createElement("script");
  script.type = "text/javascript";
  script.src  = url;
  this.ldobj(script, cb);
};

//  Load style
wload.prototype.ldsty = function(id, uri, cb)
{
  "use strict";
  var new_style;
  new_style       = document.createElement("link");
  new_style.type  = "text/css";
  new_style.rel   = "stylesheet";
  new_style.href  = uri;
  new_style.media = "all";
  new_style.id    = id;
  new_style.src   = uri;
  this.ldobj(new_style, cb);
};

// load a sequence of dependencieis
wload.prototype.ldseq = function(idx, cb){
  "use strict";
  var me = this;
  if(me.ldq[idx].length > 0)
    {
      var next = me.ldq[idx][0];
      me.ldq[idx] = me.ldq[idx].splice(1, me.ldq[idx].length);
      console.log("loading " + next.url);
      if(next.type === "css"){
        me.ldsty(next.id, next.url, function(){me.ldseq(idx, cb);});
      } else if(next.type === "js") {
        me.ldscr(next.url, function(){me.ldseq(idx, cb);});
      }
    }
  else if(me.none_left()){
    cb();
  }
};

// check for empty load queue
wload.prototype.none_left = function(){
  "use strict";
  var x;
  if(this.done){
    return 0;
  }
  for(x = 0; x < this.ldq.length; x++){
    if(this.ldq[x].length > 0){
      return 0;
    }
  }
  this.done++;
  return 1;
};

// user wants a single file
wload.prototype.src_file = function(res){
  "use strict";
  var x;
  if(typeof res === Array){
    for(x = 0; x < name.length; x++){
      this.ldq.push([res[x]]);
    }
  } else {
    this.ldq.push([res]);
  }
};

// user wants a series of dependent files
wload.prototype.src_seq = function(list){
  "use strict";
  this.ldq.push(list);
};

// process the load queue
wload.prototype.load_all = function(cb){
  "use strict";
  var x;
  for(x = 0; x < this.ldq.length; x++){
    this.ldseq(x, cb);
  }
};
