import React from 'react'
import './Bubble.css'
import { Bubble, Color } from './types'

interface IBubbleProps {
  id: string,
  bubble: Bubble,
  onBubbleClick: (bubbleId: string) => void,
  handleBubbleDrag: Function
}

const BubbleComponent = React.memo(
  (props: IBubbleProps) => {
    const { onBubbleClick, handleBubbleDrag, bubble, id } = props;

    return (
      <div
        className='bubble'
        draggable
        key={id}
        style={{
          left: `${bubble.x - 50}px`,
          top: `${bubble.y - 150}px`,
          // zIndex: id + 1,
          background: `${bubble.color}`,
        }}
        onClick={() => onBubbleClick(id)}
        // onDrag={handleBubbleDrag}
        onDragEnd={(e) => handleBubbleDrag(e, id)}>
      </div>
    )
  }
)

export default BubbleComponent
