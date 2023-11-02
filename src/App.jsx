
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp"
import RecipeDetail from "./pages/RecipeDetail";
import SignIn from "./pages/SignIn";
import RequireAuth from "./components/RequireAuth";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import Dashboard from "./pages/Dashboard";
import RootLayout from "./components/RootLayout";


const ROLES = {
  "Admin": 2000,
  "User": 2001
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

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}>

          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />}></Route>
            <Route path="recipe/:id" element={<RecipeDetail />} />
          </Route>

        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="dashboard" element={Dashboard} />
        </Route>

        { /* catch all */}
        <Route path="*" element={<NotFound />} />

      </Routes >


    </>
  );
}

export default App;
