import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { blogPosts } from "./data/blogPosts";
import "./App.css";

function App() {
  const [isPostsOpen, setIsPostsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [activePage, setActivePage] = useState("home");

  return (
    <div className="app">
      <Sidebar
        isPostsOpen={isPostsOpen}
        setIsPostsOpen={setIsPostsOpen}
        posts={blogPosts}
        setSelectedPost={setSelectedPost}
        setActivePage={setActivePage}
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
      </div>
    </div>
  );
}

export default App;