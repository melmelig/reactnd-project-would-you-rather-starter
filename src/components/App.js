import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion'
import QuestionPage from './QuestionPage'
import Nav from './Nav'
import LoginPage from './LoginPage'
import { setAuthedUser } from '../actions/authedUser'
import LeaderBoard from './LeaderBoard'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  handleLogOut = (e) => {
    e.preventDefault()

    
    const { dispatch } = this.props

    dispatch(setAuthedUser(null))
  }
  render() {
    const { authedUser } = this.props
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            {this.props.showLogin === true
              ? <LoginPage/>
              : <div>
                <div>
                  Logged user: <strong>{authedUser}</strong>
                </div>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/new' component={NewQuestion} />

                  <Route path='/question/:id' component={QuestionPage} />
                  <Route path='/leaderboard' component={LeaderBoard} />
                   <button
					className='btn'
					
					onClick={(event) => this.handleLogOut(event)}>
					LogOut
				</button>
                </div>}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    showLogin: authedUser === null,
    authedUser
  }
}

export default connect(mapStateToProps)(App)