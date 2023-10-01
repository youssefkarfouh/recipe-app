
import Home from "./pages/Home";
import SignUp from "./pages/SignUp"
import RecipeDetail from "./pages/RecipeDetail";
import SignIn from "./pages/SignIn";
import { Route, Routes } from "react-router-dom";



function App() {


  return (

    <>

      <Routes>
        {/* public routes */}
        <Route path="login" element={<SignIn />} />
        <Route path="register" element={<SignUp />} />

        { /* we want to protect these routes */}
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />

        { /* catch all */}
        <Route path="*" element={<h1>Not Found 404</h1>} />

      </Routes >


    </>
  );
}

export default App;
