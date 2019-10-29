import { tsTypeParameter, TSTypeParameter, TypeParameter } from '@babel/types';
import { convertFlowType } from './convert_flow_type';
import { baseNodeProps } from '../utils/baseNodeProps';

export function convertTypeParameter(node: TypeParameter): TSTypeParameter {
  return tsTypeParameter(
    node.bound && {
      ...baseNodeProps(node.bound.typeAnnotation),
      ...convertFlowType(node.bound.typeAnnotation),
    },
    node.default && { ...baseNodeProps(node.default), ...convertFlowType(node.default) },
    node.name!,
  );
}
