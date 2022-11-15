import { Routes, Route } from "react-router-dom";
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Home from "./components/Home";
import PrivateRoute from "./components/routes/PrivateRoutes";
import AuthRoutes from "./components/routes/AuthRoutes";
import Movie from './components/movie'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ToastContainer/>
      <Routes>
        <Route exact path="/" element={
            <AuthRoutes>
              <Home/>
            </AuthRoutes>
          } 
        />
        <Route exact path="/login" element={
            <AuthRoutes>
              <Login/>
            </AuthRoutes>
          } 
        />
        <Route exact path="/register" element={
            <AuthRoutes>
              <Register/>
            </AuthRoutes>
          } 
        />
        <Route exact path="/movies" element={
            <PrivateRoute>
              <Movie/>
            </PrivateRoute>
          } 
        />
      </Routes>
    </>
  );
}

export default App;
