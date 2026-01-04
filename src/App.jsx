import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CardDetail from './pages/CardDetail'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/card/:id" element={<CardDetail />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
