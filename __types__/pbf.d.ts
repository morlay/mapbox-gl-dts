declare module "pbf" {
  type ReadFunction<T> = (tag: number, result: T, pbf: Pbf) => void;

  export default class Pbf {
    constructor(buf?: ArrayBuffer | Uint8Array);

    readFields<T>(readField: ReadFunction<T>, result: T, end?: number): T;

    readMessage<T>(readField: ReadFunction<T>, result: T): T;

    readFixed32(): number;

    readSFixed32(): number;

    readFixed64(): number;

    readSFixed64(): number;

    readFloat(): number;

    readDouble(): number;

    readVarint(): number;

    readVarint64(): number;

    readSVarint(): number;

    readBoolean(): boolean;

    readString(): string;

    readBytes(): Uint8Array;
  }
}
