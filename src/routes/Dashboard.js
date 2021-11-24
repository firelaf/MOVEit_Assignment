import React from "react";
import { useRef } from "react";
import { Button, Input } from "@mui/material";

const Dashboard = () => {
  const fileInput = useRef();

  async function handleUpload() {
    const homeFolderID = await getHomeFolderID();
    console.log(homeFolderID);

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
    const data = await response.text();
    console.log(data);
  }

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
    console.log(data.items);

    const homeFolderID = findHomeID(data.items);
    return homeFolderID;
  }

  function findHomeID(folders) {
    let homeID;
    folders.forEach((item) => {
      if (item.name === localStorage.getItem("username")) {
        homeID = item.id;
      }
    });
    return homeID;
  }

  return (
    <div>
      <Input inputProps={{ type: "file" }} inputRef={fileInput} />
      <Button variant="contained" color="secondary" onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
};

export default Dashboard;
