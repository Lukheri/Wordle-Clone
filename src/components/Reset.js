import React from 'react'

export default function Reset({ open, setGameOver, words, setGuessTurn, setGuesses, setAnswer }) {
    if(!open){
        return null
    }

    const handleClick = () => {
        setGameOver(false)
        setGuessTurn(0)
        setGuesses(Array(6).fill(null))
        setAnswer(words[Math.floor(Math.random() * words.length)])
    }

    return (
        <>
            <div className='reset-overlay'></div>
            <div className='reset'>
                CONGRATS! YOU GUESSED THE WORD
                <button onClick={handleClick}>RESET</button>
            </div>        
        </>

    )
}
