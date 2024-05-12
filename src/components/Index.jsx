import React,{useContext, useEffect} from 'react'
import Post from './Post';
import UserContext from '../UserContext';
import axios from 'axios';

const Index = () => {
  
  const {setuserInfo} = useContext(UserContext);
  useEffect(() =>{
    console.log("load...")
    axios.get("http://localhost:7544/profile")
    .then(({ data }) => {
      setuserInfo(data)
    })
    .catch(e => console.log(e.message))
  },[setuserInfo]);
  return (
    <>
    <Post/>
    </>
  )
}

export default Index;