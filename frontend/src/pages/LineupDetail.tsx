import { useParams } from "react-router-dom";
import { Box, List, ListItem, Typography } from "@mui/material";
import Boat from "../components/Boat";
import { useEffect, useState } from "react";
import axios from "axios";
import { Paddler } from "../types/Paddler";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import { Gender } from "../types/Gender";
import { Lineup } from "../types/Lineup";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../utils/firebase";

const LineupDetail = () => {
  const { id } = useParams();
  const [paddlers, setPaddlers] = useState<Array<Paddler>>([]);
  const [lineup, setLineup] = useState<Lineup | null>(null);
  useEffect(() => {
    fetchPaddlers().then((res) => setPaddlers(res.data.paddlers));
    fetchLineup(id as string).then((res) => setLineup(res as Lineup));
  }, []);

  const fetchPaddlers = () => {
    return axios.get(`${import.meta.env.VITE_API_URL}/paddlers`);
  };

  const fetchLineup = async (id: string) => {
    const lineupDoc = doc(firestore, "lineups", id);
    const docSnap = await getDoc(lineupDoc);
    return docSnap.data();
  };

  const renderGenderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.MALE:
        return <ManIcon />;
      case Gender.FEMALE:
        return <WomanIcon />;
      case Gender.NON_BINARY:
        return <Typography>NB</Typography>;
      default:
        throw new Error();
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    console.log(e.currentTarget.id);
    console.log(paddlers);
    const paddler = paddlers.find(
      (paddler) => parseInt(paddler.id) === parseInt(e.currentTarget.id)
    );

    console.log(paddler);
    e.dataTransfer.setData("message", JSON.stringify(paddler));
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <List>
          {paddlers.map((paddler) => (
            <ListItem key={paddler.id}>
              <Box
                id={paddler.id}
                sx={{
                  display: "flex",
                  gap: 2,
                  border: "1px solid black",
                  p: 2,
                  ":hover": "pointer",
                }}
                draggable={true}
                onDragStart={(e: React.DragEvent<HTMLDivElement>) => {
                  handleDragStart(e);
                }}
              >
                <Typography>{paddler.fullName}</Typography>
                {renderGenderIcon(paddler.gender)}
              </Box>
            </ListItem>
          ))}
        </List>
        <Box>
          {lineup ? (
            <Box>
              <Typography>{lineup.name}</Typography>
              <Boat
                name={lineup.name}
                lefts={lineup.lefts}
                rights={lineup.rights}
              />
            </Box>
          ) : null}
        </Box>
      </Box>
    </div>
  );
};

export default LineupDetail;
