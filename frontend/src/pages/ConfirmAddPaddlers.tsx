import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import React, { useEffect, useState } from "react";
import { PaddlerInfo } from "../types/PaddlerInfo";
import { firestore } from "../utils/firebase";
import { getDoc, doc } from "firebase/firestore";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const ConfirmAddPaddlers = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const [paddlers, setPaddlers] = useState<Array<PaddlerInfo>>([]);
  const headings = ["Name", "Gender", "Weight", "Side", "Steer?", "Drum?"];
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getPaddlersFromSessionId().then((paddlersFromDoc) =>
      setPaddlers(paddlersFromDoc)
    );
  }, []);

  const getPaddlersFromSessionId = async () => {
    if (sessionId !== null) {
      const docRef = doc(firestore, "paddler_sessions", sessionId);
      const docSnap = await getDoc(docRef);
      const paddlers = docSnap.get("paddlers");
      return paddlers;
    }
    return [];
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate("/paddlers/add", { replace: true });
  };

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (sessionId !== null) {
      setLoading(true);
      confirmAddPaddlersBySessionId(sessionId)
        .then((res) => {
          if (res.status === 201) {
            navigate("/paddlers?add=success");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const confirmAddPaddlersBySessionId = async (sessionId: string) => {
    return axios.post(`${import.meta.env.VITE_API_URL}/paddlers/confirm`, {
      sessionId,
    });
  };

  return (
    <div>
      <Navbar />
      <Box sx={{ p: 2 }}>
        <Typography variant="h4">Confirm Paddlers</Typography>
        <Table>
          <TableHead>
            <TableRow>
              {headings.map((heading, index) => (
                <TableCell key={heading} align={index >= 1 ? "center" : "left"}>
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paddlers.map((paddler) => {
              return (
                <TableRow key={paddler.fullName}>
                  <TableCell>{paddler.fullName}</TableCell>
                  <TableCell align="center">{paddler.gender}</TableCell>
                  <TableCell align="center">{paddler.weight}</TableCell>
                  <TableCell align="center">{paddler.sidePreference}</TableCell>
                  <TableCell align="center">
                    {paddler.canSteer ? <CheckIcon /> : <CloseIcon />}
                  </TableCell>
                  <TableCell align="center">
                    {paddler.canDrum ? <CheckIcon /> : <CloseIcon />}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Box
          sx={{
            width: "100%",
            mt: 5,
            display: "flex",
            gap: 2,
            justifyContent: "end",
          }}
        >
          <Button
            variant="outlined"
            color="error"
            disabled={loading}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            disabled={loading}
            onClick={handleConfirm}
          >
            {loading ? (
              <Typography>Loading...</Typography>
            ) : (
              <Typography>Confirm</Typography>
            )}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default ConfirmAddPaddlers;
