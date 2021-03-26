import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm
            name="new-avatar"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            button={isLoading ? "Сохранение..." : "Сохранить"}>
                <input
                    className="popup__input popup__input_avatar"
                    placeholder="Ссылка на картинку"
                    type="url"
                    name="avatar"
                    ref={avatarRef}
                    id="link-of-image" required
                />
                <span className="popup__error" id="link-of-image-error"/>
        </PopupWithForm>
    );
}

export default EditAvatarPopup