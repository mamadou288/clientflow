import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Companies from "./pages/Companies";
import Contacts from "./pages/Contacts";
import Deals from "./pages/Deals";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/companies" element={<Companies />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/deals" element={<Deals />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
