export interface IBubble {
    x: number,
    y: number,
    color: String
}

// interface IBubbles {
//   [id: string]: IBubble
// }
export interface IRoom {
    bubbles: Record<string, IBubble>
    usersCount: number
    status: string
}