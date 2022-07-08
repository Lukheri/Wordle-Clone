import { useState, useEffect } from 'react'
import axios from "axios"
import Guess from './components/Guess'
import Board from './components/Board'
  
function App() {
  const [words, setWords] = useState([])
  const [answer, setAnswer] = useState('')
  const [guesses, setGuesses] = useState(Array(6).fill(null))
  const [guessTurn, setGuessTurn] = useState(0)
  const [currentGuess, setCurrentGuess] = useState('')

  const getWordList = () => {
    axios
      .get('https://random-word-api.herokuapp.com/all')
      .then(response => {
        const wordList = response.data.filter(word => word.length === 5)
        setAnswer(wordList[Math.floor(Math.random() * wordList.length)])
        setWords(wordList)
      })
  }

  useEffect(getWordList, [])

  useEffect(() => {
    const handleType = (event) => {
      if((event.key === 'Enter') && (currentGuess.length === 5)){
        if(!words.includes(currentGuess)){
          console.log('Invalid word')
        } else if (currentGuess === answer){
          console.log('NICE!')
        } else{
          const newGuesses = [...guesses]
          newGuesses[guessTurn] = currentGuess
          setGuesses(newGuesses)
          setCurrentGuess('')
          setGuessTurn(prev => prev + 1)
          console.log(answer)
        }
      }

      if(event.key === 'Backspace'){
        setCurrentGuess(oldGuess => oldGuess.slice(0, -1))
        return
      }

      if((/^[A-Za-z]$/.test(event.key)) && (currentGuess.length < 5)){
        setCurrentGuess(oldGuess => oldGuess + event.key)
      }
    }
    window.addEventListener('keydown', handleType)

    return () => window.removeEventListener('keydown', handleType)
  }, [answer, currentGuess, guessTurn, guesses, words])
 
  return (
    <div className="App">
      <h1>WORDLE</h1>
      <Board 
        guesses={guesses}
        guessTurn={guessTurn}
        currentGuess={currentGuess}
        answer={answer}
      />
      {/* <div className='board'>
        {
          guesses.map((guess, i) => {
            const isCurrentGuess = i === guessTurn
            return(
              <Guess key={i} 
              guess={isCurrentGuess ? currentGuess : guess ?? ''}
              lockGuesss={!isCurrentGuess && guess != null}
              answer={answer}
              />)
          })
        }
      </div> */}

    </div>
  )
}

export default App