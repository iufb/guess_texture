package expo.modules.coloranalyzer

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise
import android.graphics.BitmapFactory
import java.io.File

class ColorAnalyzerModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ColorAnalyzer')` in JavaScript.
    Name("ColorAnalyzer")

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("getAverageColor") { filePath: String, x:Int, y: Int, promise:Promise ->
      // Send an event to JavaScript.j
  try {
    val file = File(filePath.removePrefix("file://"))
    val bitmap = BitmapFactory.decodeFile(file.absolutePath)
    if (bitmap == null) {
      promise.reject("E_DECODE", "Failed to decode image", null)
      return@AsyncFunction
    }

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

    val result = mapOf(
      "r" to r / count,
      "g" to g / count,
      "b" to b / count,
      "a" to a / count
    )

    promise.resolve(result)
  } catch (e: Exception) {
    promise.reject("E_FAILED", e.message ?: "Unknown error", e)
  }
    }

    // Enables the module to be used as a native view. Definition components that are accepted as part of
    // the view definition: Prop, Events.
  }
}
