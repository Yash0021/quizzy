import React from "react"
import Options from "./Options"
import Answers from "./Answers"
import { nanoid } from "nanoid"
import LinearDeterminate from './Loader'

const createOptions = (options) => {
    return options.map(option => {
        return {
            option: option,
            id: nanoid(),
            selected: false
        }
    })
}

const generateQuestion = (questionData) => {
    const result = questionData.map(question => {
        return {
            question: question.question.toString(),
            options: createOptions([...question.incorrect_answers, question.correct_answer].sort()),
            answer: question.correct_answer,
            isAnswered: false,
            id: nanoid()
        }
    })

    return result
}

const Question = () => {
    const [questions, setQuestions] = React.useState([])
    const [showAnswers, setShowAnswers] = React.useState(false)
    const [score, setScore] = React.useState(0)

    function handleSelect(parentId, optionId){
        setQuestions(preQuestions => {
            return preQuestions.map((question) => {
                return question.id === parentId ? {
                    ...question,
                    options: question.options.map((option) => {
                        return parentId === question.id ? (option.id === optionId ? 
                            {...option, selected: !option.selected} 
                            : 
                            {...option, selected: false})
                            : option
                    }),
                    isAnswered: true
                }
                : {...question}
            })
        })
    }

    React.useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=10')
            .then(res => res.json())
            .then(data => {
                setQuestions(generateQuestion(data.results))
            })
    }, [])

    function checkValidAnswer(question){
        for(let i=0;i < question.options.length;i++){
            if(question.options[i].selected && question.options[i].option === question.answer){
                return true
            }
        }
    }

    function getUserScore(){
        let userScore = 0
        for(let i=0;i < questions.length;i++){
            if(checkValidAnswer(questions[i])){
                userScore += 1
            }
        }

        setScore(userScore)
    }

    function verifyAnswer(){
        const result = questions.map(question => {
            return {
                ...question,
                valid: checkValidAnswer(question)
            }
        })

        setQuestions(result)
        setShowAnswers(pre => !pre)
        getUserScore()
    }

    const renderQuestions = questions.map((question, i) => {
        return <div key={i} id={question.id} className="question-body">
            <p className="content question">{question.question.toString('utf-8')}</p>
            <Options parentId={question.id} onSelect={handleSelect} options={question.options} /> 
        </div>
    })

    function restartGame(newQuestion){
        setQuestions([])
        fetch('https://opentdb.com/api.php?amount=10')
            .then(res => res.json())
            .then(data => setQuestions(generateQuestion(data.results)))
        
        setShowAnswers(false)
    }


    return !showAnswers ? 
        questions.length === 0 
        ? <LinearDeterminate variant="determinate" />
        : <div className="main-question-page">
            <h1 style={{fontSize: "2.5rem", margin: "0"}} className={"heading" + (window.innerWidth < 800 ? "" : " center-text")}>Let's test your knowledge</h1>
            <div className="question-page">
                {renderQuestions}
            </div>
            <button onClick={verifyAnswer} id="answer-check-button" className="answer-button widget-font" type="button">Check Answers</button>
        </div> 
        : 
        <Answers userScore={score} resetRequest={restartGame} questions={questions} />
}

export default Question
