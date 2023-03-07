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

```javascript
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
- `validationResult`: an object of the `ValidationResult` class that can be either `ValidationResult` or `ValidationError`. The `ValidationError` has a `errorMessage` property that can be shown on the UI.
- `onChanged`: a function that can be used as an onChange event handler for the input field. When called, it updates the value of the input.
- `validate`: a function that calls all the validators in the validators array and updates the validationResult object.

### What hook takes

This `useTextInputController` function takes an options object as an argument which contains two properties:

- `initialValue`: The initial value for the input field. It is a string type.
- `validators`: An array of functions that validate the input field value. Each function should take the input field value as its argument and return `ValidationResult`. These validators will be applied sequentially to the input content. So, if a field is required, first pass a function that will check whether the field has text or not. Then pass all the other validations you want. When the `validate()` function is called, the first validation error will be returned to you.

```javascript
function textRequiredInputValidation (text: string): ValidationResult {
  if (text.trim().length === 0) {
    return new ValidationError('Field is required')
  }
  return new ValidationSuccess()
}
```

## Example

```javascript
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
          validationError instanceof ValidationError
            ? "errorLabelStyle"
            : "defaultLabelStyle"
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
          validationError instanceof ValidationError
            ? "errorStateStyle"
            : "defaultStateStyle"
        }
      />
      // Show error message
      <p>
        { 
            validationError instanceof ValidationError 
            ? validationError.errorMessage : 
            '' 
        }
      </p>
    </div>
  )
}
```

Feel free to raise an issue to discuss other use cases that aren't covered here

