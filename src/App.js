import { useState, useEffect, useCallback } from 'react'
import axios from "axios"
import Board from './components/Board'
import Getting from './components/Getting'
import Reset from './components/Reset'
import Keyboard from './components/Keyboard'
  
function App() {
  const [words, setWords] = useState(null)
  const [answer, setAnswer] = useState('')
  const [guesses, setGuesses] = useState(Array(6).fill(null))
  const [guessTurn, setGuessTurn] = useState(0)
  const [currentGuess, setCurrentGuess] = useState('')
  const [gameOver, setGameOver] = useState(false)
//   const [styles, setStyles] = useState({
//     a: {'background': '#eee'},
//     b: {'background': '#eee'},
//     c: {'background': '#eee'},
//     d: {'background': '#eee'},
//     e: {'background': '#eee'},
//     f: {'background': '#eee'},
//     g: {'background': '#eee'},
//     h: {'background': '#eee'},
//     i: {'background': '#eee'},
//     j: {'background': '#eee'},
//     k: {'background': '#eee'},
//     l: {'background': '#eee'},
//     m: {'background': '#eee'},
//     n: {'background': '#eee'},
//     o: {'background': '#eee'},
//     p: {'background': '#eee'},
//     q: {'background': '#eee'},
//     r: {'background': '#eee'},
//     s: {'background': '#eee'},
//     t: {'background': '#eee'},
//     u: {'background': '#eee'},
//     v: {'background': '#eee'},
//     w: {'background': '#eee'},
//     x: {'background': '#eee'},
//     y: {'background': '#eee'},
//     z: {'background': '#eee'}
// })

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

  // const changeStyle = useCallback(( letter, style ) => {
  //   console.log(style)
  //   const newStyles = {...styles, [letter]: style}
  //   setStyles(newStyles) 
  // }, [styles])

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

          const guessArr = currentGuess.split('')
          for(let i=0; i<5; i++){
            const char = guessArr[i]
            console.log(char, answer[i])

            // if(char === answer[i]){
            //   const newStyles = {...styles, [char]: {'background': '#77DD77'}}
            //   setStyles(newStyles) 
            // }
          }

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
      {!words ? <Getting /> :
      <Board 
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
        // setStyles={setStyles}
      />
      {/* <Keyboard answer={answer} guess={guesses[guessTurn]} styles={styles} setStyles={setStyles} /> */}
    </div>
  )
}

export default App