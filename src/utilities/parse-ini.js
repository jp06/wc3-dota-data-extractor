/**
 * Extracts data from an INI file in the form of a nested JS object
 * Modified code of flowtsohg's INI parser `load()` method
 * The output is changed from ES6 Map to a simple JS object
 * and can now handle multiple quoted string arguments and have an option to not group by section
 * flowtsohg's INI parser: https://github.com/flowtsohg/mdx-m3-viewer/blob/master/src/parsers/ini/file.ts
 * @param {string} ini Contents of INI as string
 * @param {boolean} groupBySection Defaults to true. 
 * Set to false if you want to ignore the sections and just parse the `key=value` entries.
 * @return {object} Nested object with sections as property name
 */

export default function parseIni(ini, groupBySection = true) {
  const output = {};
  const regex = {
    comment: /^((\/\/)|(;)).+?/,
    section: /^\[(.+?)\]/,
    property: /^(.+?)=(.*?)$/
  };

  let section;

  for (let line of ini.split("\r\n")) {
    // INI defines comments as starting with a semicolon ';'.
    // However, Warcraft 3 INI files use normal C comments '//'.
    // In addition, Warcraft 3 files have empty lines.
    // Therefore, ignore any line matching any of these conditions.
    if (line.length && !line.match(regex.comment)) {
      let match = line.match(regex.section);

      if (match) {
        if (!groupBySection) continue;
        section = match[1].trim();
        output[section] = {};
      } else {
        match = line.match(regex.property);

        if (match) {
          const key = match[1];
          let value;
          if (match[2][0] === '"') {
            // Matches all quoted strings separated by comma
            const multipleStringArgsRegex = /("([^"]*)")|[^,]+/g;
            const stringArgs = match[2]
              .match(multipleStringArgsRegex)
              .map((text) => text.slice(1, text.length - 1));

            value = stringArgs.length > 1 ? stringArgs : stringArgs[0];
          } else {
            value = match[2];
          }

          if (groupBySection) {
            output[section][key] = value;
          } else {
            output[key] = value;
          }
        }
      }
    }
  }

  return output;
}
