import { NativeModule, requireNativeModule } from 'expo';

import { ColorAnalyzerModuleEvents } from './ColorAnalyzer.types';

declare class ColorAnalyzerModule extends NativeModule<ColorAnalyzerModuleEvents> {
    getAverageColor(filePath: string, x: number, y: number): Promise<number>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ColorAnalyzerModule>('ColorAnalyzer');
