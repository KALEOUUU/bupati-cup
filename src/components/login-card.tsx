import React, { useState } from "react";
import axios from "axios";

const CardLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);// Untuk redirect setelah login sukses

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e: React.FormEvent) => {
    const [data, setData] = useState({
      email: "",
      password: ""
    })
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setData({
        ...data,
        [e.target.name]: value
      })
    }
  
    const handleSubmit = async (e: any) => {
      e.preventDefault()
      try {
        const response = await axios.post(`http://localhost:5000/api/v1/auth/login`, data)
        window.location.replace('/dashboard')
      } catch (e: any) {
        alert(e.response.data.message)
      }
    }
  

  return (
    <>
      <div className="w-[320px] lg:w-[480px] h-full border border-red-600 rounded-[12px] shadow-[0_0_5px_0_rgba(255,0,0,0.5)]">
        <div className="py-[36px] px-[16px] md:px-[24px]">
          {/* head login */}
          <div className="mb-[64px]">
            <div className="flex item justify-center">
              <div className="w-[64px] h-[64px] bg-red-600 rounded-[8px] flex justify-center items-center">
                <svg
                  className="w-[24px] h-[24px] text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-center font-bold mt-[20px] text-[24px] text-black">
              Sport Technology Moklet
            </h3>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-[20px]">
              <label htmlFor="username" className="block text-[14px] text-black">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="johndoe"
                className="w-full h-[40px] border border-gray-600 text-black rounded-[8px] px-[12px] mt-[8px]"
                required
              />
            </div>
            <div className="mb-[20px]">
              <label htmlFor="password" className="block text-[14px] text-black">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full h-[40px] border border-gray-600 text-black rounded-[8px] px-[12px] mt-[8px]"
                required
              />
            </div>
            {error && <div className="text-red-500 text-center">{error}</div>}
            <div>
              <button
                type="submit"
                className="w-full h-[40px] bg-red-600 hover:bg-red-400 duration-200 text-white rounded-[8px] font-medium text-[16px]"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
}

export default CardLogin;
