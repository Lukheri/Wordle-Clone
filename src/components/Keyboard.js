import React, { useEffect, useState } from 'react'

export default function Keyboard({ answer, guess, styles, setStyles }) {
    const [keys, setKeys] = useState([
        {"key": "a", 'style': {'background': '#eee'}},
        {"key": "b", 'style': {'background': '#eee'}},
        {"key": "c", 'style': {'background': '#eee'}},
        {"key": "d", 'style': {'background': '#eee'}},
        {"key": "e", 'style': {'background': '#eee'}},
        {"key": "f", 'style': {'background': '#eee'}},
        {"key": "g", 'style': {'background': '#eee'}},
        {"key": "h", 'style': {'background': '#eee'}},
        {"key": "i", 'style': {'background': '#eee'}},
        {"key": "j", 'style': {'background': '#eee'}},
        {"key": "k", 'style': {'background': '#eee'}},
        {"key": "l", 'style': {'background': '#eee'}},
        {"key": "m", 'style': {'background': '#eee'}},
        {"key": "n", 'style': {'background': '#eee'}},
        {"key": "o", 'style': {'background': '#eee'}},
        {"key": "p", 'style': {'background': '#eee'}},
        {"key": "q", 'style': {'background': '#eee'}},
        {"key": "r", 'style': {'background': '#eee'}},
        {"key": "s", 'style': {'background': '#eee'}},
        {"key": "t", 'style': {'background': '#eee'}},
        {"key": "u", 'style': {'background': '#eee'}},
        {"key": "v", 'style': {'background': '#eee'}},
        {"key": "w", 'style': {'background': '#eee'}},
        {"key": "x", 'style': {'background': '#eee'}},
        {"key": "y", 'style': {'background': '#eee'}},
        {"key": "z", 'style': {'background': '#eee'}}
    ])

    return (
        <div className='keyboard'>
            {keys.map(letter => {
                return(
                    <div key={letter.key} style={styles[letter.key]}>{letter.key}</div>
                )
            })}
        </div>
    )
}
