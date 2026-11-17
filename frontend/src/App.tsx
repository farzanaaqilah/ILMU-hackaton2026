
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainHome from "./pages/MainHome";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
