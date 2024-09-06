const token = 'c5d70cb5-8b73-43b1-a4be-e5c1d7db4ad6';

export const getUserInfo = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-21/users/me', {
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
  })
.then ((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })  
  .catch((err) => {
    console.log(err); // "Что-то пошло не так: ..."
  });
};

export const getCards = () => {
  return fetch ('https://nomoreparties.co/v1/wff-cohort-21/cards', {
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
  })
  .then ((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })  
  .catch((err) => {
    console.log(err); // "Что-то пошло не так: ..."
  });
};;

export const editUserInfo = (title,description) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-21/users/me', {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: title,
      about: description
    })
  })
  .then ((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })  
  .catch((err) => {
    console.log(err); // "Что-то пошло не так: ..."
  });
};

export const addCard = (name,link) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-21/cards', {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      link
    })
  })
  .then ((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })  
  .catch((err) => {
    console.log(err); // "Что-то пошло не так: ..."
  });
};

export const deleteCard = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-21/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
    }
  })
  .then((res) => {
    if (res.ok) {
      return res.json()      
    }
   return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err); // "Что-то пошло не так: ..."
  })  
};

export const likeCard =(cardId)=> {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-21/cards/likes/${cardId}`,{
    method: 'PUT',
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
    }
  })
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
   return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err); // "Что-то пошло не так: ..."
  })  
};

export const unLikeCard =(cardId)=> {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-21/cards/likes/${cardId}`,{
    method: 'DELETE',
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
    }
  })
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
   return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err); // "Что-то пошло не так: ..."
  })  
};

export const editUserAvatar = (url) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-21/users/me/avatar',{
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      avatar: url
    })
  })
  .then ((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })  
  .catch((err) => {
    console.log(err); // "Что-то пошло не так: ..."
  });
};