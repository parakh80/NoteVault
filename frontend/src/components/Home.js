import React from 'react'
import Notes from './Notes'
import AddNote from './AddNote'


function Home(props) {
 const {showAlert,setProgress} = props;
  return (
    <>
    <AddNote showAlert={showAlert} setProgress={setProgress}/>
    <Notes showAlert={showAlert} setProgress={setProgress}/>
    
   </>
  )
}

export default Home
