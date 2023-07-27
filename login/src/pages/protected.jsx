import { useEffect, useState } from 'react';
import Navbar from '../componentes/navbar';
import "../style/index.css"
import { useAuth } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';


const Protected = () => {
  const [message, setMessage] = useState('');
  const { token, setToken } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('access_token');

    // Utiliza navigate en minúscula
    navigate('/');
  };
  useEffect(() => {
    // Realizar una solicitud al backend para acceder a la ruta protegida
    fetch('http://localhost:5000/api/protected', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`, // Agrega el token JWT almacenado en el LocalStorage
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Unauthorized'); // Si la solicitud no es autorizada, se lanzará un error
        }
      })
      .then((data) => {
        setMessage(data.message); // Si la solicitud es exitosa, muestra el mensaje del backend
      })
      .catch((error) => {
        setMessage('Unauthorized'); // Manejo del error si la solicitud no es autorizada
      });
  }, []);

  return (
    <div>
      <Navbar/>
      <div className="main-content">
      <h1 className='text-center'>Ruta Protegida</h1>

      {message === 'Unauthorized' ? (
        <p className='text-center'>No tienes acceso a esta ruta. Debes iniciar sesión primero.</p>
      ) : (
        <>
        <p className='text-center'>{message}</p>
        <div className="d-flex justify-content-center">
        <button onClick={handleLogout} className='btn btn-danger'>
        Cerrar Sesión
      </button>
      </div>
      </>
      )}
      </div>
    </div>
  );
};

export default Protected;
