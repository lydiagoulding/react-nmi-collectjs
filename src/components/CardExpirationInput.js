import React, { useRef } from 'react';

export default function CardExpirationInput() {
    const field = useRef();

    return <>
        <div id='ccexp' ref={field}/>
    </>
}
