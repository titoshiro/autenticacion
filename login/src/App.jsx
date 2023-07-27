import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Protected from './pages/protected'; // Importa el componente Protected
import { AuthProvider } from './context/AuthContext';
const App = () => {
  return (
    <BrowserRouter>
    <AuthProvider> 
      <Routes>
      <Route path="/" element={<Register/>} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} index /> 
        <Route path="protected" element={<Protected />} /> {/* Ruta protegida */}
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
