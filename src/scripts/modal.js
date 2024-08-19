export function handleEscape(evt) {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  };
};

export function openModal (form) {
  form.classList.add ('popup_is-opened');
  document.addEventListener('keydown', handleEscape);
};

export function closeModal (form) {
  form.classList.remove ('popup_is-opened');
  document.removeEventListener('keydown', handleEscape);
};

export function setPopupListeners () { 
  const modals = document.querySelectorAll('.popup');

  modals.forEach((form) => {
    form.classList.add ('popup_is-animated');
    form.addEventListener('click', (event) => {
      if(event.target.classList.contains('popup__close') || event.target.classList.contains ('popup_is-opened')) { 
      closeModal(form); 
      }
    })
  });
};
