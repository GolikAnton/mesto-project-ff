const modals = document.querySelectorAll('.popup');

export function openModal (form) {
  form.classList.add ('popup_is-opened');
  closeEsc(form);
};

export function closeModal (form) {
  form.classList.remove ('popup_is-opened');
};

modals.forEach((form) => {
  form.classList.add ('popup_is-animated');
  form.addEventListener('click', (event) => {
    if(event.target.classList.contains('popup__close') || event.target.classList.contains ('popup_is-opened')) { 
      closeModal(form); 
    }
  })
});

export function closeEsc (form) {
  document.addEventListener ('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal(form);
      document.removeEventListener('keydown',()=>{});
    }
  })
};

