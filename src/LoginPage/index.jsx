import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import styled from "styled-components";
import apiClient from "../apiClient";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { AuthContext } from "../authContext";

const Container = styled.div`
  height: 100vh;

  @keyframes fade {
    to {
      opacity: 1;
      left: 0;
    }
  }

  h1 {
    text-align: center;
    font-size: 66px;
  }
  .lady-image {
    display: none;

    img {
      opacity: 0;
      position: relative;
      left: -100vw;
      animation: fade 1000ms ease-in forwards;
    }
  }

  .loginForm {
    display: grid;
    align-items: center;
    /* height: 100%; */
    justify-content: center;
    padding: 10px;
  }

  @media screen and (min-width: 766px) {
    .lady-image {
      display: grid;
      align-items: center;
    }
    input {
      font-size: 32px;
    }
    .mainContainer {
      display: grid;
      grid-template-columns: 60% 40%;
    }
  }
`;

const LoginPage = () => {
  const [data, setData] = useState({});

  const { auth, setAuth } = useContext(AuthContext);

  const history = useHistory();

  const onloginStudent = () => {
    setAuth({ username: data.username });
    // apiClient
    //   .post("/login", {
    //     username: data.username,
    //     password: data.password,
    //     email: "",
    //   })
    //   .then((res) => res.data)
    //   .then((data) => {
    //     localStorage.setItem("token", data.token);
    //     history.push("/student/slotrequest");
    //   });

    history.push("/student/request");
  };

  const onloginStaff = () => {
    setAuth({ username: data.username });
    // apiClient
    //   .post("/login", {
    //     username: data.username,
    //     password: data.password,
    //     email: "",
    //   })
    //   .then((res) => res.data)
    //   .then((data) => {
    //     localStorage.setItem("token", data.token);
    //     history.push("/staff/slots");
    //   });

    history.push("/staff/slots");
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Container className="login-container pageContainer">
      <h1>VIMAN</h1>
      <br></br>
      <br></br>
      <div className="mainContainer">
        <div className="lady-image pageContainer">
          <img
            src={`${process.env.PUBLIC_URL}/lady-1.svg`}
            alt="Lady"
            width={"100%"}
          />
        </div>
        <div className="loginForm">
          <div>
            <input
              name="username"
              className="email-input"
              placeholder="Reg No / Employee Id"
              onChange={onChange}
            />
            <input
              name="password"
              className="password-input"
              placeholder="Password"
              type="password"
              onChange={onChange}
            />
            <div>
              <button
                type="submit"
                className="login-button"
                onClick={onloginStudent}
                style={{ marginRight: 20 }}
              >
                Login as student
              </button>
              <button
                type="submit"
                className="login-button"
                onClick={onloginStaff}
              >
                Login as staff
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
