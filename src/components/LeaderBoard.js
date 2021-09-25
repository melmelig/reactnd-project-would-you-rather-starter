import React, { Component } from 'react'
import { connect } from 'react-redux'



class LeaderBoard extends Component {
  state = {
    DefaultView: true
}
filterQuestions = (DefaultView) => {
  this.setState((state) => {
      return { DefaultView: DefaultView }
  })
  
}
  render() {
    const {questions,users} = this.props
    const userIds = Object.keys(users)

    const questionsNum = Object.keys(questions).length
  
    return (
      <div>
        
        <h3 className='center'>Leader Board</h3>

         <ul className='dashboard-list'>
           
          {userIds.map((user) => (
            <li key={user}>
             
               <div  className='tweet'>
        <img
          src={users[user].avatarURL}
          alt={`Avatar of ${users[user].name}`}
          className='avatar'
        />
        <div className='tweet-info'>
          <div>
            <div>{users[user].name}</div>
          </div>
      
          <div>
           
           <strong>Answered questions</strong> {Object.keys(users[user].answers).length}
       
          </div>
          
          <div>
           <strong>Unanswered questions </strong> {questionsNum - Object.keys(users[user].answers).length}
          </div>

          <div>
           <strong>Asked questions </strong> { Object.keys(users[user].questions).length}
          </div>

      
        </div>
      </div>
    
            </li>
            
          ))}
         
        </ul> 
      </div>
    )
  }
}

function mapStateToProps ({ users,authedUser,questions }) {
  return {
  authedUser,
  questions,
  users
  
  //Object.keys(users)
      //.sort((a,b) => users[b].timestamp - users[a].timestamp)
  }
}

export default connect(mapStateToProps)(LeaderBoard)