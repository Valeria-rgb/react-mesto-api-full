import PopupWithForm from "./PopupWithForm";
import React from "react";

function ConfirmDeletePopup({ isOpen, onClose, onDeleteCard, isLoading }) {

    function handleSubmit(e) {
        e.preventDefault();
        onDeleteCard();
    }

    return (
        <PopupWithForm
            name="delete-photo"
            title="Вы уверены?"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            button={isLoading ? "Удаление..." : "Да"}
        />
    );
}

export default ConfirmDeletePopup