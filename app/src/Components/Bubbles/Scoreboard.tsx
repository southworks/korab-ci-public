import { BubbleCollection, Color } from "./types"

export const Scoreboard = ({ bubbles, users }: { bubbles: BubbleCollection, users: number }) => {
    const redCount = Object.values(bubbles).filter((x) => x.color === Color.RED).length;
    const blueCount = Object.values(bubbles).filter((x) => x.color === Color.BLUE).length;

    return <div className='scoreboard'>
        <h3>Scoreboard</h3>
        <p>Active users: {users}</p>
        <p>Red <span className='redBubble'>{redCount}</span></p>
        <p>Blue <span className='blueBubble'>{blueCount}</span></p>
    </div>
}