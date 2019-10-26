class Material {

    val color: Color
    val reflectiveness: Double
    val refractionCoefficient: Double
    val type: Type

    private constructor(color: Color, reflectiveness: Double, type: Type, refractionCoefficient: Double) {
        this.color = color
        this.reflectiveness = reflectiveness
        this.type = type
        this.refractionCoefficient = refractionCoefficient
    }

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

