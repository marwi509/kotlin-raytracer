class Material private constructor(val color: Color, val reflectiveness: Double, val type: Type, val refractionCoefficient: Double) {

    companion object {
        fun diffuse(color: Color): Material {
            return Material(color, 0.0, Type.DIFFUSE, 0.0)
        }

        fun light(color: Color): Material {
            return Material(color, 0.0, Type.LIGHT, 0.0)
        }

        fun mirror(diffuseColor: Color, reflectiveness: Double): Material {
            return Material(diffuseColor , reflectiveness, Type.DIFFUSE, 0.0)
        }

        fun glass(color: Color, refractionCoefficient: Double): Material {
            return Material(color , 0.0, Type.GLASS, refractionCoefficient)
        }
    }

    enum class Type {
        DIFFUSE,
        GLASS,
        LIGHT
    }


}

