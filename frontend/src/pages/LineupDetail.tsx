import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const LineupDetail = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default LineupDetail;
