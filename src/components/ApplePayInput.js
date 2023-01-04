import React, { useRef } from 'react';

export default function ApplePayInput() {
    const field = useRef();

    return <>
        <div id='applepaybutton' ref={field}/>
    </>
}
