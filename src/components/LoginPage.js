import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class LoginPage extends Component {
  state = {
    LoggedInUser: null,
    toHome: false,
  }
  handleOptionChange = (e) => {
    const selOption = e.target.value

    this.setState(() => ({
      LoggedInUser:selOption
    }))
  }
  handleLogin = (e) => {
    e.preventDefault()

    const { LoggedInUser } = this.state
    const { dispatch } = this.props

    dispatch(setAuthedUser(LoggedInUser))
  }
  render() {
    const { LoggedInUser } = this.state

    return (
      <div>
        <h3 className='center'>Would You Rather App</h3>
        <select className='new-tweet' value={LoggedInUser?LoggedInUser:-1} name="selectList" id="selectList" onChange={(event) => this.handleOptionChange(event)}>
            <option value="-1" disabled>Select user...</option>
            <option value="sarahedo">Sarah Edo</option>
            <option value="tylermcginnis">Tyler McGinnis</option>
            <option value="johndoe">john doe</option>
        </select>

        <button
					className='btn'
					disabled={LoggedInUser === null}
					onClick={(event) => this.handleLogin(event)}>
					Login
				</button>

      </div>
    )
  }
}


export default connect()(LoginPage)