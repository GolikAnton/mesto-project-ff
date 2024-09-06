
export function createCard (title, link, deleteCard, handleCardImage,counter,id,cardOwner,cardId, likeCard, unLikeCard) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardContent = cardTemplate.querySelector('.card').cloneNode(true); 
    const cardImage =  cardContent.querySelector('.card__image');
        
    cardContent.querySelector('.card__title').textContent = title; 
    cardImage.src = link;
    cardImage.alt = title;
    cardImage.id = cardId;
    cardContent.querySelector('.card__like-counter').textContent=counter.length;
  
    const deleteButton = cardContent.querySelector('.card__delete-button');
    if (id!==cardOwner) {
        deleteButton.remove();
    }; 
    deleteButton.addEventListener('click', ()=>{
        deleteCard(cardId).then(() => {
            const cards = Array.from(document.querySelectorAll('.card'))
            cards.forEach(card => {
                if(card.querySelector('.card__image').id === cardId) {
                    card.remove()
                }
            })
        })
    });
    
    const likeButton = cardContent.querySelector('.card__like-button');
    const checkLikes = counter.some(function(item) {
        return item._id === id;
    });
    if (checkLikes) {
        likeButton.classList.add ('card__like-button_is-active')
    };
    
    likeButton.addEventListener('click', ()=>{
        if (likeButton.classList.contains('card__like-button_is-active')) {
            unLikeCard(cardId).then((data)=>{
                const cards = Array.from(document.querySelectorAll('.card'))
                cards.forEach(card => {
                    if(card.querySelector('.card__image').id === cardId) {
                        card.querySelector('.card__like-counter').textContent=data.likes.length;
                    }
                })
            })
            likeButton.classList.remove ('card__like-button_is-active');
        } else {
            likeCard(cardId).then((data)=>{
                const cards = Array.from(document.querySelectorAll('.card'))
                cards.forEach(card => {
                    if(card.querySelector('.card__image').id === cardId) {
                        card.querySelector('.card__like-counter').textContent=data.likes.length;
                    }
                })
            })
            likeButton.classList.add ('card__like-button_is-active');
        }
    });
    
    cardImage.addEventListener ('click', () =>{
        handleCardImage (title, link);
    });

    return cardContent; 
};
  
//export function removeCard(evt, cardId) { 
//    const eventTarget = evt.target; 
//    const card = eventTarget.closest('.card'); 
//    card.remove();
//    deleteCard(cardId);
//};



