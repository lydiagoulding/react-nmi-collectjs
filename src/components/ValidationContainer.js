import {useContext} from "react";
import CollectJSContext from "../contexts/CollectJSContext";
import React, { useMemo } from "react";

export default function ValidationContainer({children, validationFields}) {
    const { state: {
        errors
    } } = useContext(CollectJSContext);

    const relevantErrors = useMemo(() => {

        if (validationFields instanceof Array) {
            return errors.filter(error => validationFields.includes(error.fieldName))
        } else {
            return errors;
        }

    }, [errors, validationFields])

    const isValid = useMemo(() => {
        return relevantErrors.length === 0;
    }, [relevantErrors])

    return (
        <>
            {children({
                isValid,
                errors: relevantErrors
            })}
        </>
        )
}

export const ValidationContainerFields = {
    ccNumber: 'ccnumber',
    ccExp: 'ccexp',
    cvv: 'cvv',
    checkAccount: 'checkaccount',
    checkAba: 'checkaba',
    checkName: 'checkname'
}