
import React, { useState } from 'react';
import './Bubbles.css';

interface IBubble {
  x: number,
  y: number,
  color: String
}

function Bubbles() {
  const [bubbles, setBubbles] = useState<IBubble[]>([]);
  const [color, setColor] = useState<String>('red');

  const handleDivClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(`e div`, e)
    if (e.target !== e.currentTarget) return
    setBubbles((bubbles) => [...bubbles, { x: e.screenX, y: e.screenY, color },]);
  };

  const handleBubbleDrag = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
    console.log(`e`, e)
    setBubbles((newBubbles: IBubble[]) => {
      const x = [...newBubbles];
      x.splice(i, 1);
      return [...x, { x: e.screenX, y: e.screenY, color }];
    });
  };

  const changeColor = (e: React.MouseEvent<HTMLButtonElement>) => {
    setColor(e.currentTarget.value);
  };

  const clickChangeColor = (i: number) => {
    console.log(`e color`)
    setBubbles((newBubbles: IBubble[]) => {
      const x = [...newBubbles];
      x[i].color = color
      return [...x];
    });
  }
  // console.log(`bubbles`, bubbles);
  const winner = () => {
    const isRed = bubbles.filter(x => x.color === 'red')
    if (isRed.length > 10) return 'Player RED wins!!'
    if (isRed.length === 10) return "It's a tie!!"
    return 'Player BLUE wins!!'
  }

  return (
    <>
      {bubbles.length === 20 &&
        <div className='winner'>
          <h1>{winner()}</h1>
          <button onClick={() => setBubbles([])}>Restart</button>
        </div>}
      <div className='pickColor'>
        Pick a color
        <button value='red' onClick={changeColor}>
          Red
          <span className='redBubble'>
            {bubbles.filter((x) => x.color === 'red').length}
          </span>
        </button>
        <button value='blue' onClick={changeColor}>
          Blue{' '}
          <span className='blueBubble'>
            {bubbles.filter((x) => x.color === 'blue').length}
          </span>
        </button>
      </div>
      <div className='App' onClick={handleDivClick}>
        {bubbles.map((bubble, i) => {
          return (
            <div
              className='bubble'
              draggable
              key={i}
              style={{
                left: `${bubble.x - 50}px`,
                top: `${bubble.y - 150}px`,
                zIndex: i + 1,
                background: `${bubble.color}`,
              }}
              onClick={() => clickChangeColor(i)}
              // onDrag={handleBubbleDrag}
              onDragEnd={(e) => handleBubbleDrag(e, i)}>
              hi
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Bubbles;
