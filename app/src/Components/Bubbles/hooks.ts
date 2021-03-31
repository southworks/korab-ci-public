import { useState, useCallback, useEffect } from 'react';
import { database } from '../../Services/firebase';
import { Bubble, BubbleCollection, Color } from './types';



const hydrateBubble = (wireBubble: any) => ({
    ...wireBubble,
    color: wireBubble.color === 0 ? Color.BLUE : Color.RED
})

export const useBubbles = (roomId: string) => {
    const [bubbles, setBubbles] = useState<BubbleCollection>({});
    const [users, setUsers] = useState<number>(0);
    const [color, setColor] = useState<Color>(Color.RED);

    if (!roomId || roomId.trim() === '') throw new Error('Invalid room id');

    const udpateBubbles = (key: string | null, bubble: Bubble) => {
        if (key) {
            setBubbles((prev) => {
                return { ...prev, [key]: hydrateBubble(bubble) }
            })
        }
    }

    useEffect(() => console.log(color), [color])

    useEffect(() => {
        const roomuserCountRef = database.ref(`/rooms/${roomId}`);
     
        roomuserCountRef.transaction((room) => {
            if (!room) {
                room = {
                    name: roomId,
                    usersCount: 0
                }
            }

            room.usersCount++;
            return room;
        }).then(({snapshot}) => {
            setColor(snapshot.val().usersCount % 2 === 0 ? Color.BLUE : Color.RED)
        })

        roomuserCountRef.on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setUsers(data.usersCount)
            }
        })

        return () => {
            roomuserCountRef.transaction((room) => {
                if (room) {
                    room.usersCount--;
                }
                return room;
            })
        }
    }, [roomId])


    //Set up listener for realtime communication with Firebase Realtime Database
    useEffect(() => {
        var bubblesRef = database.ref('/bubbles/' + roomId);

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

        database.ref('/bubbles').on('child_removed', (snapshot) => {
            console.log('removed', snapshot)
            if (snapshot.key === roomId) setBubbles({});
        });
    }, [roomId])

    const addBubble = useCallback((x: number, y: number) => {
        const colorId = color === Color.BLUE ? 0 : 1;
        let newBubbleRef = database.ref('/bubbles/' + roomId).push();

        newBubbleRef.set({ x, y, color: colorId })

        return newBubbleRef.key;
    }, [roomId, color])

    const moveBubble = useCallback((bubbleId: string, x: number, y: number) => {
        try {
            database.ref(`/bubbles/${roomId}/${bubbleId}`).update({ x, y });
        } catch (err) {
            console.error('Bubble coulf not be captured', bubbleId)
        }

    }, [roomId])

    const captureBubble = useCallback((bubbleId: string) => {
        try {
            database.ref(`/bubbles/${roomId}/${bubbleId}`).update({ color: color === Color.BLUE ? 0 : 1 })
        } catch (err) {
            console.error('Bubble coulf not be captured', bubbleId)
        }
    }, [roomId, color])

    const reset = useCallback(() => {
        setBubbles({});
        database.ref(`/bubbles/${roomId}`).set({});
    }, [roomId])

    return {
        bubbles,
        users,
        addBubble,
        moveBubble,
        captureBubble,
        reset
    }

}