import React from 'react';

function Login({onLogin}) {
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
        onLogin(email, password);
        setEmail('');
        setPassword('');
    }

    return (
        <section className="auth">
          <h1 className="auth__title">Вход</h1>
            <form
                className="auth__form"
                name ="login"
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
                    className="auth__submit"
                    type="submit">Войти</button>
            </form>

        </section>
    );
}

export default Login;