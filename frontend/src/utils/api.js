class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _sendData(path, headers) {
        return fetch(`${this._url}${path}`, headers)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Произошла ошибка: ${res.status}`);
            })
    }

    getUserInfo() {
        return this._sendData("users/me", {
            method: "GET",
            credentials: 'include',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            }
        })
    }

    getCards() {
        return this._sendData("cards", {
            method: "GET",
            credentials: 'include',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            }
        })
    }

    getStartData() {
        return Promise.all([
            this.getUserInfo(),
            this.getCards()
        ]);
    }

    changeUserInfo(data) {
        return this._sendData("users/me", {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            },
            credentials: 'include',
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
    }

    addCard(newCard) {
        return this._sendData("cards", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            },
            credentials: 'include',
            body: JSON.stringify({
                name: newCard.name,
                link: newCard.link
            })
        })
    }

    changeLikeCardStatus(cardId, isLiked) {
        return this._sendData(`cards/likes/${cardId}`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            },
            credentials: 'include',
        });
    }

    deleteCard(card) {
        return this._sendData(`cards/${card}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            },
            credentials: 'include',
        })
    }

    changeAvatar(avatar) {
        return this._sendData('users/me/avatar', {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            },
            credentials: 'include',
            body: JSON.stringify({
                avatar: avatar.avatar
            })
        })
    }

    signUp(email, password) {
        return this._sendData("signup", {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({email, password})
        })
    };

    signIn(email, password) {
        return this._sendData("signin", {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({email, password})
        })
            .then((data) => {
                const token = data.token;
                if (token) {
                    localStorage.setItem('jwt', token);
                    return data;
                }
            })
            .catch(err => console.log(err))
    };

    getToken(jwt) {
        return this._sendData("users/me", {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${jwt}`,
            },
            credentials: 'include',
        })
            .catch((err) => console.log(err))
    }
}

const myApi = new Api({
    url: "http://api.valeria-rgb.students.nomoredomains.icu/",
    headers: {
        // "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json"
    }
});
export default myApi;


