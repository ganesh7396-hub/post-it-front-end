import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../src/components/Login";
import Post from "../src/components/Post";
import AddPost from "../src/components/AddPost";
import EditPost from "../src/components/EditPost";
import NavBar from "../src/components/NavBar";

import "./App.css";
import LandingPage from "./components/LandingPage";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<LandingPage setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/post" element={<Post  user={user} />} />
        <Route path="/addPost" element={<AddPost />} />
        <Route path="/editPost" element={<EditPost />} />
      </Routes>
    </Router>
  );
}

export default App;
