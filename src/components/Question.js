import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  formatDate } from '../utils/helpers'

import { Link } from 'react-router-dom'



class Question extends Component {

  state = {
    selectedAnswer: ''
}
  
  

  render() {
    const {users,question } = this.props
    
    if (question === null) {
      return <p>This Question doesn't existd</p>
    }
  
     
    const {
      optionOne, optionTwo, timestamp, text,author
    } = question
    
   
    return (
      <Link to={`/question/${question.id}`} className='tweet'>
        <img
          src={users[author].avatarURL}
          alt={`Avatar of ${users[author].name}`}
          className='avatar'
        />
        <div className='tweet-info'>
          <div>
        
            <div>{formatDate(timestamp)}</div>
          
            <p>{text}</p>
          </div>
      
          <div>
           
           <strong>Option One: </strong>{optionOne.text}
       
           </div>
           <div>
            
           <strong>Option Two: </strong>{optionTwo.text}
        
            </div>

      
        </div>
      </Link>
    )
  }
}

function mapStateToProps ({authedUser, users, questions},props) {
  const { isAnswered } = props
  return {
    authedUser,
    users,
    questions,
    isAnswered,

  }
}

export default connect(mapStateToProps)(Question)