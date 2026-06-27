import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import { toast } from "react-hot-toast";
import "./index.css";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div data-theme="forest">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/notes/:id" element={<NoteDetailPage />} />
      </Routes>
      {/* <h1>Welcome to the MERN Stack App</h1> */}
    </div>
  );
};

export default App;