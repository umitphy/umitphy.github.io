import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";

function Posts() {
  return (
    <div className="content">
      <h1>Yazılar</h1>
      {blogPosts.map((post) => (
        <div key={post.id} className="post-preview">
          <h2>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </h2>
          <p>{post.summary}</p>
          <small>{post.date}</small>
        </div>
      ))}
    </div>
  );
}

export default Posts;