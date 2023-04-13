import { KeyboardEvent, createContext, useState } from "react";

export const KeysContext = createContext({
    eventDown: {} as KeyboardEvent<HTMLDivElement>,
    eventUp: {} as KeyboardEvent<HTMLDivElement>,
    setEventUp: (event: KeyboardEvent<HTMLDivElement>) => null,
    setEventDown: (event: KeyboardEvent<HTMLDivElement>) => null,
    setEvent: (event: KeyboardEvent<HTMLDivElement>) => null,
    event: {} as KeyboardEvent<HTMLDivElement>
})

export const useKeyContext = () => {
    const [event, setEvent] = useState<KeyboardEvent<HTMLDivElement>>({})
    const [eventDown, setEventDown] = useState<KeyboardEvent<HTMLDivElement>>({})
    const [eventUp, setEventUp] = useState<KeyboardEvent<HTMLDivElement>>({})

    return {
        event,
        eventDown,
        eventUp,
        setEvent,
        setEventDown,
        setEventUp
    }
}