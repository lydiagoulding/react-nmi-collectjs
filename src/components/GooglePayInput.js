import React, { useRef } from 'react';

export default function GooglePayInput() {
    const field = useRef();

    return <>
        <div id='googlepaybutton' ref={field}/>
    </>
}
