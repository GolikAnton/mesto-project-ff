// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function createCard (title, link, removeCard) {
  const cardContent = cardTemplate.querySelector('.card').cloneNode(true); 
  const cardImage =  cardContent.querySelector('.card__image');

  cardContent.querySelector('.card__title').textContent = title; 
  cardImage.src = link;
  cardImage.alt = title;

  const deleteButton = cardContent.querySelector('.card__delete-button'); 
  deleteButton.addEventListener('click', removeCard); 

  return cardContent; 
}

function removeCard(evt) { 
    const eventTarget = evt.target; 
    const card = eventTarget.closest('.card'); 
    card.remove(); 
  };

initialCards.forEach((card) => { 
    const cardContent = createCard(card.name, card.link, removeCard)
    placesList.append(cardContent); 
  });
  
  