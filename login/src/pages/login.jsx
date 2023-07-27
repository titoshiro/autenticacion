import { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import Navbar from '../componentes/navbar';
import "../style/index.css"

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Invalid credentials'); // Si las credenciales son inválidas, se lanzará un error
        }
      })
      .then((data) => {
        localStorage.setItem('access_token', data.access_token); // Almacena el token JWT en el LocalStorage
        navigate('/protected'); // Redirige a la ruta protegida después del inicio de sesión exitoso
      })
      .catch((error) => {
        setErrorMessage('Credenciales inválidas'); // Establece el mensaje de error
      });
  };

  return (
    <>
      <div className="container">
        <Navbar />
        <div className="main-content">
          <h1 className="text-center">Login</h1>

          {errorMessage && <p className="text-danger">{errorMessage}</p>} {/* Muestra el mensaje de error si existe */}
          
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text"></div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-warning">Entrar</button>
            </div>
          </form>
          <p className="text-center mt-3">¿No estás registrado? <Link to="/register">¡Regístrate aquí!</Link></p>
        </div>
      </div>
    </>
  );
};

export default Login;
