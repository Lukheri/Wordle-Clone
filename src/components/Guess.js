import React from 'react'

export default function Guess({ guess, lockGuesss, answer }) {
    const boxes = []

    for (let i=0; i < 5; i++){
        const char = guess[i]
        let className = 'box'

        if(lockGuesss){
            className += ' correct'
            if(char === answer[i]){
                className += ' correct'
            } else if(answer.includes(char)){
                className += ' wrongPlace'
            } else {
                className += ' incorrect'
            }
        }
        boxes.push(<div key={i} className={className}>{char}</div>)
    }

    return (
        <div className='line'>{boxes}</div>
    )
}
