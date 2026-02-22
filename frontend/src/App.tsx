import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import CreatePage from "./pages/CreatePage"
import DetailsPage from "./pages/DetailsPage"


const App = () => {
  return <div data-theme="relative h-full w-full">
    <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/note-create" element={<CreatePage />} />
      <Route path="/note-details/:id" element={<DetailsPage />} />
    </Routes>
  </div>
}

export default App