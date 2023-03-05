abstract class ValidationResult { }

export class ValidationSuccess extends ValidationResult { }

export class ValidationError extends ValidationResult {
  constructor (errorMessage: string) {
    super()
    this.errorMessage = errorMessage
  }

  errorMessage: string
}

export type { ValidationResult }
