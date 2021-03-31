import { IBubble } from "./types"

export const Scoreboard = ({ bubbles }: { bubbles: Record<string, IBubble> }) => {
    return <div className='Scoreboard'>
        Scoreboard
    <p>
            Red
      <span className='redBubble'>
                {Object.values(bubbles).filter((x) => x.color === 'red').length}
            </span>
        </p>
        <p >
            Blue
      <span className='blueBubble'>
                {Object.values(bubbles).filter((x) => x.color === 'blue').length}
            </span>
        </p>
    </div>
}