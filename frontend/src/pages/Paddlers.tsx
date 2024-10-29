import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Paddler } from "../types/Paddler";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Gender } from "../types/Gender";
import { SidePreference } from "../types/SidePreference";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

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
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
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

  return (
    <div>
      <header>
        <Navbar />
        <div className="flex justify-between items-center px-2 mt-3">
          <h1 className="text-4xl font-bold text-center">Paddlers</h1>
          <Link
            className="bg-blue-600 text-white font-bold p-2 rounded-md hover:cursor-pointer"
            to="/paddlers/add"
          >
            Add Paddler
          </Link>
        </div>
      </header>
      <main>
        {loading ? <CircularProgress sx={{ marginX: "auto" }} /> : null}
        {paddlers ? (
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
                  <TableRow key={paddler.id}>
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
      </main>
    </div>
  );
};

export default Paddlers;
