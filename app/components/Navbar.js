import Link from 'next/link';

const Navbar = () => {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#1a1a2e', color: 'white', display: 'flex', justifyContent: 'space-around' }}>
      <Link href="/about">About</Link>
      <Link href="/education">Education</Link>
      <Link href="/social-media">Social Media</Link>
      <Link href="/favorites">My Favorites</Link>
      <Link href="/blog">Blog</Link>
    </nav>
  );
};

export default Navbar;
