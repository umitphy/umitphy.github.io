import { useState } from "react";

function Sidebar({ isPostsOpen, setIsPostsOpen, posts, setSelectedPost, setActivePage }) {
  const [activeMenu, setActiveMenu] = useState("home");

  const menuItems = [
    { name: "Home", key: "home" },
    { name: "Posts", key: "posts" },
    { name: "About", key: "about" },
    { name: "Social", key: "social" }, // Yeni sosyal medya seçeneği
  ];

  const handleMenuClick = (key) => {
    setActiveMenu(key);
    setActivePage(key);
    if (key === "posts") {
      setIsPostsOpen(true); // Yazılar menüsü açılır
    } else {
      setIsPostsOpen(false); // Diğerlerinde kapanır
      setSelectedPost(null); // Yazı seçimini sıfırla
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
      {isPostsOpen && (
        <div className="posts-menu">
          <h3>Posts</h3>
          <ul>
            {posts.map((post) => (
              <li
                key={post.id}
                onClick={() => setSelectedPost(post)}
              >
                {post.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sidebar;