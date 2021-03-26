import React from "react";
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img className="profile__avatar" src={currentUser.avatar} alt="Аватар"/>
                    <button className="profile__avatar-button" onClick={onEditAvatar}/>
                </div>
                <div className="profile__info">
                    <div className="profile__text">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__edit-button" type="button" aria-label="Edit" onClick={onEditProfile}/>
                    </div>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={onAddPlace}/>
            </section>
            <section className="elements">
                <ul className="cards">
                    {cards.map((card) => (
                        <Card
                            card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                            key={card._id}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;