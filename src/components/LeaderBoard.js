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
    let leaderboard = [];

    Object.values(users).map((user) =>
    leaderboard.push({
    id: user.id,
    avatarURL: user.avatarURL,
    name: user.name,
    questions: user.questions.length,
    answers: Object.keys(user.answers).length,
    score: user.questions.length + Object.keys(user.answers).length,
    }),
    );
    leaderboard.sort((a, b) => b.score - a.score);
    return (
      
      <div>
        
        <h3 className='center'>Leader Board</h3>

         <ul className='dashboard-list'>
           
          {leaderboard.map((user) => (
            <li key={user.id}>
             
               <div  className='tweet'>
        <img
          src={user.avatarURL}
          alt={`Avatar of ${user.name}`}
          className='avatar'
        />
        <div className='tweet-info'>
          <div>
            <div>{user.name}</div>
          </div>
      
          <div>
           
           <strong>Answered questions</strong> {user.answers}
       
          </div>
          
          <div>
           <strong>Unanswered questions </strong> {questionsNum -user.answers}
          </div>

          <div>
           <strong>Asked questions </strong> {user.questions}
          </div>
          <div>
             <strong>Score (questions asked + questions answered): </strong> {user.score}</div> 
      
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