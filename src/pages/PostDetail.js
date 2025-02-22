import { useParams } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";

function PostDetail() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === parseInt(id));

  if (!post) return <div>Yazı bulunamadı!</div>;

  return (
    <div className="content">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <small>{post.date}</small>
    </div>
  );
}

export default PostDetail;