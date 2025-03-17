// IMPORTS
// react router for nav
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// home page
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* home page route */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
