import React from 'react'
import styles from './HomePage.module.css'
import ClubApi from '../../apis/clubApi'

const HomePage = () => {
  return <div className={styles.root}>Home Page
  <ClubApi />

  </div>
}

export default HomePage
