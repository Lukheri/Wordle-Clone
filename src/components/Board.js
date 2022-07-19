import React from 'react'
import Guess from './Guess'

export default function Board({ guesses, guessTurn, currentGuess, answer }) {
  return (
    <div className='board'>
      {
        guesses.map((guess, i) => {
          const isCurrentGuess = i === guessTurn
          return(
            <Guess key={i} 
            guess={isCurrentGuess ? currentGuess : guess ?? ''}
            lockGuess={!isCurrentGuess && guess != null}
            answer={answer}
            />)
        })
      }
    </div>
  )
}
