import { Link } from "react-router-dom";

const Navbar = () => {
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
      </ul>
    </nav>
  );
};

export default Navbar;
