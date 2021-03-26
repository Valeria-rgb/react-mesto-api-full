import React from "react";
import { Link } from "react-router-dom";

function Register({onRegister}) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function changeEmail(e) {
        setEmail(e.target.value);
    }

    function changePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(email, password);
        setEmail('');
        setPassword('');
    }

    return (
        <section className="auth">
            <h1 className="auth__title">Регистрация</h1>
            <form
                className="auth__form"
                name ="signup"
                onSubmit={handleSubmit}
                noValidate>
                <input
                    className="auth__input"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={changeEmail} required>
                </input>
                <input
                    className="auth__input"
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    minLength="5"
                    maxLength="30"
                    onChange={changePassword} required>
                </input>
                <button
                    className="auth__submit auth__submit_register"
                    type="submit">Зарегистрироваться</button>
            </form>

            <p className="auth__route">
                Уже зарегистрированы?<Link to="/sign-in" href="" className="auth__link"> Войти</Link>
            </p>
        </section>
    );
}

export default Register;