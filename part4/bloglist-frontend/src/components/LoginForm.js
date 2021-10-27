import React from 'react'

const LoginForm = ({
    handleLogin, 
    username, 
    password, 
    setUsername,
    setPassword
    }) => {
    return (
      <div>
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
            <div>
            username
                <input
                id="username"
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
            password
                <input
                id="password" 
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
                />
            </div>
        <button type="submit">Submit</button>
        </form>

        </div>
    )
}

export default LoginForm