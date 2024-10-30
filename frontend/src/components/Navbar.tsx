import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { Button, Drawer, List, ListItem, Typography } from "@mui/material";
import { User } from "firebase/auth";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const authContext = useContext(AuthContext);

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const renderPaddlersTab = () => {
    if (authContext.user) {
      authContext.user
        .getIdTokenResult()
        .then((tokenResult) => {
          if (tokenResult.claims.admin) {
            return (
              <Link className="hover:cursor-pointer" to="/paddlers">
                Lineups
              </Link>
            );
          } else {
            return null;
          }
        })
        .catch(() => null);
    } else {
      return null;
    }
  };

  return (
    <nav className="w-full bg-gray-200 text-black text-lg p-2">
      <ul className="flex gap-3">
        <li>
          <Link className="hover:cursor-pointer" to="/">
            Home
          </Link>
        </li>
        <li>{renderPaddlersTab()}</li>
        <li>
          <Link className="hover:cursor-pointer" to="/lineups">
            Lineups
          </Link>
        </li>
        <li className="ml-auto">
          {authContext.loading ? null : authContext.user ? (
            <SentimentSatisfiedAltIcon
              onClick={toggleOpen}
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
      {authContext.user !== null ? (
        <DrawerList
          open={open}
          toggleOpen={toggleOpen}
          user={authContext.user}
        />
      ) : null}
    </nav>
  );
};

const DrawerList = ({
  open,
  toggleOpen,
  user,
}: {
  open: boolean;
  toggleOpen: () => void;
  user: User | null;
}) => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    authContext.logOut();
    navigate("/", { replace: true });
  };
  return (
    <Drawer open={open} onClose={toggleOpen} anchor="right">
      <List>
        <ListItem>
          {user ? (
            <Typography variant="subtitle1">{user.email}</Typography>
          ) : null}
        </ListItem>
        <ListItem>
          <Button
            variant="contained"
            color="error"
            sx={{ ml: "auto" }}
            onClick={handleLogOut}
          >
            Log out
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Navbar;
