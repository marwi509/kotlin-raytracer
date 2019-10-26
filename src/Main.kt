
import org.w3c.dom.DedicatedWorkerGlobalScope
import kotlin.math.PI
import kotlin.math.cos
import kotlin.math.sin
import kotlin.random.Random

const val width = 1024
const val height = 600
const val msaa = 1
const val zOffset = -4.0
const val dofDistance = 11.0 + zOffset
const val dofRandomizer = 0.025
var l = 0

external val self: DedicatedWorkerGlobalScope
val image = Image(width, height)

val endImage = Array(width * height * 4) { i -> 0.toByte() }

fun main() {
    println("marcus raytracer msaa $msaa")
    self.addEventListener("message", {
        println("worker got message!")
        raytrace()
    })
}

private fun raytrace() {


    val floor = 3.0

    val scene = Scene(listOf(
            Sphere(Vector(0.0, 2.0, 14.0 + zOffset), Material.glass(Color(.6, .9, .6 ), 1.517), 1.3),
            Sphere(Vector(-2.0, 2.0, 11.0 + zOffset), Material.mirror(Color(.6, .6, .9), 0.95), 1.2),

            Sphere(Vector(2.0, 2.0, 10.0 + zOffset), Material.mirror(Color(.9, .6, .6), 0.75), 1.8),
            Sphere(Vector(-0.5, 2.0, 9.5 + zOffset), Material.glass(Color(.9, .9, .7), 1.517), .3),
            Sphere(Vector(-4.0, 2.0, 13.0 + zOffset), Material.diffuse(Color(.9, .9, .9 )), 0.5),
            Sphere(Vector(7.0, 2.0, 18.0 + zOffset), Material.diffuse(Color(.9, .9, .7)), 0.7),

            //Sphere(Vector(7.0, 2.0, -150.0), Material(Color(.9, .9, .7),0.0, Material.Type.DIFFUSE), 150.0),

            Sphere(Vector(-2.0, -6.0, 10.0 - zOffset), Material.light(Color(1.0, 1.0, 1.0).multiply(240.0)), 0.7),

            //Sphere(Vector(2.1, -1.0, 10.0), Material(Color(3.0, 3.0, 3.0), Material.Type.LIGHT), 1.0),
            //Sphere(Vector(-2.1, 3.0, 7.0), Material(Color(3.0, 3.0, 3.0), Material.Type.LIGHT), 0.7),
            //Sphere(Vector(0.0, 0.0, -7.0), Material(Color(10.0, 10.0, 10.0), Material.Type.LIGHT), 3.0),
            Sphere(Vector(0.0, 100001.0, 0.0), Material.diffuse(Color(0.75, 0.75, 0.75)), 100000.0),
            Sphere(Vector(0.0, 0.0, 0.0), Material.light(Color(1.0, 1.0, 1.0)), 1000000.0)
    ))

    scene.placeAllOnFloor(1.0)

    l += 1
    println("l $l")

    for (i in 0 until height) {
        if (i % 100 == 0) {
            println(i)

        }
        for (j in 0 until width) {
            val colorSample = ColorSamples()
            for (m in 0 until msaa) {
                for (k in 0 until msaa) {
                    val adjustedY = (i * msaa + m).toDouble() / msaa.toDouble()
                    val adjustedX = (j * msaa + k).toDouble() / msaa.toDouble()
                    val screenLocation = Vector(adjustedX, adjustedY, 0.0)
                    val worldLocation = Vector((screenLocation.x - width / 2) / width, (screenLocation.y - height / 2) / width, screenLocation.z)
                    //println("${worldLocation.x}, ${worldLocation.y}, ${worldLocation.z}")
                    val direction = Vector(worldLocation.x, worldLocation.y - 0.125, 1.0).normalize()

                    val dofPoint = direction.times(dofDistance)

                    val randomR = Random.nextDouble() * dofRandomizer
                    val randomAngle = Random.nextDouble() * PI * 2

                    val dofNewLocation = worldLocation.plus(Vector(randomR * cos(randomAngle), randomR * sin(randomAngle), 0.0))

                    val dofNewDirection = dofPoint.minus(dofNewLocation).normalize()

                    val ray = Ray(dofNewLocation, dofNewDirection)
                    colorSample.addSample(scene.render(ray))
                }
            }
            image.addSample(j, i, colorSample.getColor())
        }


    }
    sendImage(image)

}

fun encode(src: String): String {
    val buffer = js("Buffer").from(src)
    return buffer.toString("base64") as String
}

private fun sendImage(image: Image) {
    image.toPixels().forEach {
        endImage[(it.y * width + it.x) * 4] = ((it.red * 255.0).clamp(0.0, 255.0) - 128).toByte()
        endImage[(it.y * width + it.x) * 4 + 1] = ((it.green * 255.0).clamp(0.0, 255.0) - 128).toByte()
        endImage[(it.y * width + it.x) * 4 + 2] = ((it.blue * 255.0).clamp(0.0, 255.0) - 128).toByte()
        endImage[(it.y * width + it.x) * 4 + 3] = 127.toByte()
    }

    println("byte array min in render ${endImage.min()}")
    println("byte array max in render ${endImage.max()}")

    val hexString = endImage.toByteArray().toHex()

    self.postMessage(hexString)
}

fun Double.clamp(min: Double, max: Double): Double {
    return if (this < min) min else if (this > max) max else this
}

val HEX_CHARS = "0123456789ABCDEF".toCharArray()

fun ByteArray.toHex() : String{
    val result = StringBuilder()

    forEach {
        val octet = it.toInt()
        val firstIndex = (octet and 0xF0).ushr(4)
        val secondIndex = octet and 0x0F
        result.append(HEX_CHARS[firstIndex]).append(HEX_CHARS[secondIndex])
    }

    return result.toString()
}
