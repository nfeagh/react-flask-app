import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Demo from "./demo/Demo";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </>
  );
}

export default App;
