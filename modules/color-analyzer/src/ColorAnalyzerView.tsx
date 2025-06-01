import { requireNativeView } from 'expo';
import * as React from 'react';

import { ColorAnalyzerViewProps } from './ColorAnalyzer.types';

const NativeView: React.ComponentType<ColorAnalyzerViewProps> =
  requireNativeView('ColorAnalyzer');

export default function ColorAnalyzerView(props: ColorAnalyzerViewProps) {
  return <NativeView {...props} />;
}
