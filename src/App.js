import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import Dashboard from "./Dashboard/Dashboard";
import Tours from "./Tours/Tours";
import Blogs from "./Blogs/Blogs";
import Destinations from "./Destinations/Destinations";
import CreateTour from "./CreateTour/CreateTour";
import CreateBlog from "./CreateBlog/CreateBlog";
import CreateDestination from "./CreateDestination/CreateDestination";
import UpdateBlog from "./UpdateBlog/UpdateBlog";
import UpdateTour from "./UpdateTour/UpdateTour";

function App() {
  return (
    <div className={`m-0 p-0 row`}>
      <div className="col-2 p-0" style={{ position: "relative" }}>
        <Navigation />
      </div>
      <div className={`col-10 px-5 py-5`}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/tours/create" element={<CreateTour />} />
            <Route path="/tours/update/:url" element={<UpdateTour />} />
            <Route path="destinations" element={<Destinations />} />
            <Route
              path="/destinations/create"
              element={<CreateDestination />}
            />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/create" element={<CreateBlog />} />
            <Route path="/blogs/update/:url" element={<UpdateBlog />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
