import { useState } from "react";
import LandingClearity from "./LandingClearity.jsx";
import DemoPage from "./DemoPage.jsx";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  if (currentPage === "demo") {
    return <DemoPage onBack={() => setCurrentPage("home")} />;
  }

  return <LandingClearity onDemo={() => setCurrentPage("demo")} />;
}
