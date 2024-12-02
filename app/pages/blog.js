import { useState } from 'react';
import Layout from '../components/Layout';
import Modal from '../components/Modal';

const Blog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const posts = [
    { id: 1, title: 'My First Blog Post', content: 'This is the content of the first blog post.' },
    { id: 2, title: 'Another Blog Post', content: 'This is the content of another blog post.' },
  ];

  const openModal = (post) => {
    setSelectedPost(post);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedPost(null);
  };

  return (
    <Layout>
      <h1>Blog</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id} style={{ cursor: 'pointer' }} onClick={() => openModal(post)}>
            {post.title}
          </li>
        ))}
      </ul>
      <Modal isOpen={isOpen} onClose={closeModal}>
        {selectedPost && (
          <>
            <h2>{selectedPost.title}</h2>
            <p>{selectedPost.content}</p>
          </>
        )}
      </Modal>
    </Layout>
  );
};

export default Blog;
