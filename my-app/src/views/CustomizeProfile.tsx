import {useNavigate} from 'react-router-dom';
import {useUserContext} from '../hooks/ContextHooks';
import {useTheme, useUser} from '../hooks/apiHooks';
import {useCustomizeForm} from '../hooks/formHooks';
import {CustomizeCredentials} from '../types/DBtypes';
import Profile from './Profile';
import {useEffect} from 'react';

const CustomizeProfile = () => {
  const {user} = useUserContext();
  const {postTheme} = useTheme();
  const {customizeUser} = useUser();
  const navigate = useNavigate();
  const initValues: CustomizeCredentials = {
    description: '',
    user_activity: '',
    user_level_id: 2,
    fonts: '',
    colors: '',
  };
  const colorOptions = [
    'White',
    'Red',
    'Pink',
    'Blue',
    'Green',
    'Yellow',
    'Orange',
    'Purple',
    'Magenta',
    'DarkBlue',
  ];
  const fontOptions = [
    'Arial',
    'Times-New-Roman',
    'Verdana',
    'Helvetica',
    'Courier-New',
    'Georgia',
    'Palatino',
    'Tahoma',
    'Impact',
    'Comic-Sans-MS',
  ];

  const doCustomize = async () => {
    // handleLogin(inputs as CustomizeCredentials);
    // get token
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    // post theme
    if (inputs.colors && inputs.fonts) {
      await postTheme(token, inputs.colors, inputs.fonts);
    }
    // post user (description, user_activity, user_level_id)
    if (inputs.description && inputs.user_activity && inputs.user_level_id) {
      await customizeUser(
        token,
        inputs.description,
        inputs.user_activity,
        inputs.user_level_id,
      );
    }

    alert('Profile customized');
    navigate('/profile');
  };

  const {handleSubmit, handleInputChange, inputs} = useCustomizeForm(
    doCustomize,
    initValues as CustomizeCredentials,
  );

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);

  return (
    <div className="p-header">
      <h1>Welcome to Threadle {user?.username}!</h1>
      <div className="customize-container">
        <section className="customize-section">
          <h3>Please customize your profile</h3>
          <form onSubmit={handleSubmit} className="customize-form">
            <div>
              <label htmlFor="description">Description</label>
              <input
                required
                className="text-slate-950"
                name="description"
                type="text"
                id="description"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="colors">Choose a color:</label>
              <select
                required
                id="colors"
                name="colors"
                onChange={handleInputChange}
              >
                <option value="">Select Color</option>
                {colorOptions.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="fonts">Choose a font:</label>
              <select
                required
                id="fonts"
                name="fonts"
                onChange={handleInputChange}
              >
                <option value="">Select Font</option>
                {fontOptions.map((font) => (
                  <option
                    className={`theme-font-${font}`}
                    key={font}
                    value={font}
                  >
                    {font}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="user_level_id">Are you going to sell:</label>
              <select
                id="user_level_id"
                name="user_level_id"
                onChange={handleInputChange}
                required
              >
                <option value={2}>Select option</option>
                <option value={3}>Yes</option>
                <option value={2}>No</option>
              </select>
            </div>
            <div>
              <label htmlFor="user_activity">
                Select your activity status:
              </label>
              <select
                id="user_activity"
                name="user_activity"
                onChange={handleInputChange}
                required
              >
                <option value={''}>Select activity status</option>
                <option value={'Active'}>Active</option>
                <option value={'Away'}>Away</option>
                <option value={'Do not disturb'}>Do not disturb</option>
              </select>
            </div>
            <button type="submit">Customize</button>
          </form>
        </section>
        <section className="customize-section">
          <h3>Preview of your profile</h3>
          <aside className="customize-preview">
            <Profile lockControls={true} previewTheme={inputs} />
          </aside>
        </section>
      </div>
    </div>
  );
};
export default CustomizeProfile;
