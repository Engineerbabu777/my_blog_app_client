import React, { useState } from 'react'
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image'],
    ['clean']
  ]
}


const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]

const CreatePost = () => {
  const [title, settitle] = useState("");
  const [summary, setsummary] = useState("");
  const [files, setfile] = useState("");
  const [detail, setdetail] = useState("");
  const [redirect, setredirect] = useState(false);

  const formSubmit = (ev) => {
    ev.preventDefault();
    const data = new FormData();
    data.set("file", files[0]);
    data.set("summary", summary);
    data.set("title", title);
    data.set("detail", detail);
    axios.post("http://localhost:7544/post", data, { credentials: 'include' });

    setredirect(true);
  }

  if (redirect) {
    return <Navigate to="/" />
  }
  return (
    <div className='box-form-create'>

      <form className='create-form-blog'>
        <input type="text" placeholder="Title" value={title} onChange={e => settitle(e.target.value)} />
        <input type="text" placeholder="Summary" value={summary} onChange={e => setsummary(e.target.value)} />
        <input type="file" onChange={(e) => setfile(e.target.files)} />
        <ReactQuill className='quill-text-editor' onChange={(val) => setdetail(val)} modules={modules} formats={formats} />
        <button className='btn-form' type='submit' onClick={formSubmit} >Let's Post it  ? 😀🥳😎</button>
      </form>

    </div>
  )
}

export default CreatePost
