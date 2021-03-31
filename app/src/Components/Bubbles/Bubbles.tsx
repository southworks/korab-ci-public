import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import BubbleComponent from './Bubble';
import './Bubbles.css';
import { useBubbles } from './hooks';
import { Scoreboard } from './Scoreboard';
import { Color, IRoom } from './types';


function BubbleCanvas() {
  const { room } = useParams<{ room: string }>()

  const { bubbles, users, addBubble, captureBubble, moveBubble, reset } = useBubbles(room);

  const [newGame, setNewGame] = useState('');
  const [bubbleLimit] = useState<number>(30);
  const [finished, setFinished] = useState(false);
  const [roomData, setRoomData] = useState<IRoom | null>(null);

  useEffect(() => {
    // Get rooms data
    setRoomData({
      usersCount: Math.floor(Math.random() * 10),
      status: 'idle'
    })
  }, [room]);

  // useEffect(() => {

  //   if (newGame === 'count' && Object.keys(bubbles).length === bubbleLimit) setFinished(true)
  //   if (newGame === 'timer') {
  //     setTimeout(() => {
  //       setFinished(true)
  //     }, 60000);
  //   }
  //   if (!newGame && Object.keys(bubbles).length) {
  //     reset();
  //     setFinished(false)
  //   }
  //   //TODO:
  //   // Clear timeout, if set
  // }, [newGame, bubbleLimit, bubbles, reset]);

  const handleGameType = (e: React.MouseEvent<HTMLButtonElement>) => {
    setNewGame(e.currentTarget.value)
  }

  const handleCreateBubble = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    addBubble(e.screenX, e.screenY);
  };

  const handleBubbleDrag = useCallback((e: React.MouseEvent<HTMLDivElement>, id: string) => {
    moveBubble(id, e.screenX, e.screenY);
  }, [moveBubble]);

  const winner = () => {
    const isRed = Object.values(bubbles).filter(x => x.color === Color.RED)
    if (isRed.length > bubbleLimit / 2) return 'Player RED wins!!'
    if (isRed.length === bubbleLimit / 2) return "It's a tie!!"
    return 'Player BLUE wins!!'
  }

  return (
    <>
      {/* {
        newGame === '' &&
        <div className='modal'>
          <h2>Pick a game style</h2>
          <div>
            <button value='timer' onClick={handleGameType}>Timer 1 minute</button>
            <button value='count' onClick={handleGameType}>Counter 30</button>
          </div>
        </div>
      } */}
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
      <Scoreboard bubbles={bubbles} users={users} />
      <div className='bubbleCanvas' onClick={handleCreateBubble}>
        {Object.entries(bubbles).map(([key, bubble], i) => {
          return (
            <BubbleComponent key={key}
              id={key}
              bubble={bubble}
              handleBubbleDrag={handleBubbleDrag}
              onBubbleClick={captureBubble}
            />
          );
        })}
      </div>
    </>
  );
}

export default BubbleCanvas;

