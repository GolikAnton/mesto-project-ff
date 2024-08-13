import {cardTemplate} from '../index.js';
import {closeEsc} from './modal.js'; 

export function createCard (title, link, removeCard, like) {
    const cardContent = cardTemplate.querySelector('.card').cloneNode(true); 
    const cardImage =  cardContent.querySelector('.card__image');
      
    cardContent.querySelector('.card__title').textContent = title; 
    cardImage.src = link;
    cardImage.alt = title;
  
    const deleteButton = cardContent.querySelector('.card__delete-button'); 
    deleteButton.addEventListener('click', removeCard); 

    cardImage.addEventListener ('click', () =>{
        const form = document.querySelector(".popup_type_image");
        const popupImage = document.querySelector (".popup__image");
        const caption = document.querySelector (".popup__caption");
        form.classList.add ('popup_is-opened');
        closeEsc(form);
        popupImage.src =  cardImage.src;
        popupImage.alt = cardImage.alt;
        caption.textContent = title;
    });

    const likeButton = cardContent.querySelector('.card__like-button');
    likeButton.addEventListener('click', ()=>{
        like(likeButton);
    });
    
    return cardContent; 
}
  
export function removeCard(evt) { 
    const eventTarget = evt.target; 
    const card = eventTarget.closest('.card'); 
    card.remove(); 
};

export function like(likeButton) {
    if (likeButton.classList.contains('card__like-button_is-active')) {
        likeButton.classList.remove ('card__like-button_is-active');
    } else {
    likeButton.classList.add ('card__like-button_is-active');
    }
};

