import logo from './logo.svg';
import './App.css';

import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Projects from './routes/Projects';
import Housing from './routes/Housing';

function App() {

  const routes = (
    <Routes className="appBody">
      <Route path="/" element={<Projects />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/housing" element={<Housing />} />
    </Routes>
  )

  return (
    <div className="App">
      <div className='display'>
        {/* {routes} */}
        <Projects/>
      </div>
      
    </div>
  );
}

export default App;
