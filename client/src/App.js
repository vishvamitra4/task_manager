import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import IndexPage from "./component/IndexPage";
import Login from "./component/Login";
import Register from "./component/Register";
import ProfilePage from "./component/ProfilePage.js"
import axios from "axios";
import { UserContextProvider } from "./userContext";

axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App;