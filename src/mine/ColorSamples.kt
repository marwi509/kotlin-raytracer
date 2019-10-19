class ColorSamples {
    private var color: Color = Color.black()
    private var samples: Int = 0

    fun addSample(other: Color) {
        color = color.plus(other)
        samples++
    }

    fun getColor(): Color {
        return color.divide(samples.toDouble())
    }

    override fun toString(): String {
        return "ColorSamples(color=$color, samples=$samples)"
    }


}