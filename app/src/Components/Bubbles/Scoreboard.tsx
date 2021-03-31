import { BubbleCollection, Color } from "./types"

export const Scoreboard = ({ bubbles }: { bubbles: BubbleCollection }) => {
    const redCount = Object.values(bubbles).filter((x) => x.color === Color.RED).length;
    const blueCount = Object.values(bubbles).filter((x) => x.color === Color.RED).length;

    return <div className='Scoreboard'>
        <h3>Scoreboard</h3>
        <p>Red <span className='redBubble'>{redCount}</span></p>
        <p>Blue <span className='blueBubble'>{blueCount}</span></p>
    </div>
}