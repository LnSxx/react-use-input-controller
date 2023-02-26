"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTextInputController = void 0;
const react_1 = require("react");
function useTextInputController({ initialValue, validators = [] }) {
    const [textInputValue, setTextInputValue] = (0, react_1.useState)(initialValue);
    const [validationError, setValidationError] = (0, react_1.useState)(null);
    function onChangedHandler(event) {
        const inputValue = event.target.value;
        setTextInputValue(inputValue);
    }
    function validate() {
        for (const validator of validators) {
            const error = validator(textInputValue);
            setValidationError(validator(textInputValue));
            if (error !== null) {
                setValidationError(error);
                break;
            }
            else {
                setValidationError(null);
                continue;
            }
        }
    }
    return [textInputValue, validationError, onChangedHandler, validate];
}
exports.useTextInputController = useTextInputController;
