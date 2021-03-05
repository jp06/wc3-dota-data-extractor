/**
 * Extracts data from an SLK file in the form of a nested JS object
 * with the first column cells as the property name.
 * Modified code of flowtsohg's SLK parser `load()` method.
 * flowtsohg's SLK parser: https://github.com/flowtsohg/mdx-m3-viewer/blob/master/src/parsers/slk/file.ts
 * @param {string} slk Contents of SLK as string
 * @return {object} Nested object with first column values as property name
 */

export default function parseSLK(slk) {
  if (!slk.startsWith("ID")) {
    throw new Error("WrongMagicNumber");
  }

  const output = {};
  const properties = {};

  let currentId;
  let currentRow;
  let currentProperty;

  for (const line of slk.split("\n")) {
    if (line[0] !== "B") {
      for (const token of line.split(";")) {
        const operator = token[0];
        const valueString = token.slice(1).trim();
        let value;

        if (operator === "X") {
          currentProperty = valueString;
        } else if (operator === "Y") {
          currentRow = valueString;
        } else if (operator === "K") {
          if (valueString[0] === '"') {
            value = valueString.substring(1, valueString.length - 1);
          } else if (valueString === "TRUE") {
            value = true;
          } else if (valueString === "FALSE") {
            value = false;
          } else {
            value = parseFloat(valueString);
          }

          const isFirstRow = currentRow === "1";
          const isFirstColumn = currentProperty === "1";

          if (!isFirstColumn) {
            if (isFirstRow) {
              properties[currentProperty] = value;
            } else {
              const property = properties[currentProperty];
              output[currentId][property] = value;
            }
          } else if (!isFirstRow) {
            currentId = value;
            output[currentId] = {};
          }
        }
      }
    }
  }

  return output;
}
