
import React from 'react';
import Question from './components/Question';

function App() {
  const [startQuiz, setStartQuiz] = React.useState(false)

  function handleClick(){
    setStartQuiz(preState => !preState)
  }

  return (
    <>
      {!startQuiz ?
        <div className="home">
          <h1 className="game-title heading">Quizzical</h1>
          <small className="game-description content">Test your knowledge and your memory here.</small>
          <button onClick={handleClick} className="start-button widget-font" type="button">Start quiz</button>
        </div>
      :
        <Question />
      } 
    </>
  );
}

export default App;
