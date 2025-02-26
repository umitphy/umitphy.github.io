import { useState } from "react";

function Sidebar({ isPostsOpen, setIsPostsOpen, posts, setSelectedPost, setActivePage, movies, setSelectedMovie }) {
  const [activeMenu, setActiveMenu] = useState("home");

  const menuItems = [
    { name: "Home", key: "home" },
    { name: "Posts", key: "posts" },
    { name: "About", key: "about" },
    { name: "Social", key: "social" },
    { name: "Bookmarks", key: "bookmarks" },
    { name: "Movies", key: "movies" },
  ];

  const handleMenuClick = (key) => {
    setActiveMenu(key);
    setActivePage(key);
    if (key === "posts" || key === "movies") {
      setIsPostsOpen(true);
    } else {
      setIsPostsOpen(false);
      setSelectedPost(null);
      setSelectedMovie(null);
    }
  };

  return (
    <div className="sidebar-container">
      <div className="main-menu">
        <h2>Ümit's Blog</h2>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.key}
              onClick={() => handleMenuClick(item.key)}
              className={activeMenu === item.key ? "active" : ""}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      {isPostsOpen && (activeMenu === "posts" || activeMenu === "movies") && (
        <div className="posts-menu">
          <h3>{activeMenu === "posts" ? "Posts" : "Movies"}</h3>
          {activeMenu === "posts" ? (
            <ul>
              {posts.map((post) => (
                <li key={post.id} onClick={() => setSelectedPost(post)}>
                  {post.title}
                </li>
              ))}
            </ul>
          ) : (
            <div className="movies-container">
              {movies.map((movie) => (
                <div key={movie.imdbID} onClick={() => setSelectedMovie(movie)} className="movie-item">
                  <img src={movie.Poster} alt={movie.Title} />
                  <span>{movie.Title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Sidebar;