import './pages/index.css';
import {createCard, removeCard, like} from './scripts/card.js';
import {openModal, closeModal, setPopupListeners} from './scripts/modal.js'
import { enableValidation, clearValidation} from './scripts/validation.js';
import { addCard, deleteCard, editUserInfo, editUserAvatar,getCards, getUserInfo, likeCard, unLikeCard} from './scripts/api.js';

const placesList = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const editForm = document.querySelector(".popup_type_edit");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const editAvatar = document.querySelector(".popup_type_avatar");
const editAvatarForm = document.querySelector("form[name=edit-avatar]");
const urlInput = document.querySelector(".popup__input_type_avatar");
const editProfileForm = document.querySelector("form[name=edit-profile]");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const addButton = document.querySelector(".profile__add-button");
const newCardForm = document.querySelector(".popup_type_new-card");
const addCardForm = document.querySelector("form[name=new-place]");
const placeNameInput = document.querySelector(".popup__input_type_card-name");
const linkInput = document.querySelector(".popup__input_type_url");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector (".popup__image");
const caption = document.querySelector (".popup__caption");
const submitButton = document.querySelector(".popup__button");

const validationParameters = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

let profileId;

Promise.all([getUserInfo(),getCards()]).then(([userInfo,cards])=> {
  
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileImage.style = `background-image: url(${userInfo.avatar})`;
    profileId= userInfo._id;

    cards.forEach((card) => {
      const cardContent = createCard(
        card.name, 
        card.link, 
        deleteCard, 
        handleCardImage,
        card.likes,
        profileId,
        card.owner._id,
        card._id,
        likeCard,
        unLikeCard,
        removeCard,
        like
      );
      placesList.append(cardContent);  
    })
})
.catch((err) => {
  console.log(err); // "Что-то пошло не так: ..."
});

setPopupListeners();
enableValidation(validationParameters);

editButton.addEventListener ('click', () => {
  
  clearValidation(editForm, validationParameters);
  openModal (editForm);
      
  const form = document.forms['edit-profile'];
  const inputName = form.elements.name;
  const inputDescription = form.elements.description;
  
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
});

function handleFormProfileSubmit(evt) {
  evt.preventDefault();

  renderLoading(submitButton,true);
  editUserInfo(nameInput.value, jobInput.value).then ((result) => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
  })
  .catch((err) => {
    console.log(err); // "Что-то пошло не так: ..."
  })
  .finally(() =>{renderLoading(submitButton,false)});
  
  closeModal(editForm);
}

editProfileForm.addEventListener('submit', handleFormProfileSubmit); 

profileImage.addEventListener('click', ()=> {
  clearValidation(editAvatar, validationParameters);
  openModal (editAvatar);
});

function handleFormAvatarSubmit(evt) {
  evt.preventDefault();
  
  renderLoading(submitButton,true)
  editUserAvatar(urlInput.value).then((data)=>{
    profileImage.style = `background-image: url(${data.avatar})`
  })
  .catch((err) => {
    console.log(err); // "Что-то пошло не так: ..."
  })
  .finally(() =>{renderLoading(submitButton,false)});

  editAvatarForm.reset();
  closeModal(editAvatar);
};

editAvatar.addEventListener('submit', handleFormAvatarSubmit);

addButton.addEventListener ('click', () => {
  clearValidation(newCardForm, validationParameters);
  openModal (newCardForm);  
});

function handleFormCardSubmit(evt) {
  evt.preventDefault();
  renderLoading(submitButton,true);
  const card = {
    name: placeNameInput.value,
    link: linkInput.value,
  };
  
  addCard(card.name, card.link).then ((data) => {
    const cardId = data._id;
    placesList.prepend(createCard (
      card.name,
      card.link,
      deleteCard,
      handleCardImage,
      data.likes,
      profileId,
      data.owner._id,
      cardId,
      likeCard,
      unLikeCard,
      removeCard,
      like
    ));
  })
  .catch((err) => {
    console.log(err); // "Что-то пошло не так: ..."
  })
  .finally(() =>{renderLoading(submitButton,false)});
  
  addCardForm.reset();
  closeModal(newCardForm);
};

addCardForm.addEventListener('submit', handleFormCardSubmit); 
 
function handleCardImage (title, link) {
  popupImage.src = link;
  popupImage.alt = title;
  caption.textContent = title;
  openModal (popupTypeImage);
};

const renderLoading = (button, isLoading) => {
  button.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
};

