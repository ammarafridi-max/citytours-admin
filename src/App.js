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
import AllUsers from "./features/users/AllUsers/AllUsers";
import ReadUser from "./features/users/ReadUser/ReadUser";
import CreateUser from "./features/users/CreateUser/CreateUser";
import UpdateUser from "./features/users/UpdateUser/UpdateUser";

// Auth
import AuthProvider from "./features/auth/AuthContext";
import PrivateRoutes from "./features/auth/PrivateRoutes/PrivateRoutes";
import Login from "./features/auth/Login/Login";

// Roles
import AllRoles from "./features/roles/AllRoles/AllRoles";
import UpdateRole from "./features/roles/UpdateRole/UpdateRole";
import CreateRole from "./features/roles/CreateRole/CreateRole";

function App() {
  return (
    <AuthProvider>
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
                    <Route path="/users/:username" element={<ReadUser />} />
                    <Route path="/users/create" element={<CreateUser />} />
                    <Route
                      path="/users/update/:username"
                      element={<UpdateUser />}
                    />
                    <Route path="/roles" element={<AllRoles />} />
                    {/* <Route path="/users/:url" element={<ReadUser />} /> */}
                    <Route path="/roles/create" element={<CreateRole />} />
                    <Route path="/roles/update/:url" element={<UpdateRole />} />
                  </Routes>
                </PrivateRoutes>
              }
            />
          </Routes>
        </PageLayout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
