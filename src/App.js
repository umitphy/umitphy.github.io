import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Switch yerine Routes
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import About from "./pages/About";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Routes> {/* Switch yerine Routes */}
            <Route path="/" element={<Home />} /> {/* component yerine element */}
            <Route path="/posts" element={<Posts />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;