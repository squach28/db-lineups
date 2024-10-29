import {
  Backdrop,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface FileInputProps {
  onFileError: (message: string) => void;
}

const FileInput = (fileInputProps: FileInputProps) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();

    if (e.dataTransfer.files) {
      const file = [...e.dataTransfer.files][0];
      const form = new FormData();
      form.append("paddlers", file);
      setLoading(true);
      uploadFile(form)
        .then(async (res) => {
          navigate(`/paddlers/add/confirm?sessionId=${res.data.sessionId}`);
        })
        .catch((e) => {
          fileInputProps.onFileError(e.response.data.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const uploadFile = async (form: FormData) => {
    return axios.post(
      `${import.meta.env.VITE_API_URL}/paddlers/multiple`,
      form
    );
  };

  return (
    <Container
      sx={{
        width: "50%",
        background: "white",
        border: "1px solid rgba(0,0,0,0.5)",
        boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.5)",
        borderRadius: "10px;",
        padding: "1em",
      }}
    >
      {loading ? (
        <Backdrop open={loading}>
          <CircularProgress sx={{ color: "white" }} />
        </Backdrop>
      ) : null}
      <label
        className="w-full h-full flex flex-col gap-2 items-center"
        htmlFor="uploadFile"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <UploadFileIcon />
        <Typography sx={{ textAlign: "center" }}>
          Drag & drop or click to upload a file
        </Typography>

        <input
          id="uploadFile"
          type="file"
          hidden={true}
          accept=".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        />
      </label>
    </Container>
  );
};

export default FileInput;
