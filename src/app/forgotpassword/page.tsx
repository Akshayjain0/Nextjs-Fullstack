"use client";

import axios from "axios";
import { useState , useEffect} from "react";
import { useRouter } from "next/navigation";


export default function ForgotPassword() {
  const router = useRouter()
  const [token, setToken] = useState("");
  // const [verified, setVerified] = useState(false);
  // const [error, setError] = useState(false);

  const [updatePassword, setUpdatePassword] = useState({
    password: "",
    rePassword: "",
  });
  const onUpdate = async () => {
    const res = await axios.post('/api/users/forgotpassword',{password: updatePassword.password, token})
    console.log(res)
    router.push('/login')
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  // useEffect(() => {
  //   if (token.length > 0) {
  //     onUpdate();
  //   }
  // }, [token]);
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='mb-2 text-4xl text-orange-500'>Forgot Password</h1>

      <label htmlFor='password'>New Password</label>
      <input
        className='p-1 mb-2 rounded border border-gray-400 focus:outline-none text-black'
        type='text'
        id='password'
        placeholder='Enter new password'
        value={updatePassword.password}
        onChange={(e) =>
          setUpdatePassword({ ...updatePassword, password: e.target.value })
        }
      />

      <label htmlFor='re-password'>Confirm Password</label>
      <input
        className='p-1 rounded border border-gray-400 focus:outline-none text-black'
        type='password'
        id='re-password'
        placeholder='Confirm password'
        value={updatePassword.rePassword}
        onChange={(e) =>
          setUpdatePassword({ ...updatePassword, rePassword: e.target.value })
        }
      />

      <button
        className='border border-gray-500 rounded-lg py-2 px-4 mt-3 focus:outline-none focus:border-gray-500 hover:bg-orange-500 hover:text-black'
        onClick={onUpdate}
      >
        Update Password
      </button>
    </div>
  );
}
