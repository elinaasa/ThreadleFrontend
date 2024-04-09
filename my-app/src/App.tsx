import Home from './views/Home';
import Layout from './views/Layout';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/layout" element={<Layout />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
