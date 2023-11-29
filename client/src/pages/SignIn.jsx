// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [error , setError] = useState(null);
  const [loading , setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (event) => {
      setFormData({
        ...formData,
        [event.target.id]:event.target.value
      });
  };

  const handleSubmit = async (event) =>{
    event.preventDefault();
    try{
        setLoading(true)
        const res = await fetch('/api/auth/signin' , {
            method : 'POST',
            headers : {
              'Content-Type' : 'application/json',
            },
            body : JSON.stringify(formData),
        });
        const data = await res.json();
        if(data.success === false){
          setError(data.message);
          setLoading(false);
          return ;
        }
        setLoading(false);
        setError(null)
        navigate("/")
    } catch(error){
        setLoading(false),
        setError(error.message)
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
        <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
            <input 
              type='email'
              placeholder='Email'
              className='border  p-3 rounded-lg'
              id='email'
              onChange={handleChange}
            />
            <input 
              type='password'
              placeholder='Password'
              className='border  p-3 rounded-lg'
              id='password'
              onChange={handleChange}
            />
            <button disabled={loading}  className='bg-slate-700 text-white p-3 rounded-xl uppercase hover:opacity-95 disabled:opacity-100'> 
              {loading ? "Loading..." : "Signn In"}
            </button>
        </form>
        <div className='flex gap-2 mt-5'>
          <p>Dont an Account ? </p>
          <Link to="/sign-up">
              <span className='text-blue-700'>Sign up</span>
          </Link>
        </div>
        {error && <p className='text-red-500 mt-5'> {error} </p>}
    </div>
  )
}


export default SignIn;