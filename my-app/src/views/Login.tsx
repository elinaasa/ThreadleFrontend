import {useEffect, useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {useNavigate} from 'react-router-dom';
import {useUserContext} from '../hooks/ContextHooks';

const Login = () => {
  const {user, handleAutoLogin} = useUserContext();
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  const toggleShowLogin = () => {
    setShowLogin(!showLogin);
  };

  useEffect(() => {
    handleAutoLogin();
    if (user) {
      navigate('/profile');
    }
  }, [user]);

  return (
    <>
      {showLogin ? (
        <LoginForm toggleShowLogin={toggleShowLogin}></LoginForm>
      ) : (
        <RegisterForm toggleShowLogin={toggleShowLogin}></RegisterForm>
      )}
    </>
  );
};

export default Login;
