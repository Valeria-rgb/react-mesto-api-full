import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from "react";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardDeleteButtonClassName = (
        `card__trash ${isOwn ? '' : 'card__trash_invisible'}`
    );

    const cardLikeButtonClassName = (
        `card__like ${isLiked ? 'card__like_active' : ''}`
    );

    function handleCardClick() {
        onCardClick(card)
    }

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleDeleteClick() {
        onCardDelete(card)
    }

    return (
        <li className="card">
            <img className="card__photo" src={card.link} alt={card.name} onClick={handleCardClick}/>
            <button className={cardDeleteButtonClassName} aria-label="trash" onClick={handleDeleteClick}/>
            <div className="card__info">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__likes">
                    <button className={cardLikeButtonClassName} aria-label="like" onClick={handleLikeClick}/>
                    <p className="card__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;