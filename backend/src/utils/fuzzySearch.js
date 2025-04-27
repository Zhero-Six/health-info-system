/**
 * Performs fuzzy search on items based on query and fields.
 * @param {Array} items - Array of objects to search.
 * @param {string} query - Search query.
 * @param {string[]} fields - Fields to search in.
 * @returns {Array} Filtered items.
 */
const fuzzySearch = (items, query, fields) => {
    const lowerQuery = query.toLowerCase();
    return items.filter(item =>
      fields.some(field =>
        String(item[field]).toLowerCase().includes(lowerQuery)
      )
    );
  };
  
  module.exports = fuzzySearch;