import kotlin.math.*
import kotlin.random.Random

class Scene(
        private val spheres: List<Sphere>
) {

    fun render(ray: Ray): Color {
        return render(ray, Color(1.0, 1.0, 1.0), 0)
    }

    fun render(ray: Ray, currentDiffuseColor: Color, depth: Int): Color {
        if (depth > 10) {
            return Color.black()
        }

        var closestHit = Double.MAX_VALUE
        var currentColor = Color(0.4, 0.4, 0.4)
        var hitLight = false;
        var hit = false;
        var newRay = Ray(Vector.random(), Vector.random())
        for (sphere in spheres) {
            val vectorBetweenSphereAndRay = ray.location.minus(sphere.location)
            val thingy = ray.direction.dot(vectorBetweenSphereAndRay)
            val firstPart = -thingy
            val inSquareRoot = thingy * thingy - (vectorBetweenSphereAndRay.lengthSquared() - sphere.radius * sphere.radius)

            if (inSquareRoot < 0) {
                continue
            }
            //println("Hit sphere with color ${sphere.material.color}")

            val secondPart = sqrt(inSquareRoot)

            val firstHit = firstPart + secondPart
            val secondHit = firstPart - secondPart

            val hitDistance = if (secondHit > 0) {
                min(firstHit, secondHit)
            } else {
                firstHit
            }

            if (hitDistance < 0.00001)
                continue

            //println("hit" + hitDistance)
            if (hitDistance < closestHit) {
                closestHit = hitDistance
            } else {
                continue
            }

            val hitPoint = ray.location.plus(ray.direction.times(hitDistance))
            val normal = sphere.normal(hitPoint)
            hitLight = sphere.material.type == Material.Type.LIGHT
            hit = true

            //println("${hitPoint.x}, ${hitPoint.y}, ${hitPoint.z}")
            if (sphere.material.type == Material.Type.GLASS) {
                currentColor = sphere.material.color.multiply(currentDiffuseColor)
                newRay = Ray(hitPoint, ray.direction)
                //return sphere.material.color

            } else if (sphere.material.reflectiveness > 0 && Random.nextDouble() < sphere.material.reflectiveness) {
                currentColor = currentDiffuseColor
                newRay = Ray(hitPoint, getReflectedDirection(normal, ray.direction))
            } else {

                currentColor = sphere.material.color.multiply(currentDiffuseColor)
                newRay = Ray(hitPoint, getNewDirection(normal, normal.cross(Vector.random())))
            }

        }

        if (hitLight) {
            return currentColor
        }

        if (hit) {
            //if (Random.nextDouble() > 0.9999)
            //println("newRay ${newRay.direction}")
            return render(newRay, currentColor, depth + 1)
        }


        return Color.black()
    }

    private fun getNewDirection(normal: Vector, tangent: Vector): Vector {
        val eps1 = Random.nextDouble() * PI * 2
        val eps2 = sqrt(Random.nextDouble())

        val x = cos(eps1) * eps2
        val y = sin(eps1) * eps2
        val z = sqrt(1.0 - eps2 * eps2)

        return tangent.times(x).plus(normal.cross(tangent).times(y)).plus(normal.times(z))
    }

    private fun getReflectedDirection(normal: Vector, ray: Vector): Vector {
        return ray.minus(normal.times(2.0).times(normal.dot(ray)))
    }

    private fun getRefractedDirection(normal: Vector, direction: Vector, refractionIndex: Double): Vector {
        val into = direction.dot(normal) < 0.0
        val newNormal = if (into) normal else normal.negate()

        val nc = 1.0
        val nnt = if (into) nc / refractionIndex else refractionIndex / nc
        val ddn = direction.dot(newNormal)
        val cos2t = 1 - nnt*nnt*(1-ddn*ddn)
        if(cos2t < 0) {
            println("aw shit")
            return Vector(0.0, 0.0, 0.0)
        }

        return (direction.times(nnt).minus(newNormal.times(ddn * nnt+sqrt(cos2t))).normalize())
    }

    fun placeAllOnFloor(d: Double) {
        spheres.forEach {
            if (it.material.type != Material.Type.LIGHT && it.radius < 1000)
                it.location = Vector(it.location.x, d - it.radius, it.location.z)
        }
    }

}