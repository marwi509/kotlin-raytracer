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
  var split = Kotlin.kotlin.text.split_ip8yn$;
  var toDouble = Kotlin.kotlin.text.toDouble_pdl1vz$;
  var numberToInt = Kotlin.numberToInt;
  var toByte = Kotlin.toByte;
  var round = Kotlin.kotlin.math.round_14dthe$;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  var collectionSizeOrDefault = Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$;
  var ArrayList_init_0 = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  var copyToArray = Kotlin.kotlin.collections.copyToArray;
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
    var event = Kotlin.isType(tmp$ = e, MessageEvent) ? tmp$ : throwCCE();
    println('starting render');
    var imageString = typeof (tmp$_0 = event.data) === 'string' ? tmp$_0 : throwCCE();
    var endIndex = imageString.length - 1 | 0;
    var imageList = split(imageString.substring(1, endIndex), [',']);
    println('split string');
    var destination = ArrayList_init_0(collectionSizeOrDefault(imageList, 10));
    var tmp$_1;
    tmp$_1 = imageList.iterator();
    while (tmp$_1.hasNext()) {
      var item = tmp$_1.next();
      destination.add_11rb$(toDouble(item));
    }
    var doubleList = destination;
    println('to double');
    var destination_0 = ArrayList_init_0(collectionSizeOrDefault(doubleList, 10));
    var tmp$_2;
    tmp$_2 = doubleList.iterator();
    while (tmp$_2.hasNext()) {
      var item_0 = tmp$_2.next();
      destination_0.add_11rb$(item_0 * 255);
    }
    var destination_1 = ArrayList_init_0(collectionSizeOrDefault(destination_0, 10));
    var tmp$_3;
    tmp$_3 = destination_0.iterator();
    while (tmp$_3.hasNext()) {
      var item_1 = tmp$_3.next();
      destination_1.add_11rb$(item_1 < 0 ? 0.0 : item_1 > 255.0 ? 255.0 : item_1);
    }
    var destination_2 = ArrayList_init_0(collectionSizeOrDefault(destination_1, 10));
    var tmp$_4;
    tmp$_4 = destination_1.iterator();
    while (tmp$_4.hasNext()) {
      var item_2 = tmp$_4.next();
      destination_2.add_11rb$(item_2);
    }
    var destination_3 = ArrayList_init_0(collectionSizeOrDefault(destination_2, 10));
    var tmp$_5;
    tmp$_5 = destination_2.iterator();
    while (tmp$_5.hasNext()) {
      var item_3 = tmp$_5.next();
      destination_3.add_11rb$(toByte(numberToInt(item_3)));
    }
    var byteArray = copyToArray(destination_3);
    println('to byte array');
    var image = new ImageData(new Uint8ClampedArray(byteArray), 1024, 600);
    println('to image data');
    context.putImageData(image, 0.0, 0.0);
    println('rendered');
    println('rendered');
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
  _.fillStyle_yvo9jy$ = fillStyle;
  _.fillStyle_qt1dr2$ = fillStyle_0;
  width = 1024;
  height = 600;
  var tmp$, tmp$_0;
  canvas = Kotlin.isType(tmp$ = document.getElementById('c'), HTMLCanvasElement) ? tmp$ : throwCCE();
  context = Kotlin.isType(tmp$_0 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
  worker = null;
  main();
  Kotlin.defineModule('render', _);
  return _;
}(typeof render === 'undefined' ? {} : render, kotlin);
