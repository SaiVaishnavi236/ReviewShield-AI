import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import AnalyzeReview from "./pages/AnalyzeReview";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>

      {/* ONE NAVBAR FOR THE ENTIRE APPLICATION */}
      <Navbar />

      <main>
        <Routes>

          <Route
            path="/"
            element={<Landing />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/analyze"
            element={<AnalyzeReview />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />

          <Route
            path="/reports"
            element={<Reports />}
          />

          <Route
            path="/about"
            element={<About />}
          />

        </Routes>
      </main>

      {/* ONE FOOTER FOR THE ENTIRE APPLICATION */}
      <Footer />

    </BrowserRouter>
  );
}

export default App;