import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
//import HeaderAuth from "./components/HeaderAuth";
import CustomerHeader from "./components/CustomerHeader";
import ProviderHeader from "./components/ProviderHeader";

//import CustomerNavbar from "./components/CustomerNavbar";
//import ProviderNavbar from "./components/ProviderNavbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProviderRegister from "./pages/ProviderRegister";

axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(null);
  const [error] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/me");
        setUser(res.data);
      } catch  {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {user ? (
          user.role === "customer" ? (
            <CustomerHeader user={user} setUser={setUser} />
          ) : (
            <ProviderHeader user={user} setUser={setUser} />
          )
        ) : (
          <Header />
        )}

        <main className="grow">
          <Routes>
            <Route path="/" element={<Home user={user} error={error} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route
              path="/provider/register"
              element={<ProviderRegister setUser={setUser} />}
            />

            {/* Placeholder routes - will implement later */}
            <Route
              path="/browse-services"
              element={
                <div className="p-8 text-center">
                  Browse Services - Coming Soon
                </div>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <div className="p-8 text-center">My Bookings - Coming Soon</div>
              }
            />
            <Route
              path="/reviews"
              element={
                <div className="p-8 text-center">Reviews - Coming Soon</div>
              }
            />
            <Route
              path="/settings"
              element={
                <div className="p-8 text-center">Settings - Coming Soon</div>
              }
            />
            <Route
              path="/provider/services"
              element={
                <div className="p-8 text-center">
                  Provider Services - Coming Soon
                </div>
              }
            />
            <Route
              path="/provider/bookings"
              element={
                <div className="p-8 text-center">
                  Provider Bookings - Coming Soon
                </div>
              }
            />
            <Route
              path="/provider/reviews"
              element={
                <div className="p-8 text-center">
                  Provider Reviews - Coming Soon
                </div>
              }
            />
            <Route
              path="/provider/settings"
              element={
                <div className="p-8 text-center">
                  Provider Settings - Coming Soon
                </div>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
