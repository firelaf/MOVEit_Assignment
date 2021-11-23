import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";

const LoginForm = () => {
  let navigate = useNavigate();

  function redirect() {
    navigate("../dashboard", { replace: true });
  }

  const username = useRef();
  const password = useRef();

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
    return data;
  }

  return (
    <div>
      <form
        id="login"
        onSubmit={(event) => {
          event.preventDefault();
          requestToken(username.current.value, password.current.value).then(
            (data) => {
              console.log(data);
            }
          );
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
