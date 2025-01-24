import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Heading from "../components/Heading";
import TextInput from "../components/TextInput";
import dotenv from "dotenv";
dotenv.config();

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleClick = () => {
    if (username == process.env.USERNAME && password === process.env.PASSWORD) {
      toast.success("Login Successful");
      localStorage.setItem("isLoggedIn", true);
      navigate("/dashboard");
    } else {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <main className="font-poppins w-screen h-screen bg-gradient-to-br from-violet-600 to-violet-00 flex items-center justify-center">
      <div className="w-5/6 lg:w-[400px] h-fit bg-white rounded-lg p-8 shadow-lg">
        <div className="flex justify-between items-center">
          <div className="">
            <h1 className="text-xl mb-1">Kriya '25 Helpdesk</h1>
            <Heading>Login</Heading>
          </div>
          <img
            src="/assets/Kriya_KLA_Logo_Final.png"
            className="h-20 opacity-50"
            alt="Kriya Logo"
          />
        </div>
        <TextInput
          className="mt-8"
          valueState={[username, setUsername]}
          placeholder="Enter Username"
          title="Username"
        />
        <TextInput
          className="mt-4"
          valueState={[password, setPassword]}
          placeholder="Enter Password"
          title="Password"
          type="password"
        />
        <Button text="Login" className="mt-8" handleClick={handleClick} />
      </div>
    </main>
  );
};

export default Login;
