import React from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FormControl,
  Input,
  InputLabel,
  Button,
  Typography,
  AppBar,
} from "@mui/material";

const LoginForm = () => {
  //Initilize hooks
  const navigate = useNavigate();
  const [validationError, setError] = useState(false);
  const [errorMessage, setMessage] = useState();

  const username = useRef();
  const password = useRef();

  //Executes when the login button is pressed.
  //Requests a bearer token from the API, and saves it in local storage
  //along with the inputted username and refresh token
  function handleSubmit() {
    requestToken(username.current.value, password.current.value).then(
      ([statusCode, data]) => {
        if (statusCode === 200) {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);
          localStorage.setItem("username", username.current.value);
          console.log(localStorage);
          navigate("../dashboard", { replace: true });
        } else {
          setError(true);
          setMessage(data.error_description);
          console.log(
            `Status ${statusCode}, ${data.error}, ${data.error_description}`
          );
        }
      }
    );
  }

  //Sends a request to /api/v1/token with the inputted username and password
  //Returns the status code and the data in the response
  async function requestToken(user, pass) {
    const reqBody = `grant_type=password&username=${user}&password=${pass}`;
    const response = await fetch(
      "https://mobile-1.moveitcloud.com/api/v1/token",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: reqBody,
      }
    );

    const data = await response.json();
    return [response.status, data];
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AppBar color="primary"> MOVEit Uploader </AppBar>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "50vw",
          minWidth: "20em",
          marginTop: "40vh",
        }}
        id="login"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <FormControl color="primary" required={true}>
          <InputLabel htmlFor="user">User Name</InputLabel>
          <Input
            id="user"
            aria-describedby="username"
            inputRef={username}
            error={validationError}
          />
        </FormControl>
        <FormControl
          color="primary"
          required={true}
          sx={{ marginTop: "0.7em" }}
        >
          <InputLabel htmlFor="pass">Password</InputLabel>
          <Input
            inputProps={{ type: "password" }}
            id="pass"
            aria-describedby="password"
            inputRef={password}
            error={validationError}
          />
        </FormControl>
        <Button variant="contained" type="submit" sx={{ marginTop: "1em" }}>
          Login
        </Button>
        <Typography sx={{ marginTop: "2em", color: "red", fontSize: "0.8em" }}>
          {errorMessage}
        </Typography>
      </form>
    </div>
  );
};

export default LoginForm;
