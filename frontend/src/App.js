import './App.css';
import React,{useState} from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Notestate from './context/notes/Notestate';
import Alert from './components/Alert';
import LoadingBar from 'react-top-loading-bar'




function App() {
  const [alert, setAlert] = useState(null);
  const [progress, setProgress] = useState(0)
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => { setAlert(null) }, 1500);
  }
  const  set_Progress = (progress) => {
    setProgress(progress)
  }
  return (
    <>
    
   <Notestate>
    <Router>
    
      <Navbar/>
      <Alert alert={alert}/>
      <LoadingBar
       height={3}
        color='#f11946'
        progress={progress}
      />
      <div className="container">
        <Routes>
          <Route exact path='/'  element={<Home showAlert={showAlert} setProgress={set_Progress}/>}/>
          <Route exact path='/about'  element={<About/>}/>
          <Route exact path='/login'  element={<Login showAlert={showAlert}/>}/>
          <Route exact path='/signup'  element={<Signup showAlert={showAlert}/>}/>
        </Routes>
        </div>
    
    </Router>
    </Notestate>
    </>
  );
}

export default App;