// Reexport the native module. On web, it will be resolved to ColorAnalyzerModule.web.ts
// and on native platforms to ColorAnalyzerModule.ts
export { default } from './src/ColorAnalyzerModule';
export { default as ColorAnalyzerView } from './src/ColorAnalyzerView';
export * from  './src/ColorAnalyzer.types';
