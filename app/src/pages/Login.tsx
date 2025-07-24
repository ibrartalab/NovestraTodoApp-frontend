import React, { useMemo, useState } from "react";
import Input from "../components/InputField";
import Button from "../components/Button";
import { Link } from "react-router";
// import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useAuth } from "../hooks/useAuth";

interface LoginFormProps {
  username: string;
  password: string;
}
const initialValues: LoginFormProps = {
  username: "",
  password: "",
};

const LoginForm = () => {
  const [formData, setFormData] = useState<LoginFormProps>({
    ...initialValues,
  });

  // const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleInputChange = useMemo(() => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      // Validate the input value
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  }, []);

  // const togglePasswordVisibility = () => {
  //   setShowPassword((prev) => !prev);
  // };

  const handleLogin = () => {
    // Logic to handle login
    if (formData.username.trim() === "" || formData.password.trim() === "") {
      alert("Username and password cannot be empty");
      return;
    }
    // Call the login function from useAuth hook
    login({ username: formData.username, password: formData.password })
      .then((response) => {
        if (response) {
          console.log("Login successful:", response);
        }
        if( response === null) {
          window.location.href = "/signup";
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
        alert("Login failed. Please check your credentials.");
      });
  };

  return (
    <div className="auth-login_form *:w-80 bg-white rounded-lg flex justify-center items-center mt-40">
      <form action="" className="*:w-full" onSubmit={(e) => e.preventDefault()}>
        <Input
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          styleClass="h-10 text-black"
        />

        <Input
          label="Password"
          type="text"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          styleClass="h-10 text-black"
        />

        <Button
          title="Login"
          styleClass={`text-white font-semibold h-12 mt-4 bg-indigo-600 hover:bg-indigo-400 w-full rounded-md`}
          disabled={false}
          onClick={handleLogin}
        />

        <p className="text-sm mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className=" underline text-indigo-600">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
