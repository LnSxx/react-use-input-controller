import { useState } from 'react'
import type { ValidationResult } from '../ValidationResult'
import {
  ValidationError,
  ValidationSuccess
} from '../ValidationResult'

interface UseTextInputControllerArguments {
  initialValue: string
  validators?: Array<(value: string) => ValidationResult>
}

export function useTextInputController ({
  initialValue,
  validators = []
}: UseTextInputControllerArguments
): [
    string,
    ValidationResult,
    (event: React.ChangeEvent<HTMLInputElement>) => void,
    () => void
  ] {
  const [textInputValue, setTextInputValue] = useState<string>(initialValue)
  const [validationError, setValidationError] =
    useState<ValidationResult>(new ValidationSuccess())

  function onChangedHandler (event: React.ChangeEvent<HTMLInputElement>): void {
    const inputValue: string = event.target.value
    setTextInputValue(inputValue)
  }

  function validate (): void {
    for (const validator of validators) {
      const validationResult: ValidationResult = validator(textInputValue)
      if (validationResult instanceof ValidationError) {
        setValidationError(validationResult)
        break
      } else {
        setValidationError(validationResult)
        continue
      }
    }
  }

  return [textInputValue, validationError, onChangedHandler, validate]
}
