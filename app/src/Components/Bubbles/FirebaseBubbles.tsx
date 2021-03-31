import { useEffect } from "react";
import { Color, useBubbles } from "./hooks";

export const FirebaseBubbles = () => {
    const { bubbles, addBubble, captureBubble } = useBubbles('abc');

    return <div>
        <button onClick={() => addBubble(100, 100, 1)}>Add</button>
        <div>{Object.keys(bubbles).length}</div>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {
                Object.entries(bubbles).map(([key, bubble]: [string, any]) =>
                    <div
                        key={key}
                        style={{ margin: '1px', backgroundColor: bubble.color === Color.BLUE ? 'blue' : 'red', color: 'white' }}
                        onClick={() => { captureBubble(key, bubble.color === Color.BLUE ? Color.RED : Color.BLUE) }}
                    >
                        {key}
                    </div>
                )
            }
        </div>
    </div>
}
}