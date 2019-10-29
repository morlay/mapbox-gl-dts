declare module "@mapbox/tiny-sdf" {
  export default class TinySDF {
    constructor(fontsize: number, buffer: number, radius: number, cutoff: number, fontFamily: string, fontWeight: number)

    draw(char: string): Uint8ClampedArray
  }
}