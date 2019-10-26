
import org.khronos.webgl.Uint8ClampedArray
import org.w3c.dom.*
import org.w3c.dom.events.Event
import kotlin.browser.document
import kotlin.js.Date
import kotlin.math.round

val width = 1024
val height = 600
/*
importScripts("https://steenstn.github.io/raytracerkotlin/out/production/raytracerkotlin/lib/kotlin.js")
 */

val canvas = document.getElementById("c") as HTMLCanvasElement
val context = canvas.getContext("2d") as CanvasRenderingContext2D
var worker : Worker? = null
fun main() {
    println("marcus render")
    canvas.width = width
    canvas.height = height
    val blackImage = arrayListOf<Double>()
    for(i in 0..width*height*3) {
        blackImage.add(0.0)
    }

    worker = Worker("out/production/raytracerkotlin/raytracerkotlin.js")
    worker!!.postMessage("start")
    worker!!.addEventListener("message", {e -> render(e)})

}

class Image : ImageBitmap() {



}

fun render(e: Event) {

    val before = Date.now()
    val event = e as MessageEvent
    println("starting render")


    val imageString = (event.data as String)
    val byteArray = imageString.hexStringToByteArray().toTypedArray()
    println("byte array size ${byteArray.size}")
    println("byte min ${byteArray.min()}")
    println("byte max ${byteArray.max()}")
    //val imageList = imageString.substring(1,imageString.length-1).split(",")
    println("to byte array ${Date.now() - before}")
    //val doubleList = imageList.map { s -> s.toDouble() }
    val uint8ClampedArray = Uint8ClampedArray(1024 * 600 * 4)
    val index = 0
    for (i in byteArray.indices) {
        uint8ClampedArray.asDynamic()[i] = byteArray[i].toInt().plus(127)
    }
    val image = ImageData(uint8ClampedArray, 1024, 600)
    println("to imagedata ${Date.now() - before}")
    context.putImageData(image, 0.0, 0.0)
    /*val byteArray = doubleList
            .map { d -> d *255 }
            .map { d -> if (d < 0) 0.0 else if (d > 255.0) 255.0 else d }
            .map { d -> d - 128.0 }
            .map { d -> d.toByte() }
            .toTypedArray()
    println("to byte array")
    val image = ImageData(Uint8ClampedArray(byteArray), 1024, 600)
    println("to image data")
    context.putImageData(image, 0.0, 0.0)*/

/*
    var index = 0
    for(y in 0 until height) {
        for(x in 0 until width) {
            context.fillStyle = fillStyle(doubleList[index], doubleList[index+1], doubleList[index+2])
            context.fillRect(x.toDouble(), y.toDouble(),1.0,1.0)
            //context.drawImage(image, 1.0, 1.0)

            index+=4
        }
    }*/

    println("rendered ${Date.now() - before}")
    worker!!.postMessage("start")



}

private val HEX_CHARS = "0123456789ABCDEF"

fun String.hexStringToByteArray() : ByteArray {

    val result = ByteArray(length / 2)

    for (i in 0 until length step 2) {
        val firstIndex = HEX_CHARS.indexOf(this[i]);
        val secondIndex = HEX_CHARS.indexOf(this[i + 1]);

        val octet = firstIndex.shl(4).or(secondIndex)
        result.set(i.shr(1), octet.toByte())
    }

    return result
}

fun fillStyle(r: Double, g: Double, b: Double) : String {
    return fillStyle(round(r*255).toInt(), round(g*255).toInt(), round(b*255).toInt())
}

fun fillStyle(r: Int, g: Int, b: Int) : String {
    return "rgb($r, $g, $b)"
}
