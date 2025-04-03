class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers; // corpo do construtor
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // se o servidor retornar um erro, rejeite a promessa
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err); // registra o erro no console
      });
  }

  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // se o servidor retornar um erro, rejeite a promessa
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err); // registra o erro no console
      });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // se o servidor retornar um erro, rejeite a promessa
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err); // registra o erro no console
      });
  }
  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // se o servidor retornar um erro, rejeite a promessa
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err); // registra o erro no console
      });
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // se o servidor retornar um erro, rejeite a promessa
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err); // registra o erro no console
      });
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // se o servidor retornar um erro, rejeite a promessa
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err); // registra o erro no console
      });
  }
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // se o servidor retornar um erro, rejeite a promessa
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err); // registra o erro no console
      });
  }

  editUserPhoto({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // se o servidor retornar um erro, rejeite a promessa
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err); // registra o erro no console
      });
  }
}

export const getAPIInstance = (token) => {
  const api = new Api({
    baseUrl: "https://api.around-us.mooo.com",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return api;
};
