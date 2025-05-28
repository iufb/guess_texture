package com.iufb.guesstexture

import android.graphics.BitmapFactory
import com.facebook.react.bridge.*

import java.io.File

class ColorAnalyzerModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "ColorAnalyzer"

  @ReactMethod
  fun getAverageColor(filePath: String, x: Int, y: Int, promise: Promise) {
    try {
      val file = File(filePath.replace("file://", ""))
      val bitmap = BitmapFactory.decodeFile(file.absolutePath)

      var r = 0; var g = 0; var b = 0; var a = 0; var count = 0

      for (dx in -2..2) {
        for (dy in -2..2) {
          val px = x + dx
          val py = y + dy
          if (px in 0 until bitmap.width && py in 0 until bitmap.height) {
            val pixel = bitmap.getPixel(px, py)
            a += pixel shr 24 and 0xff
            r += pixel shr 16 and 0xff
            g += pixel shr 8 and 0xff
            b += pixel and 0xff
            count++
          }
        }
      }

      val result = Arguments.createMap()
      result.putInt("r", r / count)
      result.putInt("g", g / count)
      result.putInt("b", b / count)
      result.putInt("a", a / count)
      promise.resolve(result)
    } catch (e: Exception) {
      promise.reject("ERR_COLOR", e.message, e)
    }
  }
}
