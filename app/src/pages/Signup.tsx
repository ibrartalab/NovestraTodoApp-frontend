import { useMemo, useState } from "react";
import Input from "../components/InputField";
import Button from "../components/Button";
// import useFormValidator from "../../../hooks/useFormValidator";
// import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useAuth } from "../hooks/useAuth";
import { type AuthInput,type AuthResponse,signUp as apiSignup } from "../api/authAPI";

const initialState: AuthInput = {
  username: "",
  password: "",
};

const SignUpForm = () => {
  //states
  // const { validateForm, formErrors, isValid } = useFormValidator();
  const { signup } = useAuth();
  const [formData, setFormData] = useState<AuthInput>({
    ...initialState,
  });
  // const [showPassword, setShowPassword] = useState<boolean>(false);
  // const [showConfirmPassword, setShowConfirmPassword] =
  //   useState<boolean>(false);

  //functions
  const handleInputChange = useMemo(() => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      // Validate the input value
      setFormData((prev) => ({ ...prev, [name]: value }));
     
    };
  }, []);

  const handleSignUp = () => {
    // Logic to handle signup
    if (formData.username.trim() === "" || formData.password.trim() === "") {
      alert("Username and password cannot be empty");
      return;
    }
    // Call the signup function from useAuth hook
    signup({ username: formData.username, password: formData.password })

      .then((response) => {
        if (response) {
          console.log("Signup successful:", response);
        }
      }
      )
      .catch((error) => {
        console.error("Signup failed:", error);
        alert("Signup failed. Please check your details.");
      });
      
  };

  return (
    <>
      <div className="auth-signup_form">
        <div className="form_container ">
          <form
            action=""
            className="form_fields "
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="first-name_last-name flex  gap-2">
              <div className="first-name flex flex-col">
                <Input
                  label="First Name"
                  placeholder="Enter your first name"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  styleClass="h-10 w-60 text-black"
                  error={!!formErrors.firstName}
                  errorMessage={formErrors.firstName}
                />
              </div>
              <div className="last-name flex flex-col">
                <Input
                  label="Last Name"
                  placeholder="Enter your last name"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  styleClass="h-10 w-60 text-black"
                  error={!!formErrors.lastName}
                  errorMessage={formErrors.lastName}
                />
              </div>
            </div>
            <div className="email_password_confirm-password  flex flex-col *:w-[490px]">
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                styleClass="h-10 text-black"
                error={!!formErrors.email}
                errorMessage={formErrors.email}
              />

              <Input
                label="Password"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                styleClass="h-10 text-black"
                error={!!formErrors.password}
                errorMessage={formErrors.password}
                icon={
                  showPassword ? (
                    <IoMdEye
                      className="absolute top-8 right-4  "
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <IoMdEyeOff
                      className="absolute top-8 right-4  "
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )
                }
              />

              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                styleClass="h-10 text-black"
                error={!!formErrors.confirmPassword}
                errorMessage={formErrors.confirmPassword}
                icon={
                  showConfirmPassword ? (
                    <IoMdEye
                      className="absolute top-8 right-4  "
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  ) : (
                    <IoMdEyeOff
                      className="absolute top-8 right-4  "
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  )
                }
              />
              <Input
                label="Phone Number"
                placeholder="Enter your phone number"
                type="tel"
                name="phoneNumber"
                length={15}
                styleClass="h-10 w-full text-black"
                onChange={handleInputChange}
                value={formData.phoneNumber}
                error={!!formErrors.phoneNumber}
                errorMessage={formErrors.phoneNumber}
                pattern="^\+?[0-9\s\-()]{10,15}$"
              />
              <Input
                label="Location"
                placeholder="Enter your location"
                type="text"
                name="location"
                styleClass="h-10 w-full text-black"
                onChange={handleInputChange}
                value={formData.location}
                error={!!formErrors.location}
                errorMessage={formErrors.location}
              />

              <Input
                label="Profession"
                placeholder="Enter your profession"
                type="text"
                name="profession"
                styleClass="h-10 w-full text-black"
                onChange={handleInputChange}
                value={formData.profession}
                error={!!formErrors.profession}
                errorMessage={formErrors.profession}
              />

              <Button
                title="Get Started"
                styleClass={`${
                  isValid ? "bg-black hover:bg-black/50" : "bg-black/50"
                } text-white font-semibold h-12 mt-4`}
                disabled={!isValid}
                onClick={handleSignUp}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
