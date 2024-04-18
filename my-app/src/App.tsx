import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Home from './views/Home';
import Layout from './views/Layout';
import Single from './views/Single';
import Upload from './views/Upload';
import Login from './views/Login';
import {UpdateProvider} from './contexts/UpdateContext';
import {UserProvider} from './contexts/UserContext';
import Profile from './views/Profile';
import ChatsMenu from './views/ChatsMenu';
import Messages from './views/Messages';
import {ChatProvider} from './contexts/ChatContext';
import Logout from './views/Logout';
import Search from './views/Search';
import Settings from './views/Settings';
import Notifications from './views/Notifications';

const App = () => {
  return (
    <>
      <Router basename={import.meta.env.BASE_URL}>
        <UpdateProvider>
          <ChatProvider>
            <UserProvider>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/Single" element={<Single />} />
                  <Route path="/Upload" element={<Upload />} />
                  <Route path="/Login" element={<Login />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/Chats" element={<ChatsMenu />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/Search" element={<Search />} />
                  <Route path="/Settings" element={<Settings />} />
                  <Route path="/notifications" element={<Notifications />} />

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
            </UserProvider>
          </ChatProvider>
        </UpdateProvider>
      </Router>
    </>
  );
};

export default App;
