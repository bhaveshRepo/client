import React, { useContext, useEffect, useRef } from 'react'
import { LoginContext } from '../Auth';
import { Button } from '../components/Button'
import { toast } from 'react-toastify';
import Input from '../components/Input';
import axios from 'axios';
import './Login.css'

export default function Login() {

  const { token, authenticate } = LoginContext();

  let email = useRef()
  let password = useRef()

  function login() {

    const data = new FormData()
    data.append('email', email.current.value);
    data.append('password', password.current.value);

    axios.post('http://localhost:8000/auth/signin', data)
      .then(res => {
        email.current.value = ''
        password.current.value = ''
        if (res.status == 200) {
          toast.success('Success', { autoClose: 2000 })
          return setTimeout(() => {

            localStorage.setItem('token', res.data.token)
            localStorage.setItem('authenticate', true)
            location.replace('/home')
          }, 2000)
        }
        toast.error("Something went wrong", { autoClose: 2000 })

      })
      .catch(err => {
        email.current.value = ''
        password.current.value = ''
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
          func={() => login()}
        />
        <Button
          label={'Register'}
          func={() => { location.replace('register') }}
        />
      </div>

    </div>
  )
}
