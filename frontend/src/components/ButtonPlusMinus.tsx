import React from 'react'
import { useState } from 'react';

function ButtonPlusMinus({
    min = 0,
    max = 99
}: {
    min?: number,
    max?: number
}) {
    const [count, setCount] = useState(0);
    const incrCount = () => { setCount(count => Math.min(count + 1, max)) }
    const decrCount = () => { setCount(count => Math.max(count - 1, min)) }

    const buttonStyles = "btn-std bg-white border-[1px] border-black py-0 rounded-lg";
    return (
        <span className="inline-flex space-x-4">
            <button onClick={decrCount} className={buttonStyles}> - </button>
            {/* MAKE SURE BELOW `bottom` MATCHES WIDTH OF ABOVE BUTTON'S BORDERS */}
            <span className="relative bottom-[-2px]"> {count} </span>
            <button onClick={incrCount} className={buttonStyles}> + </button>
        </span>
    )
}

export default ButtonPlusMinus