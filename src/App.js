import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import { blogPosts } from "./data/blogPosts";
import axios from "axios";
import "./App.css";

function App() {
  const [isPostsOpen, setIsPostsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [activePage, setActivePage] = useState("home");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const bookmarks = [
    { id: 1, title: "React Docs", url: "https://reactjs.org", thumbnail: "https://reactjs.org/logo-og.png" },
    { id: 2, title: "FreeCodeCamp", url: "https://www.freecodecamp.org", thumbnail: "https://www.freecodecamp.org/icons/icon-512x512.png" },
    { id: 3, title: "MDN Web Docs", url: "https://developer.mozilla.org", thumbnail: "https://developer.mozilla.org/static/img/favicon144.png" },
  ];

  useEffect(() => {
    if (activePage === "movies") {
      axios
        .get("https://www.omdbapi.com/?s=star&apikey=263d22d8")
        .then((response) => {
          if (response.data.Search) {
            setMovies(response.data.Search);
          }
        })
        .catch((error) => console.error("Error fetching movies:", error));
    }
  }, [activePage]);

  return (
    <div className="app">
      <Sidebar
        isPostsOpen={isPostsOpen}
        setIsPostsOpen={setIsPostsOpen}
        posts={blogPosts}
        setSelectedPost={setSelectedPost}
        setActivePage={setActivePage}
        movies={movies}
        setSelectedMovie={setSelectedMovie}
      />
      <div className="main-content">
        {activePage === "home" && (
          <div className="welcome">
            <h1>Welcome!</h1>
            <p>Select an option from the menu on the left.</p>
          </div>
        )}
        {activePage === "posts" && selectedPost && (
          <div className="post-detail">
            <h1>{selectedPost.title}</h1>
            <p>{selectedPost.content}</p>
            <small>{selectedPost.date}</small>
          </div>
        )}
        {activePage === "about" && (
          <div className="about">
            <h1>About Me</h1>
            <p>Hi, I'm Ümit! This is my personal blog where I share my thoughts and projects.</p>
          </div>
        )}
        {activePage === "social" && (
          <div className="social">
            <h1>Social Media</h1>
            <div className="social-links">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-x-twitter"></i> X
              </a>
              <a href="https://github.com/umitphy" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i> GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i> LinkedIn
              </a>
            </div>
          </div>
        )}
        {activePage === "bookmarks" && (
          <div className="bookmarks">
            <h1>Bookmarks</h1>
            <div className="grid-container">
              {bookmarks.map((bookmark) => (
                <a key={bookmark.id} href={bookmark.url} target="_blank" rel="noopener noreferrer" className="grid-item">
                  <img src={bookmark.thumbnail} alt={bookmark.title} />
                  <span>{bookmark.title}</span>
                </a>
              ))}
            </div>
          </div>
        )}
        {activePage === "movies" && selectedMovie && (
          <div className="post-detail">
            <h1>{selectedMovie.Title}</h1>
            <p>{selectedMovie.Plot || "No plot available."}</p>
            <small>Released: {selectedMovie.Year}</small>
            {selectedMovie.Poster && (
              <img src={selectedMovie.Poster} alt={selectedMovie.Title} style={{ maxWidth: "200px" }} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;