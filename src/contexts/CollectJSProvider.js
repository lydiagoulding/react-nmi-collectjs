import CollectContext from "./CollectJSContext";
import { useReducer, useCallback } from 'react';

function reducer(state, action) {
    switch (action.type) {
        case 'addError':
            return {
                errors: state.errors.concat([{
                    fieldName: action.fieldName,
                    message: action.message
                }])
            };
        case 'unsetErrors':
            return {
                errors: state.errors.filter(error => error.fieldName !== action.fieldName)
            };
        default:
            throw new Error();
    }
}

export default function CollectJSProvider({children, collectJSPromise}) {
    console.log(collectJSPromise);
    const [state, dispatch] = useReducer(reducer, { errors: [] });
    const addError = useCallback((fieldName, message) => {
        dispatch({
            type: 'addError',
            fieldName,
            message
        })
    }, [dispatch])

    const unsetErrors = useCallback((fieldName) => {
        dispatch({
            type: 'unsetErrors',
            fieldName
        })
    }, [dispatch])

    return (
        <CollectContext.Provider value={{
            state,
            collectJSPromise,
            addError,
            unsetErrors
        }}>
            {children}
        </CollectContext.Provider>
    )
}