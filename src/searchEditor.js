import { find, uniq } from "lodash";

export function addValue(syntaxTree, key, newValue) {
  const attributeInQuery = find(syntaxTree, { key: key });

  // add to existing key
  if (attributeInQuery) {
    attributeInQuery.values = uniq([...attributeInQuery.values, newValue]);
    return syntaxTree;
  }

  // new key:value
  syntaxTree.push({
    key: key,
    values: [newValue]
  });
  return syntaxTree;
}

export function toggleValue(syntaxTree, key, newValue) {
  const attributeInQuery = find(syntaxTree, { key: key });

  // add to existing key
  if (attributeInQuery) {
    const valueIndex = attributeInQuery.values.indexOf(newValue);
    if (valueIndex === -1) {
      attributeInQuery.values = [...attributeInQuery.values, newValue];
    } else {
      if (attributeInQuery.values.length === 1) {
        return syntaxTree.filter(attribute => attribute !== attributeInQuery);
      } else {
        attributeInQuery.values.splice(valueIndex, 1);
      }
    }
    return syntaxTree;
  }

  // new key:value
  syntaxTree.push({
    key: key,
    values: [newValue]
  });
  return syntaxTree;
}

export function print(syntaxTree = []) {
  const attributesStrings = [];
  // iterate over attributes
  syntaxTree.forEach(attribute => {
    // print one value or many values
    if (attribute.values.length === 1) {
      attributesStrings.push(`${attribute.key}:${attribute.values[0]}`);
    } else {
      attributesStrings.push(
        `${attribute.key}:(${attribute.values.join(" ")})`
      );
    }
  });
  return attributesStrings.join(" ");
}
