import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import GoogleSignupIn from './Google_signup_in'
const host = 'http://localhost:4000'
const Signup = (props) => {

  const [credential, setCredential] = useState({name:"",email:"", password:"", cpassword:""})

  let Navigate = useNavigate() 
  const handleSubmit = async (e) => {
    e.preventDefault()
    const {name,email,password} = credential
    const response = await fetch(`${host}/api/auth/sign-up`, {
      method: "POST", 
      
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({name, email, password}),
 
    });
    const resultInJson = await response.json()


    if(resultInJson.success){
      localStorage.setItem('token',resultInJson.authToken);
      props.showAlert('SignUp successfully','success')
      Navigate('/')

    }else{
      console.log(resultInJson)
      if(resultInJson.error === 'heyy!!'){
        props.showAlert('You already sign-up, Please sign-in','danger')
      }else if(resultInJson.error === 'Try to sign-in with google'){
        props.showAlert('Try to sign-in with google','danger')
      }else{
        props.showAlert('Invalid Credential','danger')
      }

    }
  }

  const onChange = (e) => {
        
    setCredential({...credential, [e.target.name]: e.target.value})
}

  return (
    <div className="container mx-auto flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4 ">Welcome</h1>
    <form onSubmit={handleSubmit} className="w-96 bg-white shadow-md rounded px-4 pt-3 pb-4 mb-2 ">
    <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          className="border-green-400 border-t-0 rounded-lg w-full py-2 px-3 text-gray-700 focus:border-green-500 focus:ring-green-500 bg-gray-50 focus:ring-opacity-50 focus:ring-2 focus:outline-none"
          id="name"
          name="name"
          value={credential.name}
          onChange={onChange}
          placeholder="Enter name"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          Email address
        </label>
        <input
          type="email"
          className="border-green-400 border-t-0 rounded-lg w-full py-2 px-3 text-gray-700 focus:border-green-500 focus:ring-green-500 bg-gray-50 focus:ring-opacity-50 focus:ring-2 focus:outline-none"
          id="email"
          name="email"
          value={credential.email}
          onChange={onChange}
          placeholder="Enter email"
        />
        <p className="text-gray-600 text-xs italic">We'll never share your email with anyone else.</p>
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          className="border-green-400 border-t-0 rounded-lg w-full py-2 px-3 text-gray-700 focus:border-green-500 focus:ring-green-500 bg-gray-50 focus:ring-opacity-50 focus:ring-2 focus:outline-none"
          id="password"
          name="password"
          value={credential.password}
          onChange={onChange}
          placeholder="Password"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="btn btn-outline-primary mx-1"
        >
          Submit
        </button>
      </div>
    </form>
    <div className="flex flex-row items-center mt-6 ">
    <hr className="w-52"/>
    <p className="px-4">OR</p>
    <hr className="w-52"/>
    </div>
    <div className="flex items-center justify-center h-100 mb-4">
      <GoogleSignupIn showAlert={props.showAlert} />
    </div>
  </div>
    
  )
}

export default Signup