import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import PageLayout from "./layout/PageLayout/PageLayout";

// Tours
import AllTours from "./features/tours/AllTours/AllTours";
import ReadTour from "./features/tours/ReadTour/ReadTour";
import CreateTour from "./features/tours/CreateTour/CreateTour";
import UpdateTour from "./features/tours/UpdateTour/UpdateTour";

// Destinations
import AllDestinations from "./features/destinations/AllDestinations/AllDestinations";
import ReadDestination from "./features/destinations/ReadDestination/ReadDestination";
import CreateDestination from "./features/destinations/CreateDestination/CreateDestination";
import UpdateDestination from "./features/destinations/UpdateDestination/UpdateDestination";

// Blogs
import AllBlogs from "./features/blogs/AllBlogs/AllBlogs";
import ReadBlog from "./features/blogs/ReadBlog/ReadBlog";
import CreateBlog from "./features/blogs/CreateBlog/CreateBlog";
import UpdateBlog from "./features/blogs/UpdateBlog/UpdateBlog";

// User
import UserProvider from "./context/userContext";
import Login from "./features/users/Login/Login";
import PrivateRoutes from "./features/users/PrivateRoutes/PrivateRoutes";
import AllUsers from "./features/users/AllUsers/AllUsers";
import ReadUser from "./features/users/ReadUser/ReadUser";
import CreateUser from "./features/users/CreateUser/CreateUser";
import UpdateUser from "./features/users/UpdateUser/UpdateUser";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <PageLayout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="*"
              element={
                <PrivateRoutes>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/tours" element={<AllTours />} />
                    <Route path="/tours/:url" element={<ReadTour />} />
                    <Route path="/tours/create" element={<CreateTour />} />
                    <Route path="/tours/update/:url" element={<UpdateTour />} />
                    <Route path="/destinations" element={<AllDestinations />} />
                    <Route
                      path="/destinations/:url"
                      element={<ReadDestination />}
                    />
                    <Route
                      path="/destinations/create"
                      element={<CreateDestination />}
                    />
                    <Route
                      path="/destinations/update/:url"
                      element={<UpdateDestination />}
                    />
                    <Route path="/blogs" element={<AllBlogs />} />
                    <Route path="/blogs/:url" element={<ReadBlog />} />
                    <Route path="/blogs/create" element={<CreateBlog />} />
                    <Route path="/blogs/update/:url" element={<UpdateBlog />} />
                    <Route path="/users" element={<AllUsers />} />
                    <Route path="/users/:url" element={<ReadUser />} />
                    <Route path="/users/create" element={<CreateUser />} />
                    <Route path="/users/update/:url" element={<UpdateUser />} />
                  </Routes>
                </PrivateRoutes>
              }
            />
          </Routes>
        </PageLayout>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
