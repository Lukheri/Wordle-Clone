import { useState, useEffect } from 'react'
import axios from "axios"
import Board from './components/Board'
import Getting from './components/Getting'
import Reset from './components/Reset'
  
function App() {
  const [words, setWords] = useState(null)
  const [answer, setAnswer] = useState('')
  const [guesses, setGuesses] = useState(Array(6).fill(null))
  const [guessTurn, setGuessTurn] = useState(0)
  const [currentGuess, setCurrentGuess] = useState('')
  const [gameOver, setGameOver] = useState(false)

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
      if(!gameOver && (guessTurn < 6)){
        if((event.key === 'Enter') && (currentGuess.length === 5)){
          if(!words.includes(currentGuess.toLowerCase())){
            console.log('Invalid word')
            return
          } 
          if (currentGuess === answer){
            setGameOver(true)
          } 

          const newGuesses = [...guesses]
          newGuesses[guessTurn] = currentGuess.toLowerCase()
          setGuesses(newGuesses)
          setCurrentGuess('')
          setGuessTurn(prev => prev + 1)
          console.log(answer)
        }

        if(event.key === 'Backspace'){
          setCurrentGuess(oldGuess => oldGuess.slice(0, -1))
          return
        }

        if((/^[A-Za-z]$/.test(event.key)) && (currentGuess.length < 5)){
          setCurrentGuess(oldGuess => oldGuess + event.key)
        }        
      }

    }
    window.addEventListener('keydown', handleType)

    return () => window.removeEventListener('keydown', handleType)
  }, [answer, currentGuess, gameOver, guessTurn, guesses, words])
 
  return (
    <div className="App">
      <h1>WORDLE</h1>
      {!words ? <Getting /> : ''}
      {words && <Board 
        guesses={guesses}
        guessTurn={guessTurn}
        currentGuess={currentGuess}
        answer={answer}
      />}
      <Reset 
        open={gameOver}
        setGameOver={setGameOver}
        words={words}
        setGuessTurn={setGuessTurn}
        setGuesses={setGuesses}
        setAnswer={setAnswer}
        guessTurn={guessTurn}
      />
    </div>
  )
}

export default App