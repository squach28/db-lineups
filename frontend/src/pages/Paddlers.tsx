import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Paddler } from "../types/Paddler";
import {
  Alert,
  CircularProgress,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Gender } from "../types/Gender";
import { SidePreference } from "../types/SidePreference";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { AuthContext } from "../context/AuthContext";

const Paddlers = () => {
  const [paddlers, setPaddlers] = useState<Array<Paddler>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const headings = [
    "ID",
    "Name",
    "Gender",
    "Weight",
    "Side",
    "Steer?",
    "Drum?",
  ];
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(searchParams.get("add") ? true : false);
  const authContext = useContext(AuthContext);
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    isAdmin().then((res) => {
      setAdmin(res);
    });

    const fetchPaddlers = () => {
      return axios.get(`${import.meta.env.VITE_API_URL}/paddlers`);
    };
    fetchPaddlers()
      .then((res) => {
        const newPaddlers = res.data.paddlers.map(
          (paddler: {
            id: number;
            name: string;
            gender: string;
            weight: number;
            sidePreference: string;
            canSteer: boolean;
            canDrum: boolean;
          }) => {
            return {
              ...paddler,
              gender: parseGender(paddler.gender),
              sidePreference: parseSidePreference(paddler.sidePreference),
            };
          }
        );
        setPaddlers(newPaddlers);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const parseGender = (gender: string) => {
    switch (gender) {
      case "MALE":
        return Gender.MALE;
      case "FEMALE":
        return Gender.FEMALE;
      case "NON_BINARY":
        return Gender.NON_BINARY;
      default:
        throw new Error();
    }
  };

  const isAdmin = async () => {
    if (authContext.user) {
      return authContext.user
        .getIdTokenResult()
        .then((tokenResult) => {
          if (tokenResult.claims.admin) {
            return true;
          } else {
            return false;
          }
        })
        .catch(() => false);
    } else {
      return false;
    }
  };

  const getGenderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.MALE:
        return <MaleIcon />;
      case Gender.FEMALE:
        return <FemaleIcon />;
      case Gender.NON_BINARY:
        return <p>Non-binary</p>;
      default:
        return <p></p>;
    }
  };

  const parseSidePreference = (side: string) => {
    switch (side) {
      case "LEFT":
        return SidePreference.LEFT;
      case "RIGHT":
        return SidePreference.RIGHT;
      case "ANY":
        return SidePreference.ANY;
      default:
        throw new Error();
    }
  };

  const handleSnackbarClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <header>
        <div className="flex justify-between items-center px-2 mt-3">
          <h1 className="text-4xl font-bold text-center">Paddlers</h1>
          {admin ? (
            <Link
              className="bg-blue-600 text-white font-bold p-2 rounded-md hover:cursor-pointer"
              to="/paddlers/add"
            >
              Add Paddler
            </Link>
          ) : null}
        </div>
      </header>
      <main>
        {loading ? <CircularProgress sx={{ marginX: "auto" }} /> : null}
        {!admin ? (
          <Typography sx={{ textAlign: "center", p: 4 }}>
            Admin privileges are required
          </Typography>
        ) : null}
        {paddlers && admin ? (
          <Table>
            <TableHead>
              <TableRow>
                {headings.map((heading, index) => (
                  <TableCell
                    key={heading}
                    align={index > 1 ? "center" : "left"}
                  >
                    {heading}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paddlers.map((paddler) => {
                return (
                  <TableRow
                    hover
                    sx={{ ":hover": { cursor: "pointer" } }}
                    key={paddler.id}
                  >
                    <TableCell>{paddler.id}</TableCell>
                    <TableCell>{paddler.fullName}</TableCell>
                    <TableCell align="center">
                      {getGenderIcon(paddler.gender)}
                    </TableCell>
                    <TableCell align="center">{paddler.weight}</TableCell>
                    <TableCell align="center">
                      {paddler.sidePreference}
                    </TableCell>
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
        ) : null}
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert variant="filled" onClose={handleSnackbarClose}>
            Success!
            {searchParams.get("multiple") !== null &&
            searchParams.get("multiple") === "true"
              ? " Paddlers were added!"
              : " Paddler was added!"}
          </Alert>
        </Snackbar>
      </main>
    </div>
  );
};

export default Paddlers;
