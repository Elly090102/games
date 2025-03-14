import { useState } from "react";

export default function Favourite() {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [selectedGame, setSelectedGame] = useState(null);

  const removeFromFavorites = (title) => {
    const updatedFavorites = favorites.filter((game) => game.title !== title);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setSelectedGame(null);
  };

  return (
<div className="page-container">  <h2 className="title">Your Favorite Games 🎮</h2>

    <div className="game-list">
      {favorites.length > 0 ? (
        favorites.map((game, index) => (
          <div key={index} className="game-item">
            <img src={game.image} alt={game.title} className="game-img" />
            <h3>{game.title}</h3>
            <p><strong>Category:</strong> {game.category}</p>
            <p><strong>Play Time:</strong> {game.playtime}</p>
            <p><strong>Players:</strong> {game.players}</p>
            
            <button className="details-btn" onClick={() => {
              console.log("Opening details for:", game.title); // Debugging
              setSelectedGame(game);
              }}>
              View Details
            </button>

            
            <button className="remove-btn" onClick={() => removeFromFavorites(game.title)}>
              ❌ Remove
            </button>
          </div>
        ))
      ) : (
        <p>No favorite games yet! Add some fun games to your collection. 🎲</p>
      )}
    </div>

    {selectedGame && (
    <div className="modal-overlay" onClick={() => setSelectedGame(null)}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="close-btn" onClick={() => setSelectedGame(null)}>✖</button>
      <img src={selectedGame.image} alt={selectedGame.title} className="modal-image" />
      <h3>{selectedGame.title}</h3>
      <p><strong>Play Time:</strong> {selectedGame.playtime}</p>
      <p><strong>Players:</strong> {selectedGame.players}</p>
      <p><strong>Game Description:</strong> {selectedGame.description}</p>
      <button className="remove-btn" onClick={() => removeFromFavorites(selectedGame.title)}>
        ❌ Remove from Favorites
      </button>
    </div>
  </div>
  )}
    
      
 </div> 
)}
