import React, { useState } from 'react';
import {
	AppBar,
	FormControl,
	FormLabel,
	FormControlLabel,
	RadioGroup,
	Radio
} from '@material-ui/core';
import { SearchBar } from '@clubhub/components';
// import { icon } from '@material-ui/icons';
import styles from './SearchClubPage.module.css';
import { filterByKeyword, sortBy, filterByStatus } from './helpers';

const MockData = [
	{
		id: 1,
		name: 'codingHub',
		favorite: 1000000000000000,
		rating: 5,
		tags: ['coding', 'cs']
	},
	{
		id: 2,
		name: 'V-Nation',
		favorite: 10,
		rating: 4.5,
		tags: ['cultural', 'vietnam']
	},
	{
		id: 3,
		name: 'JCab',
		favorite: 1,
		rating: 4,
		tags: ['cultural', 'japanesse']
	},
	{
		id: 4,
		name: 'CA',
		favorite: 5,
		rating: 4,
		tags: ['cultural', 'chinesse']
	}
];

console.log(sortBy(MockData, 'rating', 'asc'));

const SearchClubPage = () => {
	const [allClubs, setAllClubs] = useState(MockData);
	const [displayClubs, setDisplayClubs] = useState([...allClubs]);
	const [searchValue, setSearchValue] = useState('');
	const [statusValue, setStatusValue] = useState(true);

	const handleChangeSearchBar = (e) => {
		setSearchValue(e.target.value);
		let newDisplayClubs = filterByKeyword(allClubs, e.target.value);
		newDisplayClubs = filterByStatus(newDisplayClubs, statusValue);
		setDisplayClubs(newDisplayClubs);
	};

	const handleChangeStatusOption = (e) => {
		setStatusValue(e.target.value);
		let newDisplayClubs = filterByStatus(allClubs, e.target.value);
		newDisplayClubs = filterByKeyword(newDisplayClubs, searchValue);
		setDisplayClubs(newDisplayClubs);
	};

	const handleChangeSortOptions = (e) => {
		const [type, order] = e.target.value.split(',');
		console.log(type, order);
		const newDisplayClubs = sortBy([...displayClubs], type, order);
		console.log(newDisplayClubs);
		setDisplayClubs(newDisplayClubs);
	};

	const appBar = (
		<AppBar className='appBar' position='static'>
			<p>quan dep trai</p>
		</AppBar>
	);
	const sortingOptions = (
		<FormControl component='fieldset'>
			<FormLabel component='legend'>Sort Options</FormLabel>
			<RadioGroup defaultValue='rating,des' onChange={handleChangeSortOptions}>
				<FormControlLabel
					value={'rating,des'}
					control={<Radio />}
					label='Rating: High to Low'
				/>
				<FormControlLabel
					value={'rating,asc'}
					control={<Radio />}
					label='Rating: Low to High'
				/>
				<FormControlLabel
					value={'favorite,des'}
					control={<Radio />}
					label='Favorite: High to Low'
				/>
				<FormControlLabel
					value={'favorite,asc'}
					control={<Radio />}
					label='Favorite: Low to High'
				/>
			</RadioGroup>
		</FormControl>
	);
	const statusOptions = (
		<FormControl component='fieldset'>
			<FormLabel component='legend'>Status Options</FormLabel>
			<RadioGroup defaultValue={true} onChange={handleChangeStatusOption}>
				<FormControlLabel value={true} control={<Radio />} label='Active' />
				<FormControlLabel value={false} control={<Radio />} label='Inactive' />
				<FormControlLabel value={null} control={<Radio />} label='Active and Inactive' />
			</RadioGroup>
		</FormControl>
	);
	const clubList = (
		<div className={styles.clubList}>
			{displayClubs.map((club) => {
				return (
					<div className={styles.clubCard} key={club.id}>
						this is club card {club.name}
					</div>
				);
			})}
		</div>
	);

	return (
		<div className={styles.root}>
			{appBar}
			<div className={styles.wrapper}>
				<SearchBar onChange={handleChangeSearchBar} />
				<div className={styles.content}>
					<div className={styles.options}>
						<div>{statusOptions}</div>
						{sortingOptions}
					</div>
					{clubList}
				</div>
			</div>
		</div>
	);
};

export default SearchClubPage;
