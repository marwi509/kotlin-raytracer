class Material(
        val color: Color,
        val reflectiveness: Double,
        val type: Type
) {

    enum class Type {
        DIFFUSE,
        LIGHT
    }


}

