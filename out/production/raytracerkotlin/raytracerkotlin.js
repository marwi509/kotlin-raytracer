importScripts("https://marwi509.github.io/kotlin-raytracer/out/production/raytracerkotlin/lib/kotlin.js")
if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'raytracerkotlin'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'raytracerkotlin'.");
}
var raytracerkotlin = function (_, Kotlin) {
  'use strict';
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var listOf = Kotlin.kotlin.collections.listOf_i5x0yv$;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  var collectionSizeOrDefault = Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$;
  var ArrayList_init_0 = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  var Array_0 = Array;
  var toByte = Kotlin.toByte;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var Unit = Kotlin.kotlin.Unit;
  var Random = Kotlin.kotlin.random.Random;
  var math = Kotlin.kotlin.math;
  var throwCCE = Kotlin.throwCCE;
  var numberToInt = Kotlin.numberToInt;
  var min = Kotlin.kotlin.collections.min_pbinho$;
  var toString = Kotlin.toString;
  var max = Kotlin.kotlin.collections.max_pbinho$;
  var toByteArray = Kotlin.kotlin.collections.toByteArray_vn5r1x$;
  var toCharArray = Kotlin.kotlin.text.toCharArray_pdl1vz$;
  var StringBuilder_init = Kotlin.kotlin.text.StringBuilder_init;
  var Math_0 = Math;
  var Enum = Kotlin.kotlin.Enum;
  var throwISE = Kotlin.throwISE;
  var kotlin_js_internal_DoubleCompanionObject = Kotlin.kotlin.js.internal.DoubleCompanionObject;
  Material$Type.prototype = Object.create(Enum.prototype);
  Material$Type.prototype.constructor = Material$Type;
  function Color(red, green, blue) {
    Color$Companion_getInstance();
    this.red = red;
    this.green = green;
    this.blue = blue;
  }
  Color.prototype.toPixel_vux9f0$ = function (x, y) {
    return Pixel_init(x, y, this.red, this.green, this.blue);
  };
  Color.prototype.toString = function () {
    return 'Color(red=' + this.red + ', green=' + this.green + ', blue=' + this.blue + ')';
  };
  Color.prototype.multiply_14dthe$ = function (multiplier) {
    return new Color(this.red * multiplier, this.green * multiplier, this.blue * multiplier);
  };
  Color.prototype.multiply_12ve4j$ = function (multiplier) {
    return new Color(this.red * multiplier.red, this.green * multiplier.green, this.blue * multiplier.blue);
  };
  Color.prototype.plus_12ve4j$ = function (color) {
    return new Color(this.red + color.red, this.green + color.green, this.blue + color.blue);
  };
  Color.prototype.divide_14dthe$ = function (d) {
    return new Color(this.red / d, this.green / d, this.blue / d);
  };
  Color.prototype.clamp_lu1900$ = function (max, min) {
    return new Color(this.clamp_yvo9jy$(this.red, min, max), this.clamp_yvo9jy$(this.green, min, max), this.clamp_yvo9jy$(this.blue, min, max));
  };
  Color.prototype.clamp_yvo9jy$ = function (x, max, min) {
    return x > max ? max : x < min ? min : x;
  };
  Color.prototype.minus_12ve4j$ = function (color) {
    return new Color(this.red - color.red, this.green - color.green, this.blue - color.blue);
  };
  function Color$Companion() {
    Color$Companion_instance = this;
  }
  Color$Companion.prototype.black = function () {
    return new Color(0.0, 0.0, 0.0);
  };
  Color$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Color$Companion_instance = null;
  function Color$Companion_getInstance() {
    if (Color$Companion_instance === null) {
      new Color$Companion();
    }
    return Color$Companion_instance;
  }
  Color.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Color',
    interfaces: []
  };
  function ColorSamples() {
    this.color_0 = Color$Companion_getInstance().black();
    this.samples_0 = 0;
  }
  ColorSamples.prototype.addSample_12ve4j$ = function (other) {
    this.color_0 = this.color_0.plus_12ve4j$(other);
    this.samples_0 = this.samples_0 + 1 | 0;
  };
  ColorSamples.prototype.getColor = function () {
    return this.color_0.divide_14dthe$(this.samples_0);
  };
  ColorSamples.prototype.toString = function () {
    return 'ColorSamples(color=' + this.color_0 + ', samples=' + this.samples_0 + ')';
  };
  ColorSamples.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ColorSamples',
    interfaces: []
  };
  function Image() {
    this.colors_0 = null;
    this.width_0 = 0;
    this.height_0 = 0;
  }
  Image.prototype.addSample_if1tab$ = function (x, y, color) {
    var index = Kotlin.imul(this.width_0, y) + x | 0;
    this.colors_0[index].addSample_12ve4j$(color);
  };
  Image.prototype.toPixels = function () {
    var tmp$, tmp$_0;
    var list = ArrayList_init(0);
    for (var index = 0; index < 0; index++) {
      list.add_11rb$(Pixel_init(0, 0, 0.0, 0.0, 0.0));
    }
    var list_0 = list;
    tmp$ = this.height_0;
    for (var i = 0; i < tmp$; i++) {
      tmp$_0 = this.width_0;
      for (var j = 0; j < tmp$_0; j++) {
        var color = this.colors_0[Kotlin.imul(this.width_0, i) + j | 0];
        list_0.add_11rb$(color.getColor().toPixel_vux9f0$(j, i));
      }
    }
    return list_0;
  };
  Image.prototype.pixelsWithBloom = function () {
    var tmp$, tmp$_0;
    var image = Image_init(this.width_0, this.height_0);
    var $receiver = this.colors_0;
    var destination = ArrayList_init($receiver.length);
    var tmp$_1;
    for (tmp$_1 = 0; tmp$_1 !== $receiver.length; ++tmp$_1) {
      var item = $receiver[tmp$_1];
      destination.add_11rb$(item.getColor());
    }
    var destination_0 = ArrayList_init(collectionSizeOrDefault(destination, 10));
    var tmp$_2;
    tmp$_2 = destination.iterator();
    while (tmp$_2.hasNext()) {
      var item_0 = tmp$_2.next();
      destination_0.add_11rb$(item_0.minus_12ve4j$(new Color(1.0, 1.0, 1.0)));
    }
    var destination_1 = ArrayList_init(collectionSizeOrDefault(destination_0, 10));
    var tmp$_3;
    tmp$_3 = destination_0.iterator();
    while (tmp$_3.hasNext()) {
      var item_1 = tmp$_3.next();
      destination_1.add_11rb$(item_1.clamp_lu1900$(0.0, 1.0));
    }
    var colorsSampled = destination_1;
    tmp$ = this.height_0;
    for (var i = 0; i < tmp$; i++) {
      tmp$_0 = this.width_0;
      for (var j = 0; j < tmp$_0; j++) {
        var $receiver_0 = listOf([new Image$ImagePoint(j - 1 | 0, i - 1 | 0), new Image$ImagePoint(j + 1 | 0, i - 1 | 0), new Image$ImagePoint(j + 1 | 0, i + 1 | 0), new Image$ImagePoint(j - 1 | 0, i + 1 | 0), new Image$ImagePoint(j, i), new Image$ImagePoint(j, i - 1 | 0), new Image$ImagePoint(j - 1 | 0, i), new Image$ImagePoint(j, i + 1 | 0), new Image$ImagePoint(j + 1 | 0, i)]);
        var destination_2 = ArrayList_init_0();
        var tmp$_4;
        tmp$_4 = $receiver_0.iterator();
        while (tmp$_4.hasNext()) {
          var element = tmp$_4.next();
          if (element.x > 0 && element.y > 0)
            destination_2.add_11rb$(element);
        }
        var destination_3 = ArrayList_init_0();
        var tmp$_5;
        tmp$_5 = destination_2.iterator();
        while (tmp$_5.hasNext()) {
          var element_0 = tmp$_5.next();
          if (element_0.x < this.width_0 && element_0.y < this.height_0)
            destination_3.add_11rb$(element_0);
        }
        var pointsToSample = destination_3;
        var tmp$_6;
        tmp$_6 = pointsToSample.iterator();
        while (tmp$_6.hasNext()) {
          var element_1 = tmp$_6.next();
          image.addSample_if1tab$(j, i, colorsSampled.get_za3lpa$(Kotlin.imul(element_1.y, this.width_0) + element_1.x | 0));
        }
      }
    }
    return this.combine_0(image);
  };
  Image.prototype.combine_0 = function (other) {
    var tmp$, tmp$_0;
    var list = ArrayList_init(0);
    for (var index = 0; index < 0; index++) {
      list.add_11rb$(Pixel_init(0, 0, 0.0, 0.0, 0.0));
    }
    var list_0 = list;
    tmp$ = this.height_0;
    for (var i = 0; i < tmp$; i++) {
      tmp$_0 = this.width_0;
      for (var j = 0; j < tmp$_0; j++) {
        var color = this.colors_0[Kotlin.imul(this.width_0, i) + j | 0].getColor().plus_12ve4j$(other.colors_0[Kotlin.imul(this.width_0, i) + j | 0].getColor());
        list_0.add_11rb$(color.toPixel_vux9f0$(j, i));
      }
    }
    return list_0;
  };
  function Image$ImagePoint(x, y) {
    this.x = x;
    this.y = y;
  }
  Image$ImagePoint.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ImagePoint',
    interfaces: []
  };
  Image$ImagePoint.prototype.component1 = function () {
    return this.x;
  };
  Image$ImagePoint.prototype.component2 = function () {
    return this.y;
  };
  Image$ImagePoint.prototype.copy_vux9f0$ = function (x, y) {
    return new Image$ImagePoint(x === void 0 ? this.x : x, y === void 0 ? this.y : y);
  };
  Image$ImagePoint.prototype.toString = function () {
    return 'ImagePoint(x=' + Kotlin.toString(this.x) + (', y=' + Kotlin.toString(this.y)) + ')';
  };
  Image$ImagePoint.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.y) | 0;
    return result;
  };
  Image$ImagePoint.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y)))));
  };
  Image.prototype.clamp_0 = function (x, min) {
    var tmp$;
    if (x < min)
      tmp$ = min;
    else
      tmp$ = x;
    return tmp$;
  };
  Image.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Image',
    interfaces: []
  };
  function Image_init(width, height, $this) {
    $this = $this || Object.create(Image.prototype);
    Image.call($this);
    var array = Array_0(Kotlin.imul(width, height));
    var tmp$;
    tmp$ = array.length - 1 | 0;
    for (var i = 0; i <= tmp$; i++) {
      array[i] = new ColorSamples();
    }
    $this.colors_0 = array;
    $this.width_0 = width;
    $this.height_0 = height;
    return $this;
  }
  function Location(x, y) {
    this.x = x;
    this.y = y;
  }
  Location.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Location',
    interfaces: []
  };
  Location.prototype.component1 = function () {
    return this.x;
  };
  Location.prototype.component2 = function () {
    return this.y;
  };
  Location.prototype.copy_vux9f0$ = function (x, y) {
    return new Location(x === void 0 ? this.x : x, y === void 0 ? this.y : y);
  };
  Location.prototype.toString = function () {
    return 'Location(x=' + Kotlin.toString(this.x) + (', y=' + Kotlin.toString(this.y)) + ')';
  };
  Location.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.y) | 0;
    return result;
  };
  Location.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y)))));
  };
  var width;
  var height;
  var msaa;
  var zOffset;
  var dofDistance;
  var dofRandomizer;
  var l;
  var image;
  var endImage;
  function main$lambda(it) {
    println('worker got message!');
    raytrace();
    return Unit;
  }
  function main() {
    println('marcus raytracer msaa 1');
    self.addEventListener('message', main$lambda);
  }
  function raytrace() {
    var floor = 3.0;
    var scene = new Scene(listOf([new Sphere(new Vector(0.0, 2.0, 14.0 + zOffset), Material$Companion_getInstance().mirror_kdrgh7$(new Color(0.6, 0.9, 0.6), 0.75), 1.3), new Sphere(new Vector(-2.0, 2.0, 11.0 + zOffset), Material$Companion_getInstance().mirror_kdrgh7$(new Color(0.6, 0.6, 0.9), 0.95), 1.2), new Sphere(new Vector(2.0, 2.0, 10.0 + zOffset), Material$Companion_getInstance().mirror_kdrgh7$(new Color(0.9, 0.6, 0.6), 0.75), 1.8), new Sphere(new Vector(-0.5, 2.0, 9.5 + zOffset), Material$Companion_getInstance().glass_kdrgh7$(new Color(0.9, 0.9, 0.7), 1.517), 0.3), new Sphere(new Vector(-4.0, 2.0, 13.0 + zOffset), Material$Companion_getInstance().diffuse_12ve4j$(new Color(0.9, 0.9, 0.9)), 0.5), new Sphere(new Vector(7.0, 2.0, 18.0 + zOffset), Material$Companion_getInstance().diffuse_12ve4j$(new Color(0.9, 0.9, 0.7)), 0.7), new Sphere(new Vector(-2.0, -6.0, 10.0 - zOffset), Material$Companion_getInstance().light_12ve4j$((new Color(1.0, 1.0, 1.0)).multiply_14dthe$(240.0)), 0.7), new Sphere(new Vector(0.0, 100001.0, 0.0), Material$Companion_getInstance().diffuse_12ve4j$(new Color(0.75, 0.75, 0.75)), 100000.0), new Sphere(new Vector(0.0, 0.0, 0.0), Material$Companion_getInstance().light_12ve4j$(new Color(1.0, 1.0, 1.0)), 1000000.0)]));
    scene.placeAllOnFloor_14dthe$(1.0);
    l = l + 1 | 0;
    println('l ' + l);
    for (var i = 0; i < 600; i++) {
      if (i % 100 === 0) {
        println(i);
      }
      for (var j = 0; j < 1024; j++) {
        var colorSample = new ColorSamples();
        for (var m = 0; m < 1; m++) {
          for (var k = 0; k < 1; k++) {
            var adjustedY = ((i * 1 | 0) + m | 0) / 1;
            var adjustedX = ((j * 1 | 0) + k | 0) / 1;
            var screenLocation = new Vector(adjustedX, adjustedY, 0.0);
            var worldLocation = new Vector((screenLocation.x - 512) / 1024, (screenLocation.y - 300) / 1024, screenLocation.z);
            var direction = (new Vector(worldLocation.x, worldLocation.y - 0.125, 1.0)).normalize();
            var dofPoint = direction.times_14dthe$(dofDistance);
            var randomR = Random.Default.nextDouble() * dofRandomizer;
            var randomAngle = Random.Default.nextDouble() * math.PI * 2;
            var dofNewLocation = worldLocation.plus_spvnod$(new Vector(randomR * Math_0.cos(randomAngle), randomR * Math_0.sin(randomAngle), 0.0));
            var dofNewDirection = dofPoint.minus_spvnod$(dofNewLocation).normalize();
            var ray = new Ray(dofNewLocation, dofNewDirection);
            colorSample.addSample_12ve4j$(scene.render_1r7u$(ray));
          }
        }
        image.addSample_if1tab$(j, i, colorSample.getColor());
      }
    }
    sendImage(image);
  }
  function encode(src) {
    var tmp$;
    var buffer = Buffer.from(src);
    return typeof (tmp$ = buffer.toString('base64')) === 'string' ? tmp$ : throwCCE();
  }
  function sendImage(image) {
    var tmp$;
    tmp$ = image.toPixels().iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      endImage[((element.y * 1024 | 0) + element.x | 0) * 4 | 0] = toByte(numberToInt(clamp(element.red * 255.0, 0.0, 255.0) - 128));
      endImage[(((element.y * 1024 | 0) + element.x | 0) * 4 | 0) + 1 | 0] = toByte(numberToInt(clamp(element.green * 255.0, 0.0, 255.0) - 128));
      endImage[(((element.y * 1024 | 0) + element.x | 0) * 4 | 0) + 2 | 0] = toByte(numberToInt(clamp(element.blue * 255.0, 0.0, 255.0) - 128));
      endImage[(((element.y * 1024 | 0) + element.x | 0) * 4 | 0) + 3 | 0] = toByte(127);
    }
    println('byte array min in render ' + toString(min(endImage)));
    println('byte array max in render ' + toString(max(endImage)));
    var hexString = toHex(toByteArray(endImage));
    self.postMessage(hexString);
  }
  function clamp($receiver, min, max) {
    return $receiver < min ? min : $receiver > max ? max : $receiver;
  }
  var HEX_CHARS;
  function toHex($receiver) {
    var result = StringBuilder_init();
    var tmp$;
    for (tmp$ = 0; tmp$ !== $receiver.length; ++tmp$) {
      var element = $receiver[tmp$];
      var octet = element;
      var firstIndex = (octet & 240) >>> 4;
      var secondIndex = octet & 15;
      result.append_s8itvh$(HEX_CHARS[firstIndex]).append_s8itvh$(HEX_CHARS[secondIndex]);
    }
    return result.toString();
  }
  function Material() {
    Material$Companion_getInstance();
    this.color = null;
    this.reflectiveness = 0;
    this.refractionCoefficient = 0;
    this.type = null;
  }
  function Material$Companion() {
    Material$Companion_instance = this;
  }
  Material$Companion.prototype.diffuse_12ve4j$ = function (color) {
    return Material_init(color, 0.0, Material$Type$DIFFUSE_getInstance(), 0.0);
  };
  Material$Companion.prototype.light_12ve4j$ = function (color) {
    return Material_init(color, 0.0, Material$Type$LIGHT_getInstance(), 0.0);
  };
  Material$Companion.prototype.mirror_kdrgh7$ = function (diffuseColor, reflectiveness) {
    return Material_init(diffuseColor, reflectiveness, Material$Type$DIFFUSE_getInstance(), 0.0);
  };
  Material$Companion.prototype.glass_kdrgh7$ = function (color, refractionCoefficient) {
    return Material_init(color, 0.0, Material$Type$GLASS_getInstance(), refractionCoefficient);
  };
  Material$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Material$Companion_instance = null;
  function Material$Companion_getInstance() {
    if (Material$Companion_instance === null) {
      new Material$Companion();
    }
    return Material$Companion_instance;
  }
  function Material$Type(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function Material$Type_initFields() {
    Material$Type_initFields = function () {
    };
    Material$Type$DIFFUSE_instance = new Material$Type('DIFFUSE', 0);
    Material$Type$GLASS_instance = new Material$Type('GLASS', 1);
    Material$Type$LIGHT_instance = new Material$Type('LIGHT', 2);
  }
  var Material$Type$DIFFUSE_instance;
  function Material$Type$DIFFUSE_getInstance() {
    Material$Type_initFields();
    return Material$Type$DIFFUSE_instance;
  }
  var Material$Type$GLASS_instance;
  function Material$Type$GLASS_getInstance() {
    Material$Type_initFields();
    return Material$Type$GLASS_instance;
  }
  var Material$Type$LIGHT_instance;
  function Material$Type$LIGHT_getInstance() {
    Material$Type_initFields();
    return Material$Type$LIGHT_instance;
  }
  Material$Type.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Type',
    interfaces: [Enum]
  };
  function Material$Type$values() {
    return [Material$Type$DIFFUSE_getInstance(), Material$Type$GLASS_getInstance(), Material$Type$LIGHT_getInstance()];
  }
  Material$Type.values = Material$Type$values;
  function Material$Type$valueOf(name) {
    switch (name) {
      case 'DIFFUSE':
        return Material$Type$DIFFUSE_getInstance();
      case 'GLASS':
        return Material$Type$GLASS_getInstance();
      case 'LIGHT':
        return Material$Type$LIGHT_getInstance();
      default:throwISE('No enum constant Material.Type.' + name);
    }
  }
  Material$Type.valueOf_61zpoe$ = Material$Type$valueOf;
  Material.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Material',
    interfaces: []
  };
  function Material_init(color, reflectiveness, type, refractionCoefficient, $this) {
    $this = $this || Object.create(Material.prototype);
    Material.call($this);
    $this.color = color;
    $this.reflectiveness = reflectiveness;
    $this.type = type;
    $this.refractionCoefficient = refractionCoefficient;
    return $this;
  }
  function Pixel() {
    this.x = 0;
    this.y = 0;
    this.red = 0;
    this.green = 0;
    this.blue = 0;
  }
  Pixel.prototype.plus_12ve4j$ = function (other) {
    return Pixel_init(this.x, this.y, this.red + other.red, this.green + other.green, this.blue + other.blue);
  };
  Pixel.prototype.asRgba = function () {
    return 'rgb(' + this.red * 255 + ', ' + this.green * 255 + ', ' + this.blue * 255 + ')';
  };
  Pixel.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Pixel',
    interfaces: []
  };
  function Pixel_init(x, y, red, green, blue, $this) {
    $this = $this || Object.create(Pixel.prototype);
    Pixel.call($this);
    $this.x = x;
    $this.y = y;
    $this.red = red > 1 ? 1.0 : red;
    $this.green = green > 1 ? 1.0 : green;
    $this.blue = blue > 1 ? 1.0 : blue;
    return $this;
  }
  function Pixel_init_0(x, y, red, green, blue, $this) {
    $this = $this || Object.create(Pixel.prototype);
    Pixel.call($this);
    $this.x = x;
    $this.y = y;
    $this.red = red > 255 ? 1.0 : red / 255;
    $this.green = green > 255 ? 1.0 : green / 255;
    $this.blue = blue > 255 ? 1.0 : blue / 255;
    return $this;
  }
  function Ray(location, direction) {
    this.location = location;
    this.direction = direction;
  }
  Ray.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Ray',
    interfaces: []
  };
  function Scene(spheres) {
    this.spheres_0 = spheres;
  }
  Scene.prototype.render_1r7u$ = function (ray) {
    return this.render_8gnefh$(ray, new Color(1.0, 1.0, 1.0), 0);
  };
  Scene.prototype.render_8gnefh$ = function (ray, currentDiffuseColor, depth) {
    var tmp$, tmp$_0;
    if (depth > 10) {
      return Color$Companion_getInstance().black();
    }
    var closestHit = kotlin_js_internal_DoubleCompanionObject.MAX_VALUE;
    var currentColor = new Color(0.4, 0.4, 0.4);
    var hitLight = false;
    var hit = false;
    var newRay = new Ray(Vector$Companion_getInstance().random(), Vector$Companion_getInstance().random());
    tmp$ = this.spheres_0.iterator();
    while (tmp$.hasNext()) {
      var sphere = tmp$.next();
      var vectorBetweenSphereAndRay = ray.location.minus_spvnod$(sphere.location);
      var thingy = ray.direction.dot_spvnod$(vectorBetweenSphereAndRay);
      var firstPart = -thingy;
      var inSquareRoot = thingy * thingy - (vectorBetweenSphereAndRay.lengthSquared() - sphere.radius * sphere.radius);
      if (inSquareRoot < 0) {
        continue;
      }
      var secondPart = Math_0.sqrt(inSquareRoot);
      var firstHit = firstPart + secondPart;
      var secondHit = firstPart - secondPart;
      if (secondHit > 0) {
        tmp$_0 = Math_0.min(firstHit, secondHit);
      }
       else {
        tmp$_0 = firstHit;
      }
      var hitDistance = tmp$_0;
      if (hitDistance < 1.0E-5)
        continue;
      if (hitDistance < closestHit) {
        closestHit = hitDistance;
      }
       else {
        continue;
      }
      var hitPoint = ray.location.plus_spvnod$(ray.direction.times_14dthe$(hitDistance));
      var normal = sphere.normal_spvnod$(hitPoint);
      hitLight = sphere.material.type === Material$Type$LIGHT_getInstance();
      hit = true;
      if (sphere.material.type === Material$Type$GLASS_getInstance()) {
        currentColor = sphere.material.color.multiply_12ve4j$(currentDiffuseColor);
        newRay = new Ray(hitPoint, ray.direction);
        return Color$Companion_getInstance().black();
      }
       else if (sphere.material.reflectiveness > 0 && Random.Default.nextDouble() < sphere.material.reflectiveness) {
        currentColor = currentDiffuseColor;
        newRay = new Ray(hitPoint, this.getReflectedDirection_0(normal, ray.direction));
      }
       else {
        currentColor = sphere.material.color.multiply_12ve4j$(currentDiffuseColor);
        newRay = new Ray(hitPoint, this.getNewDirection_0(normal, normal.cross_spvnod$(Vector$Companion_getInstance().random())));
      }
    }
    if (hitLight) {
      return currentColor;
    }
    if (hit) {
      return this.render_8gnefh$(newRay, currentColor, depth + 1 | 0);
    }
    return Color$Companion_getInstance().black();
  };
  Scene.prototype.getNewDirection_0 = function (normal, tangent) {
    var eps1 = Random.Default.nextDouble() * math.PI * 2;
    var x = Random.Default.nextDouble();
    var eps2 = Math_0.sqrt(x);
    var x_0 = Math_0.cos(eps1) * eps2;
    var y = Math_0.sin(eps1) * eps2;
    var x_1 = 1.0 - eps2 * eps2;
    var z = Math_0.sqrt(x_1);
    return tangent.times_14dthe$(x_0).plus_spvnod$(normal.cross_spvnod$(tangent).times_14dthe$(y)).plus_spvnod$(normal.times_14dthe$(z));
  };
  Scene.prototype.getReflectedDirection_0 = function (normal, ray) {
    return ray.minus_spvnod$(normal.times_14dthe$(2.0).times_14dthe$(normal.dot_spvnod$(ray)));
  };
  Scene.prototype.getRefractedDirection_0 = function (normal, direction, refractionIndex) {
    var into = direction.dot_spvnod$(normal) < 0.0;
    var newNormal = into ? normal : normal.negate();
    var nc = 1.0;
    var nnt = into ? nc / refractionIndex : refractionIndex / nc;
    var ddn = direction.dot_spvnod$(newNormal);
    var cos2t = 1 - nnt * nnt * (1 - ddn * ddn);
    if (cos2t < 0) {
      println('aw shit');
      return new Vector(0.0, 0.0, 0.0);
    }
    return direction.times_14dthe$(nnt).minus_spvnod$(newNormal.times_14dthe$(ddn * nnt + Math_0.sqrt(cos2t))).normalize();
  };
  Scene.prototype.placeAllOnFloor_14dthe$ = function (d) {
    var tmp$;
    tmp$ = this.spheres_0.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      if (element.material.type === Material$Type$DIFFUSE_getInstance() && element.radius < 1000)
        element.location = new Vector(element.location.x, d - element.radius, element.location.z);
    }
  };
  Scene.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Scene',
    interfaces: []
  };
  function Sphere(location, material, radius) {
    this.location = location;
    this.material = material;
    this.radius = radius;
  }
  Sphere.prototype.normal_spvnod$ = function (point) {
    return point.minus_spvnod$(this.location).normalize();
  };
  Sphere.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Sphere',
    interfaces: []
  };
  function Vector(x, y, z) {
    Vector$Companion_getInstance();
    this.x = x;
    this.y = y;
    this.z = z;
  }
  Vector.prototype.normalize = function () {
    var length = this.length();
    return new Vector(this.x / length, this.y / length, this.z / length);
  };
  Vector.prototype.length = function () {
    var x = this.x * this.x + this.y * this.y + this.z * this.z;
    return Math_0.sqrt(x);
  };
  Vector.prototype.lengthSquared = function () {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  };
  Vector.prototype.dot_spvnod$ = function (other) {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  };
  Vector.prototype.minus_spvnod$ = function (other) {
    return new Vector(this.x - other.x, this.y - other.y, this.z - other.z);
  };
  Vector.prototype.plus_spvnod$ = function (other) {
    return new Vector(this.x + other.x, this.y + other.y, this.z + other.z);
  };
  Vector.prototype.negate = function () {
    return new Vector(-this.x, -this.y, -this.z);
  };
  Vector.prototype.times_14dthe$ = function (d) {
    return new Vector(this.x * d, this.y * d, this.z * d);
  };
  Vector.prototype.cross_spvnod$ = function (other) {
    return new Vector(this.y * other.z - this.z * other.y, this.z * other.x - this.x * other.z, this.x * other.y - this.y * other.x);
  };
  Vector.prototype.toString = function () {
    return 'Vector(x=' + this.x + ', y=' + this.y + ', z=' + this.z + ')';
  };
  function Vector$Companion() {
    Vector$Companion_instance = this;
  }
  Vector$Companion.prototype.random = function () {
    return (new Vector(Random.Default.nextDouble(), Random.Default.nextDouble(), Random.Default.nextDouble())).normalize();
  };
  Vector$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Vector$Companion_instance = null;
  function Vector$Companion_getInstance() {
    if (Vector$Companion_instance === null) {
      new Vector$Companion();
    }
    return Vector$Companion_instance;
  }
  Vector.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Vector',
    interfaces: []
  };
  Object.defineProperty(Color, 'Companion', {
    get: Color$Companion_getInstance
  });
  _.Color = Color;
  _.ColorSamples = ColorSamples;
  _.Image_init_vux9f0$ = Image_init;
  _.Image = Image;
  _.Location = Location;
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
  Object.defineProperty(_, 'msaa', {
    get: function () {
      return msaa;
    }
  });
  Object.defineProperty(_, 'zOffset', {
    get: function () {
      return zOffset;
    }
  });
  Object.defineProperty(_, 'dofDistance', {
    get: function () {
      return dofDistance;
    }
  });
  Object.defineProperty(_, 'dofRandomizer', {
    get: function () {
      return dofRandomizer;
    }
  });
  Object.defineProperty(_, 'l', {
    get: function () {
      return l;
    },
    set: function (value) {
      l = value;
    }
  });
  Object.defineProperty(_, 'image', {
    get: function () {
      return image;
    }
  });
  Object.defineProperty(_, 'endImage', {
    get: function () {
      return endImage;
    }
  });
  _.main = main;
  _.encode_61zpoe$ = encode;
  _.clamp_nig4hr$ = clamp;
  Object.defineProperty(_, 'HEX_CHARS', {
    get: function () {
      return HEX_CHARS;
    }
  });
  _.toHex_964n91$ = toHex;
  Object.defineProperty(Material, 'Companion', {
    get: Material$Companion_getInstance
  });
  Object.defineProperty(Material$Type, 'DIFFUSE', {
    get: Material$Type$DIFFUSE_getInstance
  });
  Object.defineProperty(Material$Type, 'GLASS', {
    get: Material$Type$GLASS_getInstance
  });
  Object.defineProperty(Material$Type, 'LIGHT', {
    get: Material$Type$LIGHT_getInstance
  });
  Material.Type = Material$Type;
  _.Material = Material;
  _.Pixel_init_hq5qsi$ = Pixel_init;
  _.Pixel_init_4qozqa$ = Pixel_init_0;
  _.Pixel = Pixel;
  _.Ray = Ray;
  _.Scene = Scene;
  _.Sphere = Sphere;
  Object.defineProperty(Vector, 'Companion', {
    get: Vector$Companion_getInstance
  });
  _.Vector = Vector;
  width = 1024;
  height = 600;
  msaa = 1;
  zOffset = -4.0;
  dofDistance = 11.0 + zOffset;
  dofRandomizer = 0.025;
  l = 0;
  image = Image_init(1024, 600);
  var array = Array_0(2457600);
  var tmp$;
  tmp$ = array.length - 1 | 0;
  for (var i = 0; i <= tmp$; i++) {
    array[i] = toByte(0);
  }
  endImage = array;
  HEX_CHARS = toCharArray('0123456789ABCDEF');
  main();
  Kotlin.defineModule('raytracerkotlin', _);
  return _;
}(typeof raytracerkotlin === 'undefined' ? {} : raytracerkotlin, kotlin);
