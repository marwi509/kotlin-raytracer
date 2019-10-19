class Color(
        val red: Double,
        val green: Double,
        val blue: Double
) {

    fun toPixel(x: Int, y: Int): Pixel {
        return Pixel(x, y, red, green, blue)
    }

    override fun toString(): String {
        return "Color(red=$red, green=$green, blue=$blue)"
    }

    fun multiply(multiplier: Double): Color {
        return Color(red * multiplier, green * multiplier, blue * multiplier)
    }

    fun multiply(multiplier: Color): Color {
        return Color(red * multiplier.red, green * multiplier.green, blue * multiplier.blue)
    }

    fun plus(color: Color): Color {
        return Color(red + color.red, green + color.green, blue + color.blue)
    }

    fun divide(d: Double): Color {
        return Color(red / d, green / d, blue / d)
    }

    fun clamp(max: Double, min: Double): Color {
        return Color(clamp(red, min, max), clamp(green, min, max), clamp(blue, min, max))
    }

    fun clamp(x: Double, max: Double, min: Double): Double {
        return if (x > max) max else if(x < min) min else x
    }

    fun minus(color: Color): Color {
        return Color(red - color.red, green - color.green, blue - color.blue)
    }

    companion object {
        fun black(): Color {
            return Color(0.0, 0.0, 0.0)
        }
    }

}