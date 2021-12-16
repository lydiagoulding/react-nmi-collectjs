import React, { useRef } from 'react';

export default function CheckRoutingNumberInput() {
    const field = useRef();

    return <>
        <div id='checkaba' ref={field}/>
    </>
}
