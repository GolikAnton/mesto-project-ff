const config = {
  baseUrl: 'https://nomoreparties.co/v1//wff-cohort-21',
  headers: {
    authorization: 'c5d70cb5-8b73-43b1-a4be-e5c1d7db4ad6',
    'Content-Type': 'application/json'
  }
}

function handleResponse (res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then (handleResponse)  
};

export const getCards = () => {
  return fetch (`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then (handleResponse)  
};

export const editUserInfo = (title,description) => {
  return fetch (`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: title,
      about: description
    })
  })
  .then (handleResponse)  
};

export const addCard = (name,link) => {
  return fetch (`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link
    })
  })
  .then (handleResponse)  
};

export const deleteCard = (cardId) => {
  return fetch (`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then (handleResponse)  
};

export const likeCard =(cardId)=> {
  return fetch (`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then (handleResponse) 
};

export const unLikeCard =(cardId)=> {
  return fetch (`${config.baseUrl}/cards/likes/${cardId}`,{
    method: 'DELETE',
    headers: config.headers,
  })
  .then (handleResponse) 
};

export const editUserAvatar = (url) => {
  return fetch (`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: url
    })
  })
  .then (handleResponse) 
};