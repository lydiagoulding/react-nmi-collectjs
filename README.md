# react-nmi-collectjs

A React wrapper around NMI’s Collect.js library for capturing payment data.

🌟 Questions and Contributions Welcome 🌟

## Installation

```
# npm
$ npm install --save @lydiagoulding/react-nmi-collectjs
```

```
# yarn
$ yarn add @lydiagoulding/react-nmi-collectjs
```

## Example

_App.js_
```jsx
import './App.css';
import PaymentForm from "./PaymentForm";
import { CollectJSProvider, injectCollectJS } from "@lydiagoulding/react-nmi-collectjs";

const collectJS = injectCollectJS('https://secure.networkmerchants.com/token/Collect.js', '5mN8N7-jhr55W-N22pxX-uAW2s9');

function App() {
  return (
    <div className="App">
        <CollectJSProvider collectJSPromise={collectJS}>
            <PaymentForm/>
        </CollectJSProvider>
    </div>
  );
}

export default App;
```

_PaymentForm.js_
```jsx
import {
    useCollect,
    CardNumberInput,
    CardExpirationInput,
    CheckNameInput,
    CardCVVInput,
    CheckAccountInput,
    CheckRoutingNumberInput,
    ValidationContainer,
    ValidationContainerFields

} from "@lydiagoulding/react-nmi-collectjs";
import { useCallback, useState } from "react";

export default function PaymentForm() {
    const [ collect, response, reset ] = useCollect({
        validCss: {
            "color": "green",
            "background-color": "cyan"
        }
    });
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        collect.startPaymentRequest();
    }, [collect]);

    const [tab, setTab] = useState('credit');

    const onRestart = useCallback((e) => {
        e.preventDefault();
        reset();
    }, [reset]);

    return (<form style={{
        'maxWidth': '500px',
        'margin': "0 auto"
    }}>
        <div>
            <button onClick={(e) => {
                e.preventDefault();
                setTab('credit')
                collect.configure();
            }}
            >
                CreditCard
            </button>
            <button onClick={(e) => {
                e.preventDefault();
                setTab('check');
                collect.configure();
            }}>
                Checks
            </button>
        </div>
        {tab === 'credit' && (
            <>
                <ValidationContainer validationFields={[ValidationContainerFields.ccNumber]}>
                    {({isValid, errors}) => (
                            <label>
                                Credit Card Number
                                {isValid ? (
                                    <span>Valid!</span>
                                ) : (
                                    <ul>
                                        {errors.map(error => (
                                            <li>{error.message}</li>
                                        ))}
                                    </ul>
                                )}
                                <CardNumberInput/>
                            </label>
                        )
                    }
                </ValidationContainer>

                <label>
                    Expiration
                    <CardExpirationInput/>
                </label>
                <label>
                    CVV
                    <CardCVVInput/>
                </label>
            </>
        )}

        {tab === 'check' && (
            <>
                <label>
                    Routing
                    <CheckNameInput/>
                </label>
                <label>
                    Account Number
                    <CheckAccountInput/>
                </label>
                <label>
                    Name
                    <CheckRoutingNumberInput/>
                </label>
            </>
        )}

        <button onClick={onSubmit}>Submit</button>
        <div>
            {JSON.stringify(response)}
        </div>
        <button onClick={onRestart}>Restart</button>
    </form>);
}
```

## Components

### Inputs

Inputs are Collect.js fields that capture specific pieces of payment data. After a field is rendered to the DOM, you must run CollectJS.configure() to allow Collect.js to mount the field. The data a user puts in the fields are controlled internally by Collect.js and are not accessible by react-nmi-collectjs.

#### CardCVVInput

CVVs are sometimes optional for credit card data. If used, you must also use CardNumberInput and CardExpirationInput to create a complete payment token.

```jsx
<CardCVVInput />
```


#### CardExpirationInput

To complete a payment token with card data, you must also use CardNumberInput.

```jsx
<CardExpirationInput />
```


#### CardNumberInput

To complete a payment token with card data, you must also use CardExpirationInput.

```jsx
<CardNumberInput />
```

#### CheckAccountInput

Collects a checking account number. To complete a payment token with check data, you must also use CheckRoutingNumberInput.

```jsx
<CheckAccountInput />
```

#### CheckRoutingNubertInput

Collects a bank routing number. To complete a payment token with check data, you must also use CheckAccountInput.

```jsx
<CheckAccountInput />
```

