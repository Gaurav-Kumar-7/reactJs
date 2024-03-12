import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import "../App.css";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../store/authSlice";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import {login as authLogin } from '../store/authSlice'

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(import.meta.env.VITE_APPWRITE_URL);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = () => {
    let emailValid = true;
    let passwordValid = true;

    if (!email) {
      setEmailError("Email is required");
      emailValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email address");
      emailValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      passwordValid = false;
    } else {
      setPasswordError("");
    }

    return emailValid && passwordValid;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) {
      validateForm();
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) {
      validateForm();
    }
  };

  const login = async (data: any) => {
    const user = {
      email: email,
      password: password
    }
    console.log(user)
    if (validateForm()) {
      try {
        const session = await authService.login(user);
        if (session) {
          const userData = await authService.getCurrentUser();
          if (userData) {
            dispatch(authLogin(userData));
            navigate("/landingPage");
            console.log("Email:", email);
            console.log("Password:", password);
            setEmail("");
            setPassword("");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      sessionStorage.setItem("Email:", email);
      sessionStorage.setItem("Password:", password);
      navigate("/landingPage");
      setEmail("");
      setPassword("");
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row wrapper">
          <div className="col-xl-6 col-md-6 left_wrapper">
            <form className="content w-75">
              <h3 style={{ color: "#030303" }}>Login</h3>
              <div className="col-12 pt-3">
                <TextField
                  className="w-100 pb-3"
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={handleEmailChange}
                  error={!!emailError}
                  helperText={emailError}
                  autoComplete="email"
                />
              </div>
              <div className="col-12 pb-3">
                <FormControl variant="outlined" className="w-100">
                  <InputLabel
                    htmlFor="outlined-adornment-password"
                    style={{ color: passwordError ? "#d32f2f" : undefined }}
                  >
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    error={!!passwordError}
                    autoComplete="current-password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                {passwordError && (
                  <FormHelperText
                    style={{ color: "#d32f2f", marginLeft: "15px" }}
                  >
                    {passwordError}
                  </FormHelperText>
                )}
              </div>
              <div className="d-flex justify-content-center">
                <button onClick={login} className="loginBtn">
                  Login In
                </button>
              </div>
            </form>
          </div>
          <div className="col-xl-6 col-md-6 p-0 right_wrapper"></div>
        </div>
      </div>
    </>
  );
}
export default Login;
