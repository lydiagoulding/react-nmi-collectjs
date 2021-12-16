import React, { useRef } from 'react';

export default function CardCVVInput() {
    const field = useRef();

    return <>
        <div id='cvv' ref={field}/>
    </>
}
