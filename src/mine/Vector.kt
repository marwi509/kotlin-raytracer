import kotlin.math.sqrt
import kotlin.random.Random

class Vector(
        val x: Double,
        val y: Double,
        val z: Double
) {

    fun normalize(): Vector {
        val length = length()
        return Vector(x / length, y / length, z / length)
    }

    fun length(): Double {
        return sqrt(x * x + y * y + z * z)
    }

    fun lengthSquared(): Double {
        return x * x + y * y + z * z;
    }

    fun scalarProduct(other: Vector): Double {
        return x * other.x + y * other.y + z * other.z
    }

    fun minus(other: Vector): Vector {
        return Vector(x - other.x, y - other.y, z - other.z)
    }

    fun plus(other: Vector): Vector {
        return Vector(x + other.x, y + other.y, z + other.z)
    }

    fun negate(): Vector {
        return Vector(-x, -y, -z)
    }

    fun times(d: Double): Vector {
        return Vector(x * d, y * d, z * d)
    }

    fun cross(other: Vector): Vector {
        return Vector(y * other.z - z * other.y, z * other.x - x * other.z, x * other.y - y * other.x)
    }

    override fun toString(): String {
        return "Vector(x=$x, y=$y, z=$z)"
    }

    companion object {
        fun random(): Vector {
            return Vector(Random.nextDouble(), Random.nextDouble(), Random.nextDouble()).normalize()
        }
    }


}