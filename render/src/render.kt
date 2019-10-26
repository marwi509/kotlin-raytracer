
import org.khronos.webgl.Uint8ClampedArray
import org.w3c.dom.*
import org.w3c.dom.events.Event
import kotlin.browser.document
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
    //worker!!.postMessage("start")
    val event = e as MessageEvent


    val imageString = (event.data as String)
    val imageList = imageString.substring(1,imageString.length-1).split(",")
    val doubleList = imageList.map { s -> s.toDouble() }
    val byteArray = doubleList.map { d -> d *255 }.map { d -> if (d < 0) 0.0 else if (d > 255.0) 255.0 else d }
            .map { d -> d - 128.0 }
            .map { d -> d.toByte() }
            .toTypedArray()
    val image = ImageData(Uint8ClampedArray(byteArray), 1024, 600)
    context.putImageData(image, 0.0, 0.0)


    /*
    var index = 0
    for(y in 0 until height) {
        for(x in 0 until width) {
            context.fillStyle = fillStyle(doubleList[index], doubleList[index+1], doubleList[index+2])
            context.fillRect(x.toDouble(), y.toDouble(),1.0,1.0)
            //context.drawImage(image, 1.0, 1.0)

            index+=3
        }
    }
    */
    println("rendered")



}



fun fillStyle(r: Double, g: Double, b: Double) : String {
    return fillStyle(round(r*255).toInt(), round(g*255).toInt(), round(b*255).toInt())
}

fun fillStyle(r: Int, g: Int, b: Int) : String {
    return "rgb($r, $g, $b)"
}
