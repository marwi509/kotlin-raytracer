if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'render'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'render'.");
}
var render = function (_, Kotlin) {
  'use strict';
  var throwCCE = Kotlin.throwCCE;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var ensureNotNull = Kotlin.ensureNotNull;
  var Unit = Kotlin.kotlin.Unit;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var toTypedArray = Kotlin.kotlin.collections.toTypedArray_964n91$;
  var indexOf = Kotlin.kotlin.text.indexOf_8eortd$;
  var toByte = Kotlin.toByte;
  var round = Kotlin.kotlin.math.round_14dthe$;
  var numberToInt = Kotlin.numberToInt;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  Image.prototype = Object.create(ImageBitmap.prototype);
  Image.prototype.constructor = Image;
  var width;
  var height;
  var canvas;
  var context;
  var worker;
  function main$lambda(e) {
    render(e);
    return Unit;
  }
  function main() {
    var tmp$;
    println('marcus render');
    canvas.width = width;
    canvas.height = height;
    var blackImage = ArrayList_init();
    tmp$ = Kotlin.imul(width, height) * 3 | 0;
    for (var i = 0; i <= tmp$; i++) {
      blackImage.add_11rb$(0.0);
    }
    worker = new Worker('out/production/raytracerkotlin/raytracerkotlin.js');
    ensureNotNull(worker).postMessage('start');
    ensureNotNull(worker).addEventListener('message', main$lambda);
  }
  function Image() {
    ImageBitmap.call(this);
  }
  Image.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Image',
    interfaces: []
  };
  function render(e) {
    var tmp$, tmp$_0;
    var before = Date.now();
    var event = Kotlin.isType(tmp$ = e, MessageEvent) ? tmp$ : throwCCE();
    println('starting render');
    var imageString = typeof (tmp$_0 = event.data) === 'string' ? tmp$_0 : throwCCE();
    var byteArray = toTypedArray(hexStringToByteArray(imageString));
    println('byte array size ' + byteArray.length);
    println('to byte array ' + (Date.now() - before));
    var image = new ImageData(new Uint8ClampedArray(byteArray), 1024, 600);
    println('to imagedata ' + (Date.now() - before));
    context.putImageData(image, 0.0, 0.0);
    println('rendered ' + (Date.now() - before));
    ensureNotNull(worker).postMessage('start');
  }
  var HEX_CHARS;
  function hexStringToByteArray($receiver) {
    var tmp$;
    var result = new Int8Array($receiver.length / 2 | 0);
    tmp$ = $receiver.length;
    for (var i = 0; i < tmp$; i += 2) {
      var firstIndex = indexOf(HEX_CHARS, $receiver.charCodeAt(i));
      var secondIndex = indexOf(HEX_CHARS, $receiver.charCodeAt(i + 1 | 0));
      var octet = firstIndex << 4 | secondIndex;
      result[i >> 1] = toByte(octet);
    }
    return result;
  }
  function fillStyle(r, g, b) {
    return fillStyle_0(numberToInt(round(r * 255)), numberToInt(round(g * 255)), numberToInt(round(b * 255)));
  }
  function fillStyle_0(r, g, b) {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
  Object.defineProperty(_, 'width', {
    get: function () {
      return width;
    }
  });
  Object.defineProperty(_, 'height', {
    get: function () {
      return height;
    }
  });
  Object.defineProperty(_, 'canvas', {
    get: function () {
      return canvas;
    }
  });
  Object.defineProperty(_, 'context', {
    get: function () {
      return context;
    }
  });
  Object.defineProperty(_, 'worker', {
    get: function () {
      return worker;
    },
    set: function (value) {
      worker = value;
    }
  });
  _.main = main;
  _.Image = Image;
  _.render_9ojx7i$ = render;
  _.hexStringToByteArray_pdl1vz$ = hexStringToByteArray;
  _.fillStyle_yvo9jy$ = fillStyle;
  _.fillStyle_qt1dr2$ = fillStyle_0;
  width = 1024;
  height = 600;
  var tmp$, tmp$_0;
  canvas = Kotlin.isType(tmp$ = document.getElementById('c'), HTMLCanvasElement) ? tmp$ : throwCCE();
  context = Kotlin.isType(tmp$_0 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
  worker = null;
  HEX_CHARS = '0123456789ABCDEF';
  main();
  Kotlin.defineModule('render', _);
  return _;
}(typeof render === 'undefined' ? {} : render, kotlin);
