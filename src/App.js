import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import BlogForm from "./pages/BlogForm/BlogForm";
import PageLayout from "./layout/PageLayout/PageLayout";

// Tours
import AllTours from "./pages/AllTours/AllTours";
import ReadTour from "./pages/ReadTour/ReadTour";
import CreateTour from "./pages/CreateTour/CreateTour";
import UpdateTour from "./pages/UpdateTour/UpdateTour";

// Destinations
import AllDestinations from "./pages/AllDestinations/AllDestinations";
import ReadDestination from "./pages/ReadDestination/ReadDestination";
import CreateDestination from "./pages/CreateDestination/CreateDestination";
import UpdateDestination from "./pages/UpdateDestination/UpdateDestination";

// Blogs
import AllBlogs from "./pages/AllBlogs/AllBlogs";
import ReadBlog from "./pages/ReadBlog/ReadBlog";
import CreateBlog from "./pages/CreateBlog/CreateBlog";

function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tours" element={<AllTours />} />
          <Route path="/tours/:url" element={<ReadTour />} />
          <Route path="/tours/create" element={<CreateTour />} />
          <Route path="/tours/update/:url" element={<UpdateTour />} />
          <Route path="/destinations" element={<AllDestinations />} />
          <Route path="/destinations/:url" element={<ReadDestination />} />
          <Route path="/destinations/create" element={<CreateDestination />} />
          <Route
            path="/destinations/update/:url"
            element={<UpdateDestination />}
          />
          <Route path="/blogs" element={<AllBlogs />} />
          <Route path="/blogs/:url" element={<ReadBlog />} />
          <Route path="/blogs/create" element={<CreateBlog />} />
          <Route path="/blogs/update/:url" element={<BlogForm />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}

export default App;
