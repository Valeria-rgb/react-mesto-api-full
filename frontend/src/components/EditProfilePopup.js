import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState(currentUser.name);
    const [description, setDescription] = React.useState(currentUser.about);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeAbout(e) {
        setDescription(e.target.value);
    }

    return (
       <PopupWithForm
        name="edit"
        title="Редактировать профиль"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        button={isLoading ? "Сохранение..." : "Сохранить"}>
            <input
                className="popup__input popup__input_name"
                placeholder="Имя"
                type="text"
                name="name"
                value={name || ''}
                onChange={handleChangeName}
                id="name-field"
                minLength="2" maxLength="40" required/>
            <span className="popup__error_visible" id="name-field-error"/>
            <input
                className="popup__input popup__input_description"
                placeholder="Род занятий"
                type="text"
                name="about"
                value={description || ''}
                onChange={handleChangeAbout}
                id="description-field"
                minLength="2" maxLength="200" required/>
            <span className="popup__error_visible" id="description-field-error"/>
    </PopupWithForm>
    );
}

export default EditProfilePopup