"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisable, setButtonDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log(response);
      router.push('/login')
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);

  return (
    <div className='flex flex-col justify-center items-center min-h-screen py-2'>
      <h1 className='text-3xl '>{loading ? "Processing..." : "Signup"}</h1>
      <label htmlFor='usename' className='mt-4'>
        User Name
      </label>
      <input
        type='text'
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder='username'
        className='text-black border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-gray-600'
        id='username'
      />

      <label htmlFor='email'>Email</label>
      <input
        type='email'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder='email'
        className='text-black border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-gray-600'
        id='email'
      />

      <label htmlFor='password'>Password</label>
      <input
        type='password'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='password'
        className='text-black border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-gray-600'
        id='password'
      />

      <button
        className='border border-gray-500 rounded-lg py-2 px-4 mt-3 focus:outline-none focus:border-gray-500'
        onClick={onSignup}
      >
        {buttonDisable ? "Not Signup" : "Signup"}
      </button>
      <Link href='/login' className='text-xs mt-2'>
        Visit login page
      </Link>
    </div>
  );
}
