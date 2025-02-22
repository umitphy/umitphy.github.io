function Posts({ posts, setSelectedPost }) {
    return (
      <div className="posts">
        <h1>Yazılar</h1>
        {posts.map((post) => (
          <div
            key={post.id}
            className="post-preview"
            onClick={() => setSelectedPost(post)}
          >
            <h2>{post.title}</h2>
            <p>{post.summary}</p>
            <small>{post.date}</small>
          </div>
        ))}
      </div>
    );
  }
  
  export default Posts;