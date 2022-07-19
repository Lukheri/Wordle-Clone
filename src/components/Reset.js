import React from 'react'

export default function Reset({ open, setGameOver, words, setGuessTurn, setGuesses, setAnswer, guessTurn, setStyles }) {
    if(!open && (guessTurn < 6)){
        return null
    }

    const handleClick = () => {
        setGameOver(false)
        setGuessTurn(0)
        setGuesses(Array(6).fill(null))
        setAnswer(words[Math.floor(Math.random() * words.length)])
        setStyles({
            a: {'background': '#eee'},
            b: {'background': '#eee'},
            c: {'background': '#eee'},
            d: {'background': '#eee'},
            e: {'background': '#eee'},
            f: {'background': '#eee'},
            g: {'background': '#eee'},
            h: {'background': '#eee'},
            i: {'background': '#eee'},
            j: {'background': '#eee'},
            k: {'background': '#eee'},
            l: {'background': '#eee'},
            m: {'background': '#eee'},
            n: {'background': '#eee'},
            o: {'background': '#eee'},
            p: {'background': '#eee'},
            q: {'background': '#eee'},
            r: {'background': '#eee'},
            s: {'background': '#eee'},
            t: {'background': '#eee'},
            u: {'background': '#eee'},
            v: {'background': '#eee'},
            w: {'background': '#eee'},
            x: {'background': '#eee'},
            y: {'background': '#eee'},
            z: {'background': '#eee'}
        })
    }

    return (
        <>
            <div className='reset-overlay'></div>
            <div className='reset'>
                {((guessTurn === 6 && !open)) ? 'YOU RAN OUT OF GUESS D:' : 'CONGRATS! YOU GUESSED THE WORD'}
                <button onClick={handleClick}>RESET</button>
            </div>        
        </>

    )
}
