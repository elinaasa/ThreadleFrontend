import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Home from './views/Home';
import Layout from './views/Layout';
import Single from './views/Single';
import Upload from './views/Upload';
import Menu from './views/Menu';
import { UpdateProvider } from './contexts/UpdateContext';

  const App = () => {
    return (
      <>
          <Router basename={import.meta.env.BASE_URL}>
            <UpdateProvider>
          <Routes>
            <Route element={<Layout />}>
            <Route path="/Home" element={<Home />} />
              <Route path="/single" element={<Single />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/Menu" element={<Menu />} />


{/*Lisätään myöhemmin views kansioon*/}

              {/*<Route path="/search" element={<Search />} />*/}
              {/*<Route path="/notification" element={<Notification />} />*/}


{/*Lisätään myöhemmin !*/}

              {/*<Route path="/login" element={<Login />} />*/}
              {/*<Route path="/logout" element={<Logout />} />*/}
              {/*<Route path="/register" element={<Register />} />*/}
              {/*<Route path="/profile" element={<Profile />} />*/}

            </Route>
          </Routes>
          </UpdateProvider>
    </Router>

      </>


    );
  };

export default App;
