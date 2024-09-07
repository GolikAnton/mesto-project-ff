
export function createCard (
    title, 
    link, 
    deleteCard, 
    handleCardImage,
    counter,
    id,
    cardOwner,
    cardId, 
    likeCard, 
    unLikeCard,
    removeCard,
    like
    ) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardContent = cardTemplate.querySelector('.card').cloneNode(true); 
    const cardImage =  cardContent.querySelector('.card__image');
        
    cardContent.querySelector('.card__title').textContent = title; 
    cardImage.src = link;
    cardImage.alt = title;
    cardContent.querySelector('.card__like-counter').textContent=counter.length;
    cardContent.id=cardId;
  
    const deleteButton = cardContent.querySelector('.card__delete-button');
    if (id!==cardOwner) {
        deleteButton.remove();
    } else {
        deleteButton.addEventListener('click', ()=>{
            removeCard(deleteCard, cardId);
        })
    };
    
    const likeButton = cardContent.querySelector('.card__like-button');
    const checkLikes = counter.some(function(item) {
        return item._id === id;
    });
    if (checkLikes) {
        likeButton.classList.add ('card__like-button_is-active')
    };
    
    likeButton.addEventListener('click', ()=>{
        like(likeButton,cardId,unLikeCard,likeCard);
    });
    
    cardImage.addEventListener ('click', () =>{
        handleCardImage (title, link);
    });

    return cardContent; 
};
 

export function removeCard(deleteCard, cardId) {
    deleteCard(cardId).then(() => {
        document.querySelector(`.card[id="${cardId}"]`).remove();   
    })
    .catch((err) => {
        console.log(err); // "Что-то пошло не так: ..."
    })
}

export function like (likeButton,cardId,unLikeCard,likeCard) {
    const card = document.querySelector(`.card[id="${cardId}"]`);
    if (likeButton.classList.contains('card__like-button_is-active')) {
        unLikeCard(cardId).then((data)=>{
            card.querySelector('.card__like-counter').textContent=data.likes.length;
        })
        .catch((err) => {
            console.log(err); // "Что-то пошло не так: ..."
        })  
        likeButton.classList.remove ('card__like-button_is-active');
    } else {
        likeCard(cardId).then((data)=>{
            card.querySelector('.card__like-counter').textContent=data.likes.length;
        })
        .catch((err) => {
            console.log(err); // "Что-то пошло не так: ..."
        })  
        likeButton.classList.add ('card__like-button_is-active');
    }
}



