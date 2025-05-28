package com.iufb.guesstexture

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class ColorAnalyzerPackage : ReactPackage {
  override fun createNativeModules(context: ReactApplicationContext): List<NativeModule> {
    return listOf(ColorAnalyzerModule(context))
  }

  override fun createViewManagers(context: ReactApplicationContext): List<ViewManager<*, *>> {
    return emptyList()
  }
}
