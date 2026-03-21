import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/login';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminDashBoard from './Admin/AdminDashBoard';
import Home from './components/Home';
import Navbar from './components/Navbar';
import AddRoom from './Admin/AddRoom';
import GetAllRooms from './Admin/GetAllRooms';
import Roommanage from './Admin/Roommanage';
import UpdateRoom from './Admin/UpdateRoom';
import AllRooms from './user/AllRooms';
import BookRoom from './user/BookRoom';
import Success from './user/Success';
import History from './user/History';
import UpdateHistory from './user/UpdateHistory';
import Allcustomers from './Admin/Allcustomers';



const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>

      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
     <Route path='/' element={<Home/>} />

    
  
  <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
      <Route path="/admin" element={<AdminDashBoard />} />
      <Route path="/admin/room" element={<Roommanage />} />
      <Route path="/admin/room/addroom" element={<AddRoom />} />
      <Route path="/admin/room/getall" element={<GetAllRooms />} />
      <Route path="/admin/room/edit/:id" element={<UpdateRoom />} />
      <Route path="/admin/customers" element={<Allcustomers />} />

  </Route>

    <Route element={<ProtectedRoute allowedRoles={["user"]}/>}>
      <Route path='/user' element={<AllRooms/>} />
      <Route path='/user/book/:room' element={<BookRoom/>} />
      <Route path='/user/success/:id' element={<Success/>} />
      <Route path="/history/:id" element={<History />} />
      <Route path="/updatehistory/:id" element={<UpdateHistory />} />

      
    </Route>




    </Routes>
    
    
    
    </>
  );
}

export default App;
