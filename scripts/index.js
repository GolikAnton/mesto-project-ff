// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function createCard (title, link, alt, remove) {
  const cardContent = cardTemplate.querySelector('.card').cloneNode(true); 

  cardContent.querySelector('.card__title').textContent = title; 
  cardContent.querySelector('.card__image').src = link; 
  cardContent.querySelector('.card__image').alt = alt; 

  const deleteButton = cardContent.querySelector('.card__delete-button'); 
  deleteButton.addEventListener('click', remove); 

  return cardContent; 
}

function removeCard(evt) { 
    const eventTarget = evt.target; 
    const card = eventTarget.closest('.card'); 
    card.remove(); 
  };

initialCards.forEach((card) => { 
    const cardContent = createCard(card.name, card.link, card.alt, removeCard)
    placesList.append(cardContent); 
  });
  
  