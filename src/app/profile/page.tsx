"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Profile() {
  const [data, setData] = useState("Nothing...");
  const router = useRouter();
  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      //   console.log(response);
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    setData(res.data.data._id);
  };
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile</h1>
      <p>Profile Page</p>
      <hr />
      <h1 className='bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4'>
        {data === 'Nothing...' ? "Nothing..." : <Link href={`/profile/${data}`}>{data}</Link>}
      </h1>
      <button
        className='bg-blue-500 hover:bg-blue-700 rounded py-2 px-4 mt-2 text-white'
        onClick={logout}
      >
        Logout
      </button>

      <button
        className='bg-red-500 hover:bg-red-700 rounded py-2 px-4 mt-2 text-white'
        onClick={getUserDetails}
      >
        Get Details
      </button>
    </div>
  );
}
