import React from 'react'
import styles from './AppBar.module.css'
import { Link } from 'react-router-dom'
import { SearchBar } from '@clubhub/components'


const AppBar = () => {
  return (
    <div className={styles.root}>
      <SearchBar/>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/setting">Setting</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AppBar
