"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <div className="flex text-center justify-center">
          {" "}
          <Image src={`/images/logo.png`} alt="" width={100} height={100} />
        </div>
        <h1 className="text-2xl text-center"> Welcome to Tasks Nest</h1>
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        {/* <form className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <div className="my-4 text-center text-gray-500">or</div> */}

        <button
          onClick={() =>
            signIn("google", { callbackUrl: "http://localhost:3000/tasksNest" })
          }
          className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded py-2 hover:bg-gray-100"
        >
          <svg className="w-5 h-5" viewBox="0 0 533.5 544.3">
            <path
              fill="#4285f4"
              d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.2H272v95h146.9c-6.3 34.4-25 63.5-53.2 83v68h85.9c50.2-46.3 79-114.5 79-195.8z"
            />
            <path
              fill="#34a853"
              d="M272 544.3c71.6 0 131.6-23.7 175.5-64.3l-85.9-68c-23.9 16.1-54.6 25.7-89.6 25.7-68.9 0-127.3-46.5-148.2-109.1h-88.3v68.7C108.6 482.4 183.1 544.3 272 544.3z"
            />
            <path
              fill="#fbbc04"
              d="M123.8 328.6c-6.4-19-10-39.2-10-59.9s3.6-40.9 10-59.9v-68.7H35.5C12.6 176.7 0 221.1 0 268.7s12.6 92 35.5 127.3l88.3-68.7z"
            />
            <path
              fill="#ea4335"
              d="M272 107.7c39 0 74 13.4 101.6 39.6l76.2-76.2C403.6 24.5 343.6 0 272 0 183.1 0 108.6 61.9 73.8 149.3l88.3 68.7c20.9-62.6 79.3-109.1 148.2-109.1z"
            />
          </svg>
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  );
}
