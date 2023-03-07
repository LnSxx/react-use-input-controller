# react-use-input-controller

This package provides a React hook that returns a tuple of useful variables and callbacks to create forms with validation.

## Install

You can install this package using npm:

```
npm install react-use-input-controller
```

## Usage
By default, `useTextInputController({initialValue: ''})` returns a tuple of an input 
`string` value, validation result, a setter for the value, and a function that calls validators.

```typescript
import useInputValidation from 'use-input-validation';

const [
    inputValue,
    validationResult,
    onChanged,
    validate
  ] = useTextInputController({
    initialValue: '',
    validators: [
      yourValidationFunction,
      yourSecondValidationFunction,
    ]
  })
```

### What hook returns

The `useTextInputController` hook returns a tuple containing the following values:

- `inputValue`: the current value of the input. It is a `string` type.
- `validationResult`: The ok property is a boolean value that indicates whether the validation was successful or not. When ok is true, the value property contains the valid input value as a string. When ok is false, the errorMessage property contains a string with an error message explaining why the input value is invalid. property that can be shown on the UI.

```typescript
type ValidationResult =
  | { ok: true, value: string }
  | { ok: false, errorMessage: string }
```

- `onChanged`: a function that can be used as an onChange event handler for the input field. When called, it updates the value of the input.
- `validate`: a function that calls all the validators in the validators array and updates the validationResult object.

### What hook takes

This `useTextInputController` function takes an options object as an argument which contains two properties:

- `initialValue`: The initial value for the input field. It is a string type.
- `validators`: An array of functions that validate the input field value. Each function should take the input field value as its argument and return `ValidationResult` type objects. These validators will be applied sequentially to the input content. So, if a field is required, first pass a function that will check whether the field has text or not. Then pass all the other validations you want. When the `validate()` function is called, the first validation error will be returned to you.

```typescript
import { type ValidationResult } from 'use-input-validation'

function textRequiredInputValidation (text: string): ValidationResult {
  if (text.trim().length === 0) {
    return {
      ok: false,
      errorMessage: 'Field is required'
    }
  }
  return {
      ok: true,
      errorMessage: text
    }
}
```

## Example

```typescript
function MyComponent (): JSX.Element {
  const [
    inputValue,
    validationResult,
    onChanged,
    validate
  ] = useTextInputController({
    initialValue: '',
    validators: [
      yourValidationFunction,
      yourSecondValidationFunction,
    ]
  })

  return (
    <div>
      <label
        htmlFor={ id }
        className={
            // Check validation result if error.
          validationError.ok
            ? "defaultLabelStyle"
            : "errorLabelStyle"
        }
      >
        { label }
      </label>
      <input
        id={ id }
        value={ textInputValue }
        onChange={ onChangedHandler }
        // If you need to validate on unfocus.
        onBlur={ validate }
        type="text"
        className={
          validationError.ok
            ? "defaultStateStyle"
            : "errorStateStyle"
        }
      />
      // Show error message
      <p>
        { !validationError.ok ? validationError.errorMessage : '' }
      </p>
    </div>
  )
}
```

You are welcome to create an issue if you would like to discuss any other use cases that have not been addressed here.

