import React from 'react'
import { jwtDecode } from 'jwt-decode'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Google_signup_in(props) {

  let Navigate = useNavigate()


  const handlecallbackresponse = async (response) => {

    var user = jwtDecode(response.credential);
    user.authMethod = 'google';
    user.password = 'hello123'

    try {
      const response = await fetch(`/api/auth/sign-in`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ user }),

      });

      const resultInJson = await response.json()


      if (resultInJson.success) {
        localStorage.setItem('token', resultInJson.authToken);
        props.showAlert('SignIn successfully', 'success')
        Navigate('/')
      } else {
        if (resultInJson.error === 'Try login with traditional login') {
          props.showAlert('Try login with traditional login', 'danger')
        }
        else {
          props.showAlert('Invalid Credential ! Try again', 'danger')
        }


      }
    } catch (error) {
      console.error('Error updating note:', error);
    }
  }

  // eslint-disable-next-line

  useEffect(() => {
    /* global google */

    google.accounts.id.initialize({
      client_id: '926629091047-dshni26m0gkpohktbiulnru6prdim4km.apps.googleusercontent.com',
      callback: handlecallbackresponse
    })

    google.accounts.id.renderButton(
      document.getElementById('signin'),
      { size: 'large', theme: 'outline', text: 'Continue with Google', width: '400' }
    )

  }, []);

  return (
    <div>
      <div id='signin' className=' mt-4  rounded-md  '></div>
    </div>
  )
}

export default Google_signup_in