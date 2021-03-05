/**
 * Extracts the names from the propernames value as an array
 * Duplicates are removed and then sorted by the number of occurences
 * @param {string} propernames Raw value of propernames
 * @return {array} Sorted propernames without duplicates as an array
 */

export default function getPropernames (propernames) {
  const splitNames = typeof propernames === "string"
    ? propernames.split(",")
    : propernames;

  const namesWithCount = splitNames.reduce((acc, val) => {
    acc[val] ? acc[val]++ : (acc[val] = 1);
    return acc;
  }, {});

  const sorted = Object.entries(namesWithCount)
    .sort((a, b) => b[1] - a[1])
    .map(([name]) => name);

  return sorted;
}
