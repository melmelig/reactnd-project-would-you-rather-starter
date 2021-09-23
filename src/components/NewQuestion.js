import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewTweet extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false,
  }
  handleOptionOneChange = (e) => {
    const optionOneText = e.target.value

    this.setState(() => ({
      optionOneText
    }))
  }
  handleOptionTwoChange = (e) => {
    const optionTwoText = e.target.value

    this.setState(() => ({
      optionTwoText
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOneText,optionTwoText } = this.state
    const { dispatch, id } = this.props

    dispatch(handleAddQuestion(optionOneText, optionTwoText))

    this.setState(() => ({
      optionOneText:'',
      optionTwoText: '',
      toHome: id ? false : true,
    }))
  }
  render() {
    const { text, toHome } = this.state
    const { optionOneText,optionTwoText } = this.state

    if (toHome === true) {
      return <Redirect to='/' />
    }

    const tweetLeft1 = 280 - optionOneText.length
    const tweetLeft2 = 280 - optionTwoText.length

    return (
      <div>
        <h3 className='center'>Compose new Question</h3>
        <form className='new-tweet' onSubmit={this.handleSubmit}>
        <h4 className='center'>Would You Rather?</h4>
          <textarea
            placeholder="Option 1 Text"
            value={text}
            onChange={this.handleOptionOneChange}
            className='textarea'
            maxLength={280}
          />
            {tweetLeft1 <= 100 && (
            <div className='tweet-length'>
              {tweetLeft1}
            </div>
          )}
          <textarea
            placeholder="Option 2 Text"
            value={text}
            onChange={this.handleOptionTwoChange}
            className='textarea'
            maxLength={280}
          />
          {tweetLeft2 <= 100 && (
            <div className='tweet-length'>
              {tweetLeft2}
            </div>
          )}
          <button
            className='btn'
            type='submit'
            disabled={text === ''}>
              Submit
          </button>
        </form>
      </div>
    )
  }
}

export default connect()(NewTweet)