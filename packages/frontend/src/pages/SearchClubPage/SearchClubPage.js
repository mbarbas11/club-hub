import React, { useState, useEffect } from 'react';
import {
	AppBar,
	FormControl,
	FormLabel,
	FormControlLabel,
	RadioGroup,
	Radio,
	Card,
	CardContent,
	Button,
	CardActions
} from '@material-ui/core';
import { SearchBar } from '@clubhub/components';
// import { icon } from '@material-ui/icons';
import styles from './SearchClubPage.module.css';
import { filterByKeyword, sortBy, filterByStatus } from './helpers';
import { getAllClubs } from '../../apis';

const SearchClubPage = () => {
	const [allClubs, setAllClubs] = useState([]);
	const [displayClubs, setDisplayClubs] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [statusValue, setStatusValue] = useState(true);

	const handleChangeSearchBar = (e) => {
		let newDisplayClubs = allClubs;
		if (e.target.value !== '') {
			newDisplayClubs = filterByKeyword(allClubs, e.target.value);
		}
		newDisplayClubs = filterByStatus(newDisplayClubs, statusValue);
		setSearchValue(e.target.value);
		setDisplayClubs(newDisplayClubs);
	};

	const handleChangeStatusOption = (e) => {
		let statusValue = e.target.value;
		if (e.target.value === 'true') {
			statusValue = true;
		} else if (e.target.value === 'false') {
			statusValue = false;
		}
		let newDisplayClubs = filterByStatus(allClubs, statusValue);
		if (searchValue !== '') {
			newDisplayClubs = filterByKeyword(newDisplayClubs, searchValue);
		}
		setStatusValue(statusValue);
		setDisplayClubs(newDisplayClubs);
	};

	const handleChangeSortOptions = (e) => {
		const [type, order] = e.target.value.split(',');
		console.log(type, order);
		const newDisplayClubs = sortBy([...displayClubs], type, order);
		console.log(newDisplayClubs);
		setDisplayClubs(newDisplayClubs);
	};

	useEffect(() => {
		getAllClubs()
			.then((clubData) => {
				setAllClubs([...clubData]);
				setDisplayClubs([...clubData]);
			})
			.catch((err) => {
				console.log('get club error', { err });
			});
	}, []);

	const appBar = (
		<AppBar className='appBar' position='static'>
			<p>CLUB HUB</p>
		</AppBar>
	);
	const sortingOptions = (
		<FormControl component='fieldset'>
			<FormLabel component='legend'>Sort Options</FormLabel>
			<RadioGroup onChange={handleChangeSortOptions}>
				<FormControlLabel
					value={'rating,dec'}
					control={<Radio />}
					label='Rating: High to Low'
				/>
				<FormControlLabel
					value={'rating,asc'}
					control={<Radio />}
					label='Rating: Low to High'
				/>
				<FormControlLabel
					value={'favorite,dec'}
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
			<RadioGroup defaultValue='both' onChange={handleChangeStatusOption}>
				<FormControlLabel value={'both'} control={<Radio />} label='Active and Inactive' />
				<FormControlLabel value='true' control={<Radio />} label='Active' />
				<FormControlLabel value='false' control={<Radio />} label='Inactive' />
			</RadioGroup>
		</FormControl>
	);
	const clubList = (
		<div className={styles.clubList}>
			{displayClubs.length ? (
				displayClubs.map((club) => {
					console.log(club.name.length);
					return (
						// <div className={styles.clubCard} key={club.id}>
						// 	this is club card {club.name}
						// </div>
						<Card className={styles.clubCard}>
							<CardContent className={styles.clubCardContent}>
								<img
									src='http://thelcbridge.com/wp-content/uploads/2014/10/StudentClubsandOrgs.jpg'
									width='120px'
									height='120px'
								/>
								<div className={styles.clubCardInfo}>
									<div className={styles.clubCardHeader}>
										<h1>{club.name}</h1>
										<Button variant='contained'>Join</Button>
										<Button
											className={styles.clubCardSeeMore}
											variant='contained'
											href={'http://localhost:3000/club/' + club.id}
										>
											See More
										</Button>
									</div>
									<p>
										{club.description.length > 200
											? club.description.substring(0, 200) + '...'
											: club.description}
									</p>
								</div>
							</CardContent>
						</Card>
					);
				})
			) : (
				<div>No Club Found</div>
			)}
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
