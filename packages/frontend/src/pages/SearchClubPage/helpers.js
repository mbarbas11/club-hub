/**
 * Filter clubs with names or keywords that is similar to the key
 * @param {String} key
 * @param {Object[]} clubs
 * @returns {Object[]} filtered clubs with names or keywords that is similar to the key
 */
export const filterByKeyword = (clubs, key) =>
  clubs.filter(
    ({ name, keywords }) =>
      name.includes(key) || keywords.some(keyword => keyword.includes(key))
  )

/**
 * Filter clubs with property [active] set to true or false
 * @param {boolean} status
 * @param {Object[]} clubs
 * @returns {Object[]} filtered clubs with property [active] set to true or false
 */
export const filterByStatus = (clubs, status) =>
  clubs.filter(({ active }) => active === status)

/**
 * Sort clubs by type of 'rating' or 'favorite'. Default to be ascending
 * @param {Object[]} clubs List of clubs
 * @param {'rating'|'favorite'} type
 * @param {'asc'|'des'} order Ascending or decending
 * @returns {Object[]} sorted clubs by type of 'rating' or 'favorite. Default to be ascending
 */
export const sortBy = (clubs, type, order) =>
  [...clubs].sort((a, b) => {
    if (order.toLowerCase() === "des") {
      return a[type] < b[type]
    } else {
      return a[type] > b[type]
    }
  })
