import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        {children}
      </main>
    </>
  );
};

export default Layout;
