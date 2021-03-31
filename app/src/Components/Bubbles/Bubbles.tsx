
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Bubble from './Bubble';
import './Bubbles.css';
import { Scoreboard } from './Scoreboard';
import { IBubble, IRoom } from './types';


function BubbleCanvas() {
  const [newGame, setNewGame] = useState('');
  const [bubbles, setBubbles] = useState<Record<string, IBubble>>({});
  const [color, setColor] = useState<String>('');
  const [bubbleLimit] = useState<number>(30);
  const [finished, setFinished] = useState(false);
  const [roomData, setRoomData] = useState<IRoom | null>(null);
  const { room } = useParams<{ room: string }>()

  useEffect(() => {
    // Get rooms data
    setRoomData({
      bubbles: {},
      usersCount: Math.floor(Math.random() * 10),
      status: 'idle'
    })
  }, [room]);

  useEffect(() => {
    // Get rooms data
    if (roomData && !color) {
      let userColor = roomData?.usersCount % 2 ? 'red' : 'blue'
      setColor(userColor)
    }
  }, [color, roomData]);

  useEffect(() => {
    if (newGame === 'count' && Object.keys(bubbles).length === bubbleLimit) setFinished(true)
    if (newGame === 'timer') {
      setTimeout(() => {
        setFinished(true)
      }, 60000);
    }
    if (!newGame && Object.keys(bubbles).length) {
      setBubbles({})
      setFinished(false)
    }

  }, [newGame, bubbleLimit, bubbles]);

  const handleGameType = (e: React.MouseEvent<HTMLButtonElement>) => {
    setNewGame(e.currentTarget.value)
  }

  const handleDivClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!color) return
    let id = Math.round(e.timeStamp).toString()
    if (e.target !== e.currentTarget) return;
    setBubbles((bubbles) => ({ ...bubbles, [id]: { x: e.screenX, y: e.screenY, color } }))
  };

  const handleBubbleDrag = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    setBubbles((newBubbles) => {
      const x = { ...newBubbles };
      x[id] = { x: e.screenX, y: e.screenY, color }
      return x;
    });
  };

  // const changeColor = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   setColor(e.currentTarget.value);
  // };

  const clickChangeColor = (id: string) => {
    setBubbles((newBubbles) => {
      const x = { ...newBubbles };
      x[id].color = color
      return x;
    });
  }
  const winner = () => {
    const isRed = Object.values(bubbles).filter(x => x.color === 'red')
    if (isRed.length > bubbleLimit / 2) return 'Player RED wins!!'
    if (isRed.length === bubbleLimit / 2) return "It's a tie!!"
    return 'Player BLUE wins!!'
  }

  return (
    <>
      {
        newGame === '' &&
        <div className='modal'>
          <h2>Pick a game style</h2>
          <div>
            <button value='timer' onClick={handleGameType}>Timer 1 minute</button>
            <button value='count' onClick={handleGameType}>Counter 30</button>
          </div>
        </div>
      }
      {
        finished &&
        <div className='modal'>
          <h1>{winner()}</h1>
          <div>
            <button onClick={() => setNewGame('')}>Restart</button>
            <button onClick={() => setFinished(false)}>Continue</button>
          </div>
        </div>
      }
      <Scoreboard bubbles={bubbles} />
      <div className='bubbleCanvas' onClick={handleDivClick}>
        {Object.entries(bubbles).map(([key, bubble], i) => {
          return (
            <Bubble key={key} handleBubbleDrag={handleBubbleDrag} clickChangeColor={clickChangeColor} id={key} bubble={bubble} />
          );
        })}
      </div>
    </>
  );
}

export default BubbleCanvas;

