export enum Color {
    RED = 0,
    BLUE = 1
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