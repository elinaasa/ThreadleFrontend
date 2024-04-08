import Home from './views/Home';
import Layout from './views/Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {


  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/single" element={<Single />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
