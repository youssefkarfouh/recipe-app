
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp"
import RecipeDetail from "./pages/RecipeDetail";
import SignIn from "./pages/SignIn";
import RequireAuth from "./components/RequireAuth";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import BackOffice from "./pages/BackOffice";
import RootLayout from "./components/RootLayout";
import Category from "./pages/Category";
import PersistLogin from "./components/PersistLogin";
import Employees from "./pages/employees";


const ROLES = {
  "Admin": "Admin",
  "User": "User"
}

function App() {

  return (

    <>

      <Routes>
        {/* public routes */}
        <Route path="register" element={<SignUp />} />
        <Route path="login" element={<SignIn />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        { /* we want to protect these routes */}

        <Route element={<PersistLogin />}>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}>

            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="category/:name" element={<Category />} />
              <Route path="category/:cat/:id" element={<RecipeDetail />} />
              <Route path="employees" element={<Employees/>} />
            </Route>

          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="backoffice" element={<BackOffice />} />
          </Route>
        </Route>


        { /* catch all */}
        <Route path="*" element={<NotFound />} />

      </Routes >


    </>
  );
}

export default App;
