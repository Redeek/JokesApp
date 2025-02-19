import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import EditJoke from './pages/EditJoke'
import Main from './pages/Main'

function App() {

  return (
    <Router>
      <div className="header">
      <Header />
      </div>
      
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/edit' element={<EditJoke/>} />
        </Routes>

        
    </Router>
  )
}

export default App
