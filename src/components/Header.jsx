import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/games">Games</Link>
        <Link to="/favourites">Favourites</Link>
      </nav>
    </header>
  );
}
