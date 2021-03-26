function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup_scale-photo ${card.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__photo-container">
                <button className="popup__close-button popup__close-button_photo" onClick={onClose} type="button"/>
                <img className="popup__photo" src={card.link} alt={card.name}/>
                <h2 className="popup__photo-title">{card.name}</h2>
            </div>
        </div>
    );
}

export default ImagePopup

