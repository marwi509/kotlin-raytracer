class Pixel {
    val x: Int
    val y: Int
    val red: Double
    val green: Double
    val blue: Double

    constructor(x: Int, y: Int, red: Double, green: Double, blue: Double) {
        this.x = x
        this.y = y
        this.red = if (red > 1) 1.0 else red
        this.green = if (green > 1) 1.0 else green
        this.blue = if (blue > 1) 1.0 else blue
    }

    constructor(x: Int, y: Int, red: Int, green: Int, blue: Int) {
        this.x = x
        this.y = y
        this.red = if (red > 255) 1.0 else red.toDouble()/255
        this.green = if (green > 255) 1.0 else green.toDouble()/255
        this.blue = if (blue > 255) 1.0 else blue.toDouble()/255
    }

    fun plus(other: Color): Pixel {
        return Pixel(x, y,red + other.red, green + other.green, blue + other.blue)
    }

    fun asRgba(): String {
        return "rgb(${red*255}, ${green*255}, ${blue*255})"
    }


}