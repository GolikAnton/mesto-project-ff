const showInputError = (formElement, inputElement, validationParameters) => {
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationParameters.inputErrorClass);
    formError.textContent = inputElement.validationMessage;
    formError.classList.add(validationParameters.errorClass);
};
  
const hideInputError = (formElement, inputElement, validationParameters) => {
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationParameters.inputErrorClass);
    formError.classList.remove(validationParameters.errorClass);
    formError.textContent = '';
};
  
const isValid = (formElement, inputElement, validationParameters) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
       showInputError(formElement, inputElement, validationParameters);
    } else {
       hideInputError(formElement, inputElement, validationParameters);
    }
};

const setEventListeners = (formElement, validationParameters) => {
    const inputList = Array.from(formElement.querySelectorAll(validationParameters.inputSelector));
    const buttonElement = formElement.querySelector(validationParameters.submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, validationParameters)
        toggleButtonState(inputList, buttonElement, validationParameters);
      });
    });
}; 

export const enableValidation = (validationParameters) => {
    const formList = Array.from(document.querySelectorAll(validationParameters.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, validationParameters);
    });
};
  
export const clearValidation = (formElement, validationParameters) =>{
    const inputList = Array.from(formElement.querySelectorAll(validationParameters.inputSelector));
    const buttonElement = formElement.querySelector(validationParameters.submitButtonSelector);

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, validationParameters);
        inputElement.setCustomValidity("");
    })
    toggleButtonState (inputList, buttonElement, validationParameters);
    
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
};  

const toggleButtonState = (inputList, buttonElement, validationParameters) => {
    
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationParameters.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationParameters.inactiveButtonClass);
    }
}; 

