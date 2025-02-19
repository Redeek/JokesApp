import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import EditJoke from './pages/EditJoke'
import Main from './pages/Main'

function App() {

  return (
    <>
    <Router>
      <div className="Header">
      <Header />
      </div>
      
      <div className="Body">
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/edit' element={<EditJoke/>} />
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
