import React, { useRef } from 'react';

export default function CheckAccountInput() {
    const field = useRef();

    return <>
        <div id='checkaccount' ref={field}/>
    </>
}
