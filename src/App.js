import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import Dashboard from "./Dashboard/Dashboard";
import AllTours from "./AllTours/AllTours";
import AllBlogs from "./AllBlogs/AllBlogs";
import AllDestinations from "./AllDestinations/AllDestinations";
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
            <Route path="/tours" element={<AllTours />} />
            <Route path="/tours/create" element={<CreateTour />} />
            <Route path="/tours/update/:url" element={<UpdateTour />} />
            <Route path="destinations" element={<AllDestinations />} />
            <Route
              path="/destinations/create"
              element={<CreateDestination />}
            />
            <Route path="/blogs" element={<AllBlogs />} />
            <Route path="/blogs/create" element={<CreateBlog />} />
            <Route path="/blogs/update/:url" element={<UpdateBlog />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
