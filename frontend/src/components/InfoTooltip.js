import React from "react";
import success from "../images/success.svg";
import fail from "../images/fail.svg";

function InfoTooltip ({ isOpen, isSuccess, onClose }) {

    return (
        <div className={`popup popup_auth-info ${isOpen ? 'popup_opened' : ''}`}>
            <div className={`popup__container popup__container_auth-info`}>
                <button
                    className={`popup__close-button popup__close-button_auth-info`}
                    type="button"
                    onClick={onClose}/>
                <div className={`popup__form`}>
                    <img
                      className="popup__icon"
                      src={isSuccess ? success : fail}
                      alt={'Иконка результата авторизации'}/>
                    <p className="popup__message">{isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
                </div>
            </div>
        </div>
    )
}

export default InfoTooltip;