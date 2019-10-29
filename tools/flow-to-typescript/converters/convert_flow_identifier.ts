import {Identifier, isIdentifier, QualifiedTypeIdentifier, TSQualifiedName, tsQualifiedName,} from '@babel/types';

// A.B.C -> A.B.C
export function convertFlowIdentifier(
  id: QualifiedTypeIdentifier | Identifier,
): TSQualifiedName | Identifier {
  if (isIdentifier(id)) {
    switch (id.name) {
      case "TimeoutID":
        id.name = "number";
        return id
      case "$ArrayBufferView":
        id.name = "ArrayBufferView";
        return id
    }
    return id;
  }
  return tsQualifiedName(convertFlowIdentifier(id.qualification), id.id);
}
