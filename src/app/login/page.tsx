"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios'
import Link from "next/link";
import { sendEmail } from "@/helpers/mailer";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisable, setButtonDisable] = useState(false);
  const [loading, setLoading] = useState(false);


  const onLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/users/login', user);
      console.log(response);
      router.push('/profile')
    } catch (error:any) {
      console.log(error.message)
    }finally{
      setLoading(false)
    }
  };


  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0 ){
      setButtonDisable(false)
    }
    else{
      setButtonDisable(true)
    }
  }, [user])
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <h1 className='text-3xl mb-3'>{loading?"Processing...":"Login"}</h1>
      <label htmlFor='email'>Email</label>
      <input
        type='email'
        placeholder='Email'
        id='email'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className='border border-gray-500 focus:outline-none focus:border-gray-500 p-2 text-black rounded-lg'
      />

      <label htmlFor='password'>Password</label>
      <input
        type='password'
        placeholder='password'
        id='password'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className='border border-gray-500 focus:outline-none focus:border-gray-500 p-2 text-black rounded-lg'
      />
      <button className='border border-gray-500 rounded-lg py-2 px-4 mt-3 focus:outline-none focus:border-gray-500' onClick={onLogin}>
        {buttonDisable?"Not Login": "Login"}
      </button>

      <Link href='/forgotpassword' className="text-red-500 underline pt-2 text-sm">Forgot Password</Link>
    </div>
  );
}
