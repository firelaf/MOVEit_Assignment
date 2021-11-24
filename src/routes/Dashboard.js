import React from "react";
import { useRef, useState } from "react";
import { Button, Input, Typography, AppBar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  //Initilize hooks
  const navigate = useNavigate();
  const fileInput = useRef();
  const [errorMessage, setError] = useState();
  const [successMessage, setSuccess] = useState();

  //Handles the upload button press
  //First finds the folder ID to which to upload
  //Then creates a FormData with the inputted file and
  //Finally sends the file to /api/v1/{id}/files
  async function handleUpload() {
    const homeFolderID = await getHomeFolderID();

    const formBody = new FormData();
    formBody.append("file", fileInput.current.files[0]);
    console.log(formBody);

    const response = await fetch(
      `https://mobile-1.moveitcloud.com/api/v1/folders/${homeFolderID}/files`,
      {
        method: "POST",
        withCredentials: true,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: formBody,
      }
    );

    const data = await response.json();

    //Error or Success display
    if (response.status >= 400) {
      setError(`${data.title} : ${data.detail}`);
      setSuccess("");
    } else {
      setError("");
      setSuccess("Upload Successful");
    }
  }

  //Finds the target folder
  //Requests all folders from /api/v1/folders
  //Finds the folder coresponding to the user's username
  //Returns the ID of the found folder
  async function getHomeFolderID() {
    const response = await fetch(
      "https://mobile-1.moveitcloud.com/api/v1/folders",
      {
        method: "GET",
        withCredentials: true,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    const homeFolderID = findHomeID(data.items);
    return homeFolderID;
  }

  //Finds the exact folder with the same name as the username
  function findHomeID(folders) {
    let homeID;
    folders.forEach((item) => {
      if (item.name === localStorage.getItem("username")) {
        homeID = item.id;
      }
    });
    return homeID;
  }

  //Handles the Log Out Button
  //Clears localStorage and redirects back to the login screen
  function logOut() {
    localStorage.clear();
    navigate("../login", { replace: true });
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AppBar
        color="primary"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        MOVEit Uploader
        <Button color="secondary" variant="contained" onClick={logOut}>
          Log Out
        </Button>
      </AppBar>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "50vw",
          minWidth: "20em",
          marginTop: "40vh",
        }}
      >
        <Input
          inputProps={{ type: "file" }}
          inputRef={fileInput}
          sx={{ marginBottom: "1em" }}
        />
        <Button variant="contained" color="secondary" onClick={handleUpload}>
          Upload
        </Button>
        <Typography sx={{ marginTop: "2em", color: "red", fontSize: "0.8em" }}>
          {errorMessage}
        </Typography>
        <Typography
          sx={{ marginTop: "2em", color: "green", fontSize: "0.8em" }}
        >
          {successMessage}
        </Typography>
      </div>
    </div>
  );
};

export default Dashboard;
