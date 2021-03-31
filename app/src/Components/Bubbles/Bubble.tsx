import React from 'react'

import './Bubble.css'

interface IBubble {
  x: number,
  y: number,
  color: String
}

interface IBubbleProps {
  id: string,
  bubble: IBubble,
  clickChangeColor: Function,
  handleBubbleDrag: Function
}

const Bubble = React.memo(
  (props: IBubbleProps) => {
    const { clickChangeColor, handleBubbleDrag, bubble, id } = props
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
        onClick={() => clickChangeColor(id)}
        // onDrag={handleBubbleDrag}
        onDragEnd={(e) => handleBubbleDrag(e, id)}>
      </div>
    )
  }
)

export default Bubble
