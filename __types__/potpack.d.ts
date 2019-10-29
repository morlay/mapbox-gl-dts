declare module "potpack" {
  type Bin = {
    x: number,
    y: number,
    w: number,
    h: number
  };

  export default function potpack(bins: Array<Bin>): { w: number, h: number, fill: number };
}
