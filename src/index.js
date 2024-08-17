import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {createCard, removeCard, like} from './scripts/card.js';
import {openModal, closeModal, modals, closePopups, handleEscape} from './scripts/modal.js'

const placesList = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const editForm = document.querySelector(".popup_type_edit");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formElement = document.querySelector("form[name=edit-profile]");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const addButton = document.querySelector(".profile__add-button");
const newCardForm = document.querySelector(".popup_type_new-card");
const addCardForm = document.querySelector("form[name=new-place]");
const placeNameInput = document.querySelector(".popup__input_type_card-name");
const linkInput = document.querySelector(".popup__input_type_url");

initialCards.forEach((card) => { 
  const cardContent = createCard(card.name, card.link, removeCard, like, cardImagePopup);
  placesList.append(cardContent);
});

closePopups(modals);

editButton.addEventListener ('click', () => {
  openModal (editForm);
  
  const form = document.forms['edit-profile'];
  const inputName = form.elements.name;
  const inputDescription = form.elements.description;

  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
});

function handleFormProfileSubmit(evt) {
  evt.preventDefault();
 
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(editForm);
}

formElement.addEventListener('submit', handleFormProfileSubmit); 

addButton.addEventListener ('click', () => {
  openModal (newCardForm);
});

function handleFormCardSubmit(evt) {
  evt.preventDefault();
  
  const card = {
    name: placeNameInput.value,
    link: linkInput.value,
  };
  
  placesList.prepend(createCard (card.name, card.link, removeCard, like, cardImagePopup));
  addCardForm.reset();
  closeModal(newCardForm);
}

addCardForm.addEventListener('submit', handleFormCardSubmit); 
 
function cardImagePopup (title, link, cardImage, handleEscape) {
  cardImage.addEventListener ('click', () =>{
    const form = document.querySelector(".popup_type_image");
    const popupImage = document.querySelector (".popup__image");
    const caption = document.querySelector (".popup__caption");
    form.classList.add ('popup_is-opened');
    handleEscape(form);
    popupImage.src = link;
    popupImage.alt = title;
    caption.textContent = title;
  });
};