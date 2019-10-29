declare module "@mapbox/mapbox-gl-supported" {
  const v: {
    (options?: { failIfMajorPerformanceCaveat: boolean }): boolean,
    webGLContextAttributes: WebGLContextAttributes
  }
  export = v;
}
