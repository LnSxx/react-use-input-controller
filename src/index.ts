import { useState } from 'react'

type ValidationResult =
  | { ok: true, value: string }
  | { ok: false, errorMessage: string }

export interface UseTextInputControllerArguments {
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
      useState<ValidationResult>({
        ok: true,
        value: initialValue
      })

  function onChangedHandler (event: React.ChangeEvent<HTMLInputElement>): void {
    const inputValue: string = event.target.value
    setTextInputValue(inputValue)
  }

  function validate (): void {
    for (const validator of validators) {
      const validationResult: ValidationResult = validator(textInputValue)
      if (validationResult.ok) {
        setValidationError({
          ok: true,
          value: textInputValue
        })
        continue
      } else {
        setValidationError({
          ok: false,
          errorMessage: validationResult.errorMessage
        })
        break
      }
    }
  }

  return [textInputValue, validationError, onChangedHandler, validate]
}

export type { ValidationResult }