#### CheckNameInput

This field is usually optional. Collects a name on a checking account. To complete a payment token with check data, you must also use CheckAccountInput and CheckRoutingNumber.

```jsx
<CheckNameInput />
```

#### ValidationContainer

Provides information about errors in the inputs. If errors are present, you will not be able to produce a payment token.

```jsx
<ValidationContainer validationFields={[
    ValidationContainerFields.ccNumber,
    ValidationContainerFields.ccExp,
    ValidationContainerFields.cvv,
]}>
    {({isValid, errors}) => (
        <>
            {isValid ? (
                <span>Valid!</span>
            ) : (
                <ul>
                    {errors.map(error => (
                        <li key={error.fieldName}>{error.message}</li>
                    ))}
                </ul>
            )}
        </>
    )}
</ValidationContainer>
```


##### Props:

validationFields: Array of strings

If provided, errors will be filtered to only include errors for these specific fields. If omitted, all errors will be provided. Supported options are provided via the `ValidationCotnainerFields` variable.

##### Render Props:

**Errors**: Error[]

An array of all the errors that have occurred. Each field will have a maximum of 1 error - only the most recent error is provided here.

Error object: 
```js
{
    fieldName: 'ccnumber|ccexp|cvv|checkaccount|checkaba|checkname',
    message: 'This field is invalid'
}
```

**isValid**: boolean

False if there are errors. True if there are no errors. This is useful for enabling or disabling a submit button that triggers CollectJS.startPaymentRequest().

## Hooks

## Context

### CollectJSProvider

This context provider must wrap all other usages of `react-nmi-collectjs` components. This context is an internal feature for `react-nmi-collectjs`. The underlying context should not be integrated to.

```jsx
const collectJSPromise = injectCollectJS('https://secure.networkmerchants.com/token/Collect.js', '5mN8N7-jhr55W-N22pxX-uAW2s9')

function App() {
    return  (
        <CollectJSProvider collectJSPromise={collectJSPromise}>
            // .. Components
        </CollectJSProvider>
    );
}
```

#### Props:

**collectJSPromise**: Promise &lt;CollectJS&gt;

A promise that resolves to the CollectJS object initialized by the Collect.js script. This should be created from the `injectCollectJS` utility.

## Utilities

### useCollect(config)

Exposes critical components of Collect.js 

```js
const config = {};

const [CollectJS, response, reset] = useCollect(config);
```

Parameters:

config: A JavaScript object that can be passed to `CollectJS.configure()`. For documentation on acceptable options, see
official documentation: 

* [Reference of available options](https://secure.networkmerchants.com/gw/merchants/resources/integration/integration_portal.php#cjs_integration_2) -
  useful for understanding what options are available and what they do.
* [Reference for JavaScript Interface](https://secure.networkmerchants.com/gw/merchants/resources/integration/integration_portal.php#cjs_example_inline2_js) -
  useful for understanding how to pass the options via JavaScript instead of HTML.

Returns:

**First**: The CollectJS global object. This is the object that is typically accessed via `window.CollectJS` and contains 
the methods like `configure` and `startPaymentsRequest`.

`configure` - renders `<iframes>` into fields to make them actually appear. 

`startPaymentsRequest` - Once all the fields are completed and `<ValidationContainer>` displays no errors, `startPaymentsRequest`
should be called to produce a paymentToken. Successfully calling this function will cause the paymentToken to become available.

**Second**: The response from Collect.js containing a paymentToken representing the customer's payment data. 
This should be sent from a server to the Payments API. Before `CollectJS.startPaymentsRequest()` is called, this will 
be null. 

**Third**: A function allowing you to reset the paymentToken. Calling this reset the response and allow you to create a new
response with new payment information.

### injectCollectJS(collectJsUrl, tokenizationKey)

Inserts the Collect.js script to the DOM and returns the CollectJS object from a Promise.

```js
const collectJsPromise = injectCollectJS('https://secure.networkmerchants.com/token/Collect.js', '5mN8N7-jhr55W-N22pxX-uAW2s9')
```

#### Parameters:

**collectJsUrl**: string

The URL used to load Collect.js. This is the `src` value that will be passed into a `<script>`.

Example: 'https://secure.networkmerchants.com/token/Collect.js'

**tokenizatonKey**: string

The tokenization key for Collect.js. This is a public key created in your account.

Example: '5mN8N7-jhr55W-N22pxX-uAW2s9'