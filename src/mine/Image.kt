class Image {

    private val colors: Array<ColorSamples>
    private val width: Int
    private val height: Int

    constructor(width: Int, height: Int) {
        colors = Array(width * height) { i -> ColorSamples() }
        this.width = width
        this.height = height
    }

    fun addSample(x: Int, y: Int, color: Color) {
        val index = width * y + x
        colors[index].addSample(color)
    }

    fun toPixels() : List<Pixel> {
        val list = MutableList(0) { _ -> Pixel(0,0,0.0,0.0,0.0)}
        for(i in 0 until height) {
            for(j in 0 until width) {
                val color = colors[width * i + j]
                list.add(color.getColor().toPixel(j, i))
            }
        }

        return list
    }

    fun pixelsWithBloom() : List<Pixel> {
        val image = Image(width, height)

        val colorsSampled = colors.map { it.getColor() }
                .map { it.minus(Color(1.0,1.0,1.0)) }
                .map { it.clamp(0.0, 1.0) }

        for (i in 0 until height) {
            for(j in 0 until width) {
                val pointsToSample = listOf(
                        ImagePoint(j - 1, i - 1),
                        ImagePoint(j + 1, i - 1),
                        ImagePoint(j + 1, i + 1),
                        ImagePoint(j - 1, i + 1),
                        ImagePoint(j, i),
                        ImagePoint(j , i - 1),
                        ImagePoint(j - 1, i),
                        ImagePoint(j, i + 1),
                        ImagePoint(j + 1, i)
                ).filter { it.x > 0 && it.y > 0 }.filter { it.x < width && it.y < height }

                pointsToSample.forEach { image.addSample(j, i, colorsSampled[it.y * width + it.x]) }
            }
        }

        return combine(image)
    }

    private fun combine(other: Image): List<Pixel> {
        val list = MutableList(0) { _ -> Pixel(0,0,0.0,0.0,0.0)}
        for(i in 0 until height) {
            for(j in 0 until width) {
                val color = colors[width * i + j].getColor().plus(other.colors[width * i + j].getColor())
                list.add(color.toPixel(j, i))
            }
        }

        return list
    }

    private data class ImagePoint(val x: Int, val y: Int)

    private fun clamp(x: Double, min: Double) : Double{
        return when {
            x < min -> min
            else -> x
        }
    }


}