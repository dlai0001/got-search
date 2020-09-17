import { useState } from 'react'
import { useDebounce } from 'react-use'

type DebouncedValueReturn<T> = [
    T,
    (value: T) => void,
    () => boolean | null,
    () => void,
]

/**
 * React setState wrapped in a debouncer
 * @param timeout 
 * @param initial 
 * @returns [
 *     debouncedValue,  // Debounced value
 *     setValue,        // Set value
 *     isReady,         // false - pending, true - completed, null - cancelled
 *     cancel,          // cancel function
 * ]
 */
export default function useDebouncedValue<T>(timeout: number, initial: T): DebouncedValueReturn<T> {

    const [val, setVal] = useState<T>(initial);
    const [debouncedValue, setDebouncedValue] = useState<T>(val);

    const [isReady, cancel] = useDebounce(
        () => {
            setDebouncedValue(val)
        },
        2000,
        [val]
    )

    const setValue: ((value:T)=>void) = (value: T) => {
        setVal(value)
    }

    return [debouncedValue, setValue, isReady, cancel]
}