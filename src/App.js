import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import Dashboard from "./Dashboard/Dashboard";
import AllTours from "./AllTours/AllTours";
import AllBlogs from "./AllBlogs/AllBlogs";
import AllDestinations from "./AllDestinations/AllDestinations";
import CreateDestination from "./CreateDestination/CreateDestination";
import TourForm from "./TourForm/TourForm";
import BlogForm from "./BlogForm/BlogForm";

function App() {
  return (
    <BrowserRouter>
      <div className={`m-0 p-0 row`}>
        <div
          className="col-2 p-0"
          style={{ position: "fixed", height: "100vh", width: "16.6667%" }}
        >
          <Navigation />
        </div>
        <div
          className={`col-10 offset-2 px-5 py-5`}
          style={{ marginLeft: "16.6667%" }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tours" element={<AllTours />} />
            <Route path="/tours/create" element={<TourForm />} />
            <Route path="/tours/update/:url" element={<TourForm />} />
            <Route path="destinations" element={<AllDestinations />} />
            <Route
              path="/destinations/create"
              element={<CreateDestination />}
            />
            <Route path="/blogs" element={<AllBlogs />} />
            <Route path="/blogs/create" element={<BlogForm />} />
            <Route path="/blogs/update/:url" element={<BlogForm />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
