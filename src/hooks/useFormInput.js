import { useReducer } from "react";
const ACTIONS = {
  change: "CHANGE",
  blur: "BLUR",
  reset: "RESET",
};
const valueReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.change:
      return { ...state, value: action.value };
    case ACTIONS.blur:
      return { ...state, valueTouched: action.value };
    case ACTIONS.reset:
      return { value: "", valueTouched: false };
    default:
      return state;
  }
};
const useFormInput = (validateValue) => {
  const initialState = { value: "", valueTouched: false };
  const [state, dispatchAction] = useReducer(valueReducer, initialState);
  const { value, valueTouched } = state;
  const valueIsValid = validateValue(value);
  const valueHasError = !valueIsValid && valueTouched;
  const valueChangeHandler = (e) => {
    dispatchAction({ type: ACTIONS.change, value: e.target.value });
  };
  const valueBlurHandler = (e) => {
    dispatchAction({ type: ACTIONS.blur, value: true });
  };

  const reset = () => {
    dispatchAction({ type: ACTIONS.reset });
  };

  const validityClass = valueHasError ? "form-control invalid" : "form-control";

  return {
    value,
    valueTouched,
    valueIsValid,
    valueHasError,
    valueChangeHandler,
    valueBlurHandler,
    validityClass,
    reset,
  };
};

export default useFormInput;
