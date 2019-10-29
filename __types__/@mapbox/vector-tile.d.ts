import {GeoJSONFeature} from '@mapbox/geojson-types';
import Point from '@mapbox/point-geometry';
import {VectorTile, VectorTileLayer} from "@mapbox/vector-tile";
import Pbf from 'pbf';

declare module "@mapbox/vector-tile" {
  export interface VectorTile {
    layers: { [k: string]: VectorTileLayer };
  }

  export class VectorTile implements VectorTile {
    constructor(pbf: Pbf);
  }

  export interface VectorTileLayer {
    version?: number;
    name: string;
    extent: number;
    length: number;

    feature(i: number): VectorTileFeature;
  }

  export interface VectorTileFeature {
    extent: number;
    type: 1 | 2 | 3;
    id: number;
    properties: { [k: string]: string | number | boolean };

    loadGeometry(): Array<Array<typeof Point>>;

    toGeoJSON(x: number, y: number, z: number): GeoJSONFeature;
  }

  export class VectorTileFeature implements VectorTileFeature {
    static types: ['Unknown', 'Point', 'LineString', 'Polygon'];
  }
}
