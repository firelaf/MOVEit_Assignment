import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { FormControl, Input, InputLabel, Button } from "@mui/material";

const LoginForm = () => {
  let navigate = useNavigate();

  function redirect() {
    navigate("../dashboard", { replace: true });
  }

  const username = useRef();
  const password = useRef();

  function handleSubmit() {
    requestToken(username.current.value, password.current.value).then(
      ([statusCode, data]) => {
        if (statusCode === 200) {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);
          localStorage.setItem("username", username.current.value);
          console.log(localStorage);
          navigate("../dashboard", { replace: true });
        } else
          console.log(
            `Status ${statusCode}, ${data.error}, ${data.error_description}`
          );
      }
    );
  }

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
    console.log(user, pass);

    const data = await response.json();
    console.log(response);
    return [response.status, data];
  }

  return (
    <div>
      <form
        id="login"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <FormControl color="primary" required={true}>
          <InputLabel htmlFor="user">User Name</InputLabel>
          <Input id="user" aria-describedby="username" inputRef={username} />
        </FormControl>
        <FormControl color="primary" required={true}>
          <InputLabel htmlFor="pass">Password</InputLabel>
          <Input id="pass" aria-describedby="password" inputRef={password} />
        </FormControl>
        <Button type="submit">Login</Button>
      </form>
      <Button onClick={redirect}>Dashboard</Button>
    </div>
  );
};

export default LoginForm;
