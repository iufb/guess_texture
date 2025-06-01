import * as React from 'react';

import { ColorAnalyzerViewProps } from './ColorAnalyzer.types';

export default function ColorAnalyzerView(props: ColorAnalyzerViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
