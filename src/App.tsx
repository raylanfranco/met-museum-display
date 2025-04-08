import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import ObjectPage from "./pages/ObjectPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/object/:id" element={<ObjectPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
