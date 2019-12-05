/**
 * Filter clubs with names or keywords that is similar to the key
 * @param {String} key
 * @param {Object[]} clubs
 * @returns {Object[]} filtered clubs with names or keywords that is similar to the key
 */
export const filterByKeyword = (clubs, key) =>
	clubs.filter(({ name, tags }) => name.includes(key) || tags.some((tag) => tag.includes(key)));

/**
 * Filter clubs with property [active] set to true or false
 * @param {boolean} status
 * @param {Object[]} clubs
 * @returns {Object[]} filtered clubs with property [active] set to true or false
 */
export const filterByStatus = (clubs, status) =>
	clubs.filter(({ active }) => (status === 'both' ? true : status === active));

/**
 * Sort clubs by type of 'rating' or 'favorite'. Default to be ascending
 * @param {Object[]} clubs List of clubs
 * @param {'rating'|'favorite'} type
 * @param {'asc'|'dec'} order Ascending or decending
 * @returns {Object[]} sorted clubs by type of 'rating' or 'favorite. Default to be ascending
 */
export const sortBy = (clubs, type, order) =>
	[...clubs].sort((a, b) => {
		if (order.toLowerCase() === 'dec') {
			if (a[type] < b[type]) return 1;
			else if (a[type] > b[type]) return -1;
			else return 0;
		} else if (order.toLowerCase() === 'asc') {
			if (a[type] < b[type]) return -1;
			else if (a[type] > b[type]) return 1;
			else return 0;
		} else return 0;
	});
