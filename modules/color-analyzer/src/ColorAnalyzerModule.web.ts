import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './ColorAnalyzer.types';

type ColorAnalyzerModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class ColorAnalyzerModule extends NativeModule<ColorAnalyzerModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(ColorAnalyzerModule, 'ColorAnalyzerModule');
