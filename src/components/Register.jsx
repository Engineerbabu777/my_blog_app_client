import React,{useState} from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
    
  const [username,setusername] = useState("")
  const [email,setemail] = useState("")
  const [password,setpassword] = useState("")
  
  const notify = (message) => toast.success(message);
  const notify2 = (message) => toast.error(message);
  const notify3 = (message) => toast.error(message);


  const RegisterUser = (e) => {
    e.preventDefault();
    axios.post("http://localhost:7544/register", {username,email,password})
    .then(({data}) => {
        console.log(data.result);
        notify(data.result);
    })
    .catch(({response}) => {
      
      const {data} = response;
      if(data.user){
        notify3("user already exists");
        // console.log(response.data.user);
        // console.log(data.user);
        return;
      }
      const user_email = (response.data.message).search("email");
      const user_name = (response.data.message).search("username");
      
      if(user_name !== -1){
        notify2("username already in use");
        // console.log(response.data.message)
        // console.log({user_name,user_email})
        return;
      }
      else if(user_email !== -1){
        notify2("same email already in use");
        // console.log(response.data.message)
        // console.log({user_name,user_email})
        return;
      }
    });
  }


  return (
    <div className='form-box'>
    <h2>Sign Up</h2>
    <form className="form" onSubmit={RegisterUser}>
      <input type="text" className="input-box" placeholder="example123" value={username} onChange={ev => setusername(ev.target.value)} />
      <input type="email" className="input-box" placeholder="example123@gmail.com"  value={email} onChange={ev => setemail(ev.target.value)} />
      <input type="password" className="input-box" placeholder="********" value={password} onChange={ev => setpassword(ev.target.value)} />
      <button type="submit" className="btn-form" >Register</button>
    </form>
    <Toaster />
    </div>
  )
}

export default Register
