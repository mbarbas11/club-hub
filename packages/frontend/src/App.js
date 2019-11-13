import React from 'react'
import styles from './App.module.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AppBar } from '@clubhub/components'
import { 
  HomePage,
  ClubPage,
  NotFoundPage,
  LoginPage,
  RegisterPage,
  SettingPage
} from './pages'

const App = () => {
  return (
    <div className={styles.root}>
      <Router>
        <AppBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/club/:id" component={ClubPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/setting" component={SettingPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
