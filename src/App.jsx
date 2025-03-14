import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Games from "./views/Games";
import Favourites from "./views/Favourites";
import Header from "./components/Header";

export default function App() {
  return (
    <BrowserRouter basename="/games">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}
