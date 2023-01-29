import React, { useContext, useEffect, useRef } from 'react'
import axios from 'axios';
import { LoginContext } from '../Auth';
import { Button } from '../components/Button'
import './Login.css'
import { Navigate } from 'react-router-dom';
import Input from '../components/Input';
import { toast } from 'react-toastify';

export default function Register() {

  const { token, authenticate } = LoginContext();

  let email = useRef()
  let password = useRef()
  let username = useRef()


  function register() {

    const data = new FormData()
    data.append('username', username.current.value);
    data.append('email', email.current.value);
    data.append('password', password.current.value);


    axios.post('http://localhost:8000/auth/signup', data)
      .then(res => {
        email.current.value = ''
        password.current.value = ''
        username.current.value = ''

        if (res.status == 200) {
          toast.success('Success', { autoClose: 2000 })
          return setTimeout(() => {
            location.replace('/')
          }, 2000)
        }
        toast.error("Something went wrong", { autoClose: 2000 })

      })
      .catch(err => {
        email.current.value = ''
        password.current.value = ''
        username.current.value = ''
        toast.error("Something went wrong", { autoClose: 2000 })
        localStorage.clear();
      })
  }



  useEffect(() => {
    if (token && authenticate) {
      return location.replace('/home')
    }
  }, [])

  return (
    <div className='parent-container'>
      <Input
        type={"text"}
        value={username}
        label={'Username : '}
      />
      <Input
        type={"email"}
        value={email}
        label={'Email : '}
      />
      <Input
        type={"password"}
        value={password}
        label={'Password :'}
      />
      <div className='button-container'>

        <Button
          label={'Login'}
          func={() => { location.replace('/') }}
        />
        <Button
          label={'Register'}
          func={() => register()}
        />
      </div>

    </div>
  )
}
