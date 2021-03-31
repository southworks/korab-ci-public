import { useState, useRef, useCallback, useEffect } from 'react';
import { database } from '../../Services/firebase';

export enum Color {
    RED = 0,
    BLUE = 1
};

export type Bubble = {
    x: number;
    y: number;
    color: Color
}


export const useBubbles = (roomId: string) => {
    const databaseRef = useRef(database);
    const [bubbles, setBubbles] = useState({});

    if (!roomId || roomId.trim() === '') throw new Error('Invalid room id');

    const udpateBubbles = (key: string | null, bubble: Bubble) => {
        if (key) {
            setBubbles((prev) => {
                return { ...prev, [key]: bubble }
            })
        }
    }

    //Set up listener for realtime communication with Firebase Realtime Database
    useEffect(() => {
        var bubblesRef = databaseRef.current.ref('/bubbles/' + roomId);

        bubblesRef.on('child_added', (snapshot) => {
            try {
                udpateBubbles(snapshot.key, snapshot.val())
            }
            catch (err) {
                console.error('Bubble could not sync', snapshot, err);
            }
        });

        bubblesRef.on('child_changed', (snapshot) => {
            try {
                udpateBubbles(snapshot.key, snapshot.val())
            }
            catch (err) {
                console.error('Bubble could not sync', snapshot, err);
            }
        });

    }, [roomId])

    const addBubble = useCallback((x: number, y: number, color: Color) => {
        let newBubbleRef = databaseRef.current.ref('/bubbles/' + roomId).push();
        newBubbleRef.set({ x, y, color })
        return newBubbleRef.key;
    }, [roomId, databaseRef])

    const moveBubble = useCallback((bubbleId: string, x: number, y: number) => {
        try {
            databaseRef.current.ref(`/bubbles/${roomId}/${bubbleId}`).update({ x, y });
        } catch (err) {
            console.error('Bubble coulf not be captured', bubbleId)
        }

    }, [roomId, databaseRef])

    const captureBubble = useCallback((bubbleId: string, color: Color) => {
        try {
            databaseRef.current.ref(`/bubbles/${roomId}/${bubbleId}`).update({ color })
        } catch (err) {
            console.error('Bubble coulf not be captured', bubbleId)
        }
    }, [roomId, databaseRef])

    return {
        bubbles,
        addBubble,
        moveBubble,
        captureBubble
    }

}