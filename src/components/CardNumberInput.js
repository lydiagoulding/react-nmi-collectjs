import React, { useRef } from 'react';

export default function CardNumberInput() {
    const field = useRef();

    return <>
        <div id='ccnumber' ref={field}/>
        </>
}
