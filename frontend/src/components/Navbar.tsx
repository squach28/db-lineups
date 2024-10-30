import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

const Navbar = () => {
  const authContext = useContext(AuthContext);

  console.log(authContext);
  return (
    <nav className="w-full bg-gray-200 text-black text-lg p-2">
      <ul className="flex gap-4">
        <li>
          <Link className="hover:cursor-pointer" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="hover:cursor-pointer" to="/paddlers">
            Paddlers
          </Link>
        </li>
        <li>
          <Link className="hover:cursor-pointer" to="/lineups">
            Lineups
          </Link>
        </li>
        <li className="ml-auto">
          {authContext.loading ? null : authContext.user ? (
            <SentimentSatisfiedAltIcon
              sx={{
                ":hover": {
                  cursor: "pointer",
                },
              }}
            />
          ) : (
            <Link className="hover:cursor-pointer" to="/login">
              Log in
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
