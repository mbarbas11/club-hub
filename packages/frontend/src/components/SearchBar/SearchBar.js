import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onChange }) => {
	return (
		<input
			type='search'
			placeholder='Search...'
			className={styles.SearchBar}
			onChange={onChange}
		/>
	);
};

export default SearchBar;
