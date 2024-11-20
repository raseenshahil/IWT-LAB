import { Route, Routes } from "react-router-dom";
import Account from "./components/Account/Account";
import Admin from "./components/Admin/Admin";
import Business from "./components/Business/Business";
import Create from "./components/Create/Create";
import Home from "./components/home/Home";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";
import Main from "./page/Main";
import Order from "./page/Order";
import RoleManage from "./RoleManage";
import { useState } from "react";

function App() {
  const [logged, setLogged] = useState(false);
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={<Home log={logged} setLogged={setLogged} />}
          />
          <Route path="/login" element={<Login setLogged={setLogged} />} />
          <Route path="/Create" element={<Create />} />
          <Route
            path="/Home/*"
            element={
              <PrivateRoute>
                <Main log={logged} setLogged={setLogged} />
              </PrivateRoute>
            }
          />
          <Route
            path="/Order/:id"
            element={
              <PrivateRoute>
                <Order />
              </PrivateRoute>
            }
          />
          <Route
            path="/Account"
            element={
              <PrivateRoute>
                <Account setLogged={setLogged} />
              </PrivateRoute>
            }
          />
          <Route
            path="/Business/*"
            element={
              <PrivateRoute>
                <RoleManage r="Business">
                  <Business />
                </RoleManage>
              </PrivateRoute>
            }
          />
          <Route
            path="/Admin/*"
            element={
              <PrivateRoute>
                <RoleManage r="Admin">
                  <Admin />
                </RoleManage>
              </PrivateRoute>
            }
          />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
