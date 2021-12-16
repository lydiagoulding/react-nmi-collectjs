import React, { useRef } from 'react';

export default function CheckNameInput() {
    const field = useRef();

    return <>
        <div id='checkname' ref={field}/>
    </>
}
