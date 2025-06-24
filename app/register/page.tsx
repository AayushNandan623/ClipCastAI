"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    }
    try {
      const res = await axios.post("/api/auth/register", {
        email,
        password,
      });
      if (res.status == 200 && res.data.success) {
        router.push("/login");
      } else {
        console.log(res.data.error);
        alert(res.data.error);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error :", error.response?.data || error.message);
      } else {
        console.error("Unknown error : ", error);
      }
    }
  };
  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></input>
        <button type="submit" className=" hover:cursor-pointer">
          Register
        </button>
      </form>
      <div>
        Already have an account ?
        <a href="/login" className=" hover:cursor-pointer">
          Login
        </a>
      </div>
    </div>
  );
}
export default RegisterPage;
