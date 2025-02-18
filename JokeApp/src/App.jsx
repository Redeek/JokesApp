import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import EditJoke from './pages/EditJoke'
import Main from './pages/Main'

function App() {

  return (
    <>
    <Router>
      <div className='container'>
      <Header />
      </div>
      
      <div className="card">
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
