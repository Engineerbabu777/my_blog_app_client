import React, { useState} from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router-dom'


const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [redirect, setredirect] = useState(false);


  const notify = (message) => {
    setTimeout(() => {
      console.log("67");
      setredirect(true);
    }, 3000);
    toast.success(message)
  }
  const notify2 = (message) => toast.error(message);

  const LoginUser = (ev) => {
    ev.preventDefault();
    axios.post("http://localhost:7544/login", { email, password })
      .then(({ data }) => {
        notify(data.result);
      })
      .catch(({ response }) => {
        const { data } = response;
        console.log(data);
        notify2(data.message);
      })
  }

  if (redirect) {
    return <Navigate to="/" />
  }

  return (


    <div className='form-box'>
      <h2>Sign In</h2>
      <form className="form" onSubmit={LoginUser}>
        <input type="email" className="input-box" placeholder="example123@gmail.com" value={email} onChange={ev => setemail(ev.target.value)} />
        <input type="password" className="input-box" placeholder="********" value={password} onChange={ev => setpassword(ev.target.value)} />
        <button type="submit" className="btn-form" >Login</button>
      </form>
      <Toaster />

    </div>




  )
}

export default Login
