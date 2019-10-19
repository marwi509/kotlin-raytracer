class Sphere(
        var location: Vector,
        val material: Material,
        val radius: Double
) {

    fun normal(point: Vector): Vector {
        return point.minus(location).normalize()
    }

}