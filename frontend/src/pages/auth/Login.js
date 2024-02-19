import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { BASE_API } from "../../config";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginRequested, loginSuccessful } from "../../redux/slices/userSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    const request = { 
      email: email,
      password: password,
    };

    try {
      const resp = await axios.post(`${BASE_API}/login`, request);
      
      dispatch(loginRequested())
      if (resp.status === 200) {
        // console.log(resp.data.user.existingUser);
        navigate("/home");
        dispatch(loginSuccessful(resp.data.user.existingUser))
        localStorage.setItem('Auth token', resp.data.token.token)
      }
      if (resp.status === 400) {
        console.log(resp.data.error);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container d-flex justify-content-around align-items-center auth-con gap-3">
      <img
        src="https://media.istockphoto.com/id/1222814583/photo/capsule-clothes-in-beige-and-pink-colors-closeup.jpg?s=612x612&w=0&k=20&c=RR9GuFFqnsqb5Xp2CQFS2WYCEIbJgyFS9bjytWzBSLM="
        alt="Image"
        className="login-image"
      />
      <div className="border rounded main-form-container d-flex flex-column align-items-center p-3">
        <h2>Login</h2>
        <div className="form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                placeholder="name@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: /^\S+@\S+$/i,
                })}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email" className="text-muted">
                Email address
              </label>
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>
            <div className="form-floating">
              <input
                type="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                id="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password" className="text-muted">
                Password
              </label>
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary container-fluid mt-3"
            >
              Submit
            </button>
            <p className="mt-2" style={{ fontSize: "14px" }}>
              Don't have an account?{" "}
              <Link
                to={"/register"}
                className="text-blue text-decoration-none fw-semibold"
              >
                Register
              </Link>
            </p>
            <div className="d-flex justify-content-center align-items-center">
              <div className="border w-100 h-25 mb-3 rounded"></div>
            </div>
            <div className="d-flex justify-content-center gap-3">
              <div
                className="d-flex justify-content-center align-items-center border rounded p-3 w-50"
                role="button"
              >
                <i className="fa-brands fa-google"></i>
              </div>
              <div
                className="d-flex justify-content-center align-items-center border rounded p-3 w-50"
                role="button"
              >
                <i className="fa-brands fa-apple"></i>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
