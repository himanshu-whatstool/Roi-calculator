
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calculator from './components/Calculator';
import Form from './components/Forms';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Calculator />} />
          <Route path="/form" element={<Form />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App










