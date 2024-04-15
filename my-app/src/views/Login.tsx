import {useEffect} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {useNavigate} from 'react-router-dom';
import {useUserContext} from '../hooks/ContextHooks';

const Login = () => {
  const {user, handleAutoLogin} = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    handleAutoLogin();
    if (user) {
      navigate('/profile');
    }
  }, [user]);
  return (
    <>
      <LoginForm></LoginForm>
      <RegisterForm />
    </>
  );
};

export default Login;
