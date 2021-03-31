export enum Color {
    RED = 'red',
    BLUE = 'blue'
};

export type Bubble = {
    x: number;
    y: number;
    color: Color
}

export type BubbleCollection  = Record<string, Bubble>

export interface IRoom {
    usersCount: number
    status: string
}