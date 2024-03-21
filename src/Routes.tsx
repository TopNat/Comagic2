import { Route, Routes } from "react-router-dom";
import Registration from "./pages/Registration";
import Main from "./pages/Main";
import ListHotels from "./components/ListHotels";
import HotelBook from "./components/HotelBook";
import Entr from "./pages/Entr";
import Account from "./components/Account";
import Reviews from "./components/Reviews";
import Book from "./components/Book";
import EditUser from "./components/EditUser";
import ProtectedRoute from "./components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Main />}></Route>
      <Route path="/" element={<Main />}></Route>
      <Route path="/reg" element={<Registration />}></Route>
      <Route path="/hotels" element={<ListHotels />}></Route>
      <Route path="/book/:id" element={<HotelBook />}></Route>
      <Route path="/entr" element={<Entr />}></Route>
      <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>}></Route>
      <Route path="/reviews/:id" element={<Reviews />}></Route>
      <Route path="/bookHot/:id" element={<ProtectedRoute><Book /></ProtectedRoute>}></Route>
      <Route path="/user" element={<ProtectedRoute><EditUser /></ProtectedRoute>}></Route>
    </Routes>
  );
};

export default AppRoutes;
