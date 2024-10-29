import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { PaddlerInfo } from "../types/PaddlerInfo";
import { firestore } from "../utils/firebase";
import { getDoc, doc } from "firebase/firestore";
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const ConfirmAddPaddlers = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const [paddlers, setPaddlers] = useState<Array<PaddlerInfo>>([]);
  const headings = ["Name", "Gender", "Weight", "Side", "Steer?", "Drum?"];

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
      console.log(paddlers);
      return paddlers;
    }
    return [];
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
        <Container
          disableGutters
          sx={{ mt: 5, display: "flex", gap: 2, justifyContent: "end" }}
        >
          <Button variant="outlined" color="error">
            Cancel
          </Button>
          <Button variant="contained" color="success">
            Confirm
          </Button>
        </Container>
      </Box>
    </div>
  );
};

export default ConfirmAddPaddlers;
