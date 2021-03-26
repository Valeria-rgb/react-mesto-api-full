function PopupWithForm({title, name, children, button, isOpen, onClose, onSubmit}) {
    return (
        <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className={`popup__container popup__container_${name}`}>
                <button className={`popup__close-button popup__close-button_${name}`} type="button" onClick={onClose}/>
                <form
                    className={`popup__form popup__form_${name}`}
                    onSubmit={onSubmit}
                    noValidate>
                    <h3 className={`popup__title popup__title_${name}`}>{title}</h3>
                    {children}
                    <button className="popup__submit"
                            type="submit">{button}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm


