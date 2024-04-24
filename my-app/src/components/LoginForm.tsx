import {useForm} from '../hooks/formHooks';
import {Credentials} from '../types/LocalTypes';
import {useUserContext} from '../hooks/ContextHooks';

const LoginForm = (params: {toggleShowLogin: () => void}) => {
  const {toggleShowLogin} = params;
  const {handleLogin} = useUserContext();

  const initValues: Credentials = {username: '', password: ''};

  const doLogin = async () => {
    handleLogin(inputs as Credentials);
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doLogin,
    initValues,
  );

  return (
    <div className="l-header">
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="UserWithLevelname">Username</label>
          <input
            className="login-color"
            name="username"
            type="text"
            id="UserWithLevelname"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div className='login-pass'>
          <label htmlFor="loginpassword">Password</label>
          <input
            className="login-color"
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <button className='login-b' type="submit">Login</button>
      </form>
      <button onClick={toggleShowLogin}>I do not have an account</button>
    </div>
  );
};

export default LoginForm;
