import React, { Component } from 'react'
import { connect } from 'react-redux'

import Question from './Question'
import {handleAddAnswer} from '../actions/questions'
import { Redirect } from 'react-router-dom'

class QuestionPage extends Component {

  state = {
    selectedAnswer: ''
}

formSubmit(event) {

  const { id, questions,dispatch } = this.props
  const question = questions[id]
  
 event.preventDefault();
  dispatch(handleAddAnswer(question.id, this.state.selectedAnswer))
}
onValueChange(answer) {
  
  this.setState((prevState) => {
    return {selectedAnswer: answer}
})

}

  render() {
    const { id, questions,authedUser } = this.props
    const question = questions[id]
    
	if(!question)
	{
		return <Redirect to='/Error' />
	}
    const isAnswered = 
   ( question.optionOne.votes.indexOf(authedUser) > -1 ||
                question.optionTwo.votes.indexOf(authedUser) > -1)
     const userAnswer = isAnswered=== true? (question.optionOne.votes.indexOf(authedUser) > -1 ?
     'optionOne':'optionTwo'
     )
     :null
    
    return (
      <div>
        <Question question = {question} isAnswered = {isAnswered} />  
        { (isAnswered === false)?(
        
        <form onSubmit={(e) => {this.formSubmit(e)}} className='new-tweet'>

    
      <div className="radio">
        <label>
          <input
            type="radio"
            value="optionOne"
            checked={this.state.selectedAnswer === "optionOne"}
            onChange={(e) => { this.onValueChange('optionOne')}}
          />
          optionOne
        </label>
      </div>
     
      <div className="radio">
        <label>
          <input
            type="radio"
            value="optionTwo"
            checked={this.state.selectedAnswer === "optionTwo"}
            onChange={(e) => { this.onValueChange('optionTwo')}}
          />
          optionTwo
        </label>
      </div>
      
      <div>
        Selected option is : {this.state.selectedAnswer}
      </div>
      <button className="btn btn-default" disabled = {this.state.selectedAnswer === ''} type="submit">
        Submit
      </button>
    </form>
       
      )
      :
      (<div>
        Your answer is {userAnswer}
        </div>)
     }
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
  const { id } = props.match.params

  return {
    id,
    questions,
    authedUser
  }
}

export default connect(mapStateToProps)(QuestionPage)