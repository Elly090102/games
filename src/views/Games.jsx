import { useState } from "react";

export default function Games() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [selectedGame, setSelectedGame] = useState(null);
  const [saveMessage, setSaveMessage] = useState(""); // State to show save confirmation

  const games = [
    {
      id: 1,
      title: "Exploding Kittens",
      category: "Party",
      image: "images/kittens.png",
      playtime: "30 minutes",
      players: "2-5",
      description: "A strategic, fast-paced card game where players try to avoid drawing an Exploding Kitten and use various cards to manipulate the deck and their opponents."
    },
    {
      id: 2,
      title: "Cards Against Humanity",
      category: "Party",
      image: "images/cards.png",
      playtime: "1 hour",
      players: "4-20",
      description: "A hilarious and sometimes outrageous party game where players complete fill-in-the-blank statements using the most inappropriate or funny words they can."
    },
    {
      id: 3,
      title: "Catan",
      category: "Strategy",
      image: "images/catan.png",
      playtime: "60-90 minutes",
      players: "3-4",
      description: "A competitive resource-management board game where players build settlements and roads while trading and strategizing to dominate the island of Catan."
    },
    {
      id: 4,
      title: "Ludo",
      category: "Classic",
      image: "images/ludo.png",
      playtime: "90 minutes",
      players: "2-4",
      description: "A classic board game where players race to get their pieces home while strategically blocking their opponents."
    },
    {
      id: 5,
      title: "Monopoly",
      category: "Strategy",
      image: "images/monopoly.png",
      playtime: "1-101 hours",
      players: "2-8",
      description: "A high-stakes game of real estate and negotiation where players buy, trade, and develop properties to bankrupt their opponents."
    },
    {
      id: 6,
      title: "Taboo",
      category: "Party",
      image: "images/taboo.png",
      playtime: "20-90 minutes",
      players: "4-10",
      description: "A word-guessing game where players give clues to teammates without using forbidden words listed on the card."
    },
    {
      id: 7,
      title: "Game of Thrones: The Board Game",
      category: "Strategy",
      image: "images/thrones.png",
      playtime: "120-240 minutes",
      players: "3-6",
      description: "A complex game of political strategy and military conquest based on the hit TV series, where players battle for control of Westeros."
    },
    {
      id: 8,
      title: "Uno",
      category: "Cards",
      image: "images/uno.png",
      playtime: "30-40 minutes",
      players: "2-10",
      description: "A fast-paced card game where players match numbers or colors while using action cards to disrupt opponents."
    }
  ];

  const filteredGames = games.filter(
    (game) =>
      (category === "All" || game.category === category) &&
      game.title.toLowerCase().includes(search.toLowerCase())
  );

  const saveToFavorites = (game) => {
    if (favorites.some((fav) => fav.title === game.title)) {
      setSaveMessage(`"${game.title}" is already in favorites! ❤️`);
      setTimeout(() => setSaveMessage(""), 2000);
      return;
    }
    const updatedFavorites = [...favorites, { ...game }];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setSaveMessage(`"${game.title}" added to favorites! ✅`);
    setTimeout(() => setSaveMessage(""), 2000);
  };

  // Function to open the modal
  const openGameDetails = (game) => {
    console.log("Opening details for:", game.title);
    setSelectedGame(game);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedGame(null);
  };

  return (
    <section className="games">
      <h2>Board & Card Games Collection</h2>

      {/* Search and Category Filter */}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search for games..."
          className="search-bar"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="category-filter" onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Party">Party</option>
          <option value="Strategy">Strategy</option>
          <option value="Classic">Classic</option>
          <option value="Cards">Card Games</option>
        </select>
      </div>

      {/* Save Message */}
      {saveMessage && <div className="save-message">{saveMessage}</div>}

      {/* Game List */}
      <div className="game-list">
        {filteredGames.map((game) => (
          <div key={game.id} className="game-item">
            <img src={game.image} alt={game.title} className="game-img" />
            <h3>{game.title}</h3>
            <p><strong>Play Time:</strong> {game.playtime}</p>
            <p><strong>Players:</strong> {game.players}</p>
            <button className="details-btn" onClick={() => openGameDetails(game)}>
              View Details
            </button>
            <button className="save-btn" onClick={() => saveToFavorites(game)}>
              ⭐ Save to Favorites
            </button>
          </div>
        ))}
      </div>

      {/* Pop-up Modal */}
      {selectedGame && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>✖</button>
            <img src={selectedGame.image} alt={selectedGame.title} className="modal-img" />
            <h3>{selectedGame.title}</h3>
            <p><strong>Play Time:</strong> {selectedGame.playtime}</p>
            <p><strong>Players:</strong> {selectedGame.players}</p>
            <p><strong>Game Description:</strong> {selectedGame.description}</p>
            <button className="save-btn" onClick={() => saveToFavorites(selectedGame)}>
              ⭐ Save to Favorites
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
