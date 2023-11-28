"use client";
import axios from "axios";
import { useState } from "react";

export default function ForgotEmail() {
  const [email, setEmail] = useState("");
  const submitEmail = async ()=>{
    axios.post('/api/users/forgotemail',{email})
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-4xl text-orange-500'>Email Verification</h1>
      <p>Enter an email for password reset</p>
      <label htmlFor='email' className='pt-3'></label>
      <input
        type='email'
        placeholder='Enter a valid email'
        className='border border-gray-500 rounded-lg py-2 px-4 mt-3 focus:outline-none focus:border-gray-500 text-black'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className='border border-gray-500 rounded-lg py-2 px-4 mt-3 focus:outline-none focus:border-gray-500' onClick={submitEmail}>
        Submit
      </button>
    </div>
  );
}
