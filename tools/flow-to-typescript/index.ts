import {NodePath, PluginObj, Visitor} from '@babel/core';
import {addComment, BlockStatement, removeComments} from "@babel/types";
import {PluginPass} from './types';
import {ArrowFunctionExpression} from './visitors/arrow_function_expression';
import {CallExpression} from './visitors/call_expression';
import {ClassDeclaration} from './visitors/class_declaration';
import {DeclareClass} from './visitors/declare_class';
import {DeclareExportDeclaration} from './visitors/declare_export_declaration';
import {DeclareFunction} from './visitors/declare_function';
import {DeclareInterface} from './visitors/declare_interface';
import DeclareModule from './visitors/declare_module';
import {DeclareModuleExports} from './visitors/declare_module_exports';
import {DeclareOpaqueType} from './visitors/declare_opaque_type';
import {DeclareTypeAlias} from './visitors/declare_type_alias';
import {DeclareVariable} from './visitors/declare_variable';
import {ExportAllDeclaration} from './visitors/export_all_declaration';
import {ExportNamedDeclaration} from './visitors/export_declaration';
import {FunctionDeclaration} from './visitors/function_declaration';
import {ImportDeclaration, ImportSpecifier} from './visitors/import_declaration';
import {InterfaceDeclaration} from './visitors/interface_declaration';
import {NewExpression} from './visitors/new_expression';
import {OpaqueType} from './visitors/opaque_type';
import Program from './visitors/program';
import TSModuleDeclaration from './visitors/ts_module_declaration';
import {TypeAlias} from './visitors/type_alias';
import {TypeAnnotation} from './visitors/type_annotation';
import {TypeCastExpression} from './visitors/type_cast_expression';
import {TypeParameterDeclaration} from './visitors/type_parameter_declaration';

const visitor: Visitor<PluginPass> = {
  Program,
  TypeAnnotation,
  TypeAlias,
  TypeParameterDeclaration,
  ImportDeclaration,
  ImportSpecifier,
  TypeCastExpression,
  OpaqueType,
  DeclareClass,
  ClassDeclaration,
  ClassExpression: ClassDeclaration,
  ExportAllDeclaration,
  ExportNamedDeclaration,
  InterfaceDeclaration,
  DeclareFunction,
  FunctionDeclaration,
  CallExpression,
  DeclareVariable,
  DeclareTypeAlias,
  DeclareInterface,
  DeclareOpaqueType,
  DeclareModuleExports,
  DeclareModule,
  DeclareExportDeclaration,
  NewExpression,
  ArrowFunctionExpression,
  TSModuleDeclaration,
};

export default () => {

  return {
    name: 'babel-plugin-flow-to-typescript',
    visitor,

    manipulateOptions(_babel: any, parserOpts) {
      parserOpts.plugins.push('flow');
      if (parserOpts.isJSX) {
        parserOpts.plugins.push('jsx');
      }
      parserOpts.plugins.push('classProperties');
      parserOpts.plugins.push('objectRestSpread');
      parserOpts.plugins.push('optionalChaining');
      parserOpts.plugins.push('dynamicImport');
    },
  } as PluginObj<PluginPass>;
};
