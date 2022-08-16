
import React from 'react'

const Answer = (props) => {
    const renderOptions = props.options.map((option, i) => {
        return <div
            key={i} 
            className={"widget-font " + 
                (!props.isAnswered ? "" : (option.selected && props.answer === option.option 
                ? 
                "selected"
                : option.option === props.answer ?
                "selected" 
                : option.selected && props.answer !== option.option ?
                "wrong"
                : "")
            )}
            >{option.option}
        </div>
    })

    return <div className="options">
        {renderOptions}
    </div>
}

const Answers = (props) => {

    const renderQuestions = props.questions.map((question, i) => {
        return <div key={i} className="question-body">
            <div className="question-description">
                <p className="content question">{question.question}</p>
                {!question.isAnswered && <small className="content answer-tag">Not Answered</small>}
            </div>
            <Answer isAnswered={question.isAnswered} answer={question.answer} validAnswer={question.valid} options={question.options} /> 
        </div>
    })

    function handleClick(){
        props.resetRequest()
    }
    
    return <div className="main-question-page">
        <div className="info">
            <div className="oneline">
                <div style={{margin: "0 5px"}} className="circle red-circle"></div>
                <small className="heading">Wrong Answer</small>    
            </div>
            <div className="oneline">
                <div style={{margin: "0 5px"}} className="circle blue-circle"></div>
                <small className="heading">Valid Answer</small>
            </div>
        </div>
        <div aria-disabled className="question-page">
            {renderQuestions}
        </div>

        <div className="answer-footer">
            <h2 className="content center">You score: {props.userScore}/10.</h2>
            <button type="button" className="reset-button" onClick={handleClick}>Reset</button>
        </div>
    </div>
}

export default Answers
