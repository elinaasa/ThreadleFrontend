import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Home from './views/Home';
import Layout from './views/Layout';
import Single from './views/Single';
import Upload from './views/Upload';
import Menu from './views/Menu';
import Login from './views/Login';
import {UpdateProvider} from './contexts/UpdateContext';
import Profile from './views/Profile';

const App = () => {
  return (
    <>
      <Router basename={import.meta.env.BASE_URL}>
        <UpdateProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/Single" element={<Single />} />
              <Route path="/Upload" element={<Upload />} />
              <Route path="/Menu" element={<Menu />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />

              {/*Lisätään myöhemmin views kansioon*/}

              {/*<Route path="/search" element={<Search />} />*/}
              {/*<Route path="/notification" element={<Notification />} />*/}

              {/*Lisätään myöhemmin !*/}

              {/*<Route path="/login" element={<Login />} />*/}
              {/*<Route path="/logout" element={<Logout />} />*/}
              {/*<Route path="/register" element={<Register />} />*/}
              {/*<Route path="/settings" element={<Settings />} />*/}

            </Route>
          </Routes>
        </UpdateProvider>
      </Router>
    </>
  );
};

export default App;
