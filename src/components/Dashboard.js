import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
//import Tweet from './Tweet'

class Dashboard extends Component {
  state = {
    DefaultView: true
}
filterQuestions = (DefaultView) => {
  this.setState((state) => {
      return { DefaultView: DefaultView }
  })
  
}
  render() {
    const {questions,authedUser} = this.props
    const {DefaultView} = this.state
    const allQuestions = Object.values(questions)
    const answered_questions = allQuestions.filter((question)=>
   ( question.optionOne.votes.indexOf(authedUser) > -1 ||
                question.optionTwo.votes.indexOf(authedUser) > -1)
)
    const unanswered_questions = allQuestions.filter((question)=>
    ( question.optionOne.votes.indexOf(authedUser) === -1 &&
                 question.optionTwo.votes.indexOf(authedUser) === -1)
 )
 const shownQuestions = DefaultView?unanswered_questions.sort((a,b,) => b.timestamp - a.timestamp): 
 answered_questions.sort((a,b,) => b.timestamp - a.timestamp)
    return (
      <div>
        <div className="btn-group">
                    <button className={ DefaultView ? 'btn-selected' : 'btn-default'} onClick={(e) => this.filterQuestions(true)}>Unanswered Questions</button>
                    <button className={ !DefaultView ? 'btn-selected' : 'btn-default'} onClick={(e) => this.filterQuestions(false)}>Answered Questions</button>
                </div>
        <h3 className='center'>{DefaultView?'your unanswered questions':'your answered questions'}</h3>

         <ul className='dashboard-list'>
           
          {shownQuestions.map((question) => (
            <li key={question.id}>
               <Question question = {question} />
            </li>
          ))}
         
        </ul> 
      </div>
    )
  }
}

function mapStateToProps ({ authedUser,questions }) {
  return {
  authedUser,
  questions
  
  //Object.keys(users)
      //.sort((a,b) => users[b].timestamp - users[a].timestamp)
  }
}

export default connect(mapStateToProps)(Dashboard)