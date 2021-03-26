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
            headers: this._headers
        })
    }

    getCards() {
        return this._sendData("cards", {
            method: "GET",
            headers: this._headers
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
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
    }

    addCard(newCard) {
        return this._sendData("cards", {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: newCard.name,
                link: newCard.link
            })
        })
    }

    changeLikeCardStatus(cardId, isLiked) {
        return this._sendData(`cards/likes/${cardId}`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: this._headers
        });
    }

    deleteCard(card) {
        return this._sendData(`cards/${card}`, {
            method: "DELETE",
            headers: this._headers
        })
    }

    changeAvatar(avatar) {
        return this._sendData('users/me/avatar', {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar.avatar
            })
        })
    }

    signUp(email, password) {
        return this._sendData("signup", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
    };

    signIn(email, password) {
        return this._sendData("signin", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
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
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            }
        })
            .catch((err) => console.log(err))
    }
}

const myApi = new Api({
    url: "http://api.valeria-rgb.students.nomoredomains.icu/",
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
}
});
export default myApi;


