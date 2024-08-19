import {openModal} from './modal.js'; 

export function createCard (title, link, removeCard, like, handleCardImage) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardContent = cardTemplate.querySelector('.card').cloneNode(true); 
    const cardImage =  cardContent.querySelector('.card__image');
      
    cardContent.querySelector('.card__title').textContent = title; 
    cardImage.src = link;
    cardImage.alt = title;
  
    const deleteButton = cardContent.querySelector('.card__delete-button'); 
    deleteButton.addEventListener('click', removeCard); 

    const likeButton = cardContent.querySelector('.card__like-button');
    likeButton.addEventListener('click', ()=>{
        like(likeButton);
    });
    
    cardImage.addEventListener ('click', () =>{
        handleCardImage (title, link);
    });

    return cardContent; 
};
  
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

