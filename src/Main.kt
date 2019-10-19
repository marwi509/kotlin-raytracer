import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.DedicatedWorkerGlobalScope
import kotlin.math.PI
import kotlin.math.cos
import kotlin.math.sin
import kotlin.random.Random

const val width = 1024
const val height = 600
const val msaa = 4
const val zOffset = -4.0
const val dofDistance = 11.0 + zOffset
const val dofRandomizer = 0.35
var l = 0

external val self: DedicatedWorkerGlobalScope
val image = Image(width, height)

val endImage = Array(width * height * 3) { i -> 0.0 }

fun main() {
    println("marcus raytracer")
    self.addEventListener("message", {
        println("worker got message!")
        raytrace()
    })
}

private fun raytrace() {


    val floor = 3.0

    val scene = Scene(listOf(
            Sphere(Vector(0.0, 2.0, 14.0 + zOffset), Material(Color(.6, .9, .6), 0.5, Material.Type.DIFFUSE), 1.3),
            Sphere(Vector(-2.0, 2.0, 11.0 + zOffset), Material(Color(.6, .6, .9), 0.5, Material.Type.DIFFUSE), 1.2),

            Sphere(Vector(2.0, 2.0, 10.0 + zOffset), Material(Color(.9, .6, .6), 0.75, Material.Type.DIFFUSE), 1.8),
            Sphere(Vector(-0.5, 2.0, 9.5 + zOffset), Material(Color(.9, .9, .7), 0.0, Material.Type.DIFFUSE), .3),
            Sphere(Vector(-4.0, 2.0, 13.0 + zOffset), Material(Color(.9, .9, .9), 0.0, Material.Type.DIFFUSE), 0.5),
            Sphere(Vector(7.0, 2.0, 18.0 + zOffset), Material(Color(.9, .9, .7), 0.0, Material.Type.DIFFUSE), 0.7),

            //Sphere(Vector(7.0, 2.0, -150.0), Material(Color(.9, .9, .7),0.0, Material.Type.DIFFUSE), 150.0),

            Sphere(Vector(-2.0, -6.0, 10.0 - zOffset), Material(Color(1.0, 1.0, 1.0).multiply(240.0), 0.0, Material.Type.LIGHT), 0.7),

            //Sphere(Vector(2.1, -1.0, 10.0), Material(Color(3.0, 3.0, 3.0), Material.Type.LIGHT), 1.0),
            //Sphere(Vector(-2.1, 3.0, 7.0), Material(Color(3.0, 3.0, 3.0), Material.Type.LIGHT), 0.7),
            //Sphere(Vector(0.0, 0.0, -7.0), Material(Color(10.0, 10.0, 10.0), Material.Type.LIGHT), 3.0),
            Sphere(Vector(0.0, 100001.0, 0.0), Material(Color(0.75, 0.75, 0.75), 0.0, Material.Type.DIFFUSE), 100000.0),
            Sphere(Vector(0.0, 0.0, 0.0), Material(Color(1.0, 1.0, 1.0), 0.0, Material.Type.LIGHT), 1000000.0)
    ))

    scene.placeAllOnFloor(1.0)

    l++
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

                    val dofNewLocation = worldLocation.plus(Vector(randomR * cos(randomAngle), worldLocation.y + randomR * sin(randomAngle), 0.0))

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

private fun sendImage(image: Image) {
    image.toPixels().forEach {
        endImage[(it.y * width + it.x) * 3] = it.red
        endImage[(it.y * width + it.x) * 3 + 1] = it.green
        endImage[(it.y * width + it.x) * 3 + 2] = it.blue
    }

    val message = JSON.stringify(endImage)
    self.postMessage(message)
}


fun CanvasRenderingContext2D.drawPixel(pixel: Pixel) {
    this.fillStyle = pixel.asRgba()
    this.fillRect(pixel.x.toDouble(), pixel.y.toDouble(), 1.0, 1.0)
}
