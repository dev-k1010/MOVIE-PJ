import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import AdminLayout from '../components/layouts/adminLayout/AdminLayout'
import MainLayout from '../components/layouts/mainLayout/MainLayout'
import UserLayout from '../components/layouts/userLayout/UserLayout'
import QuanLyPhim from '../pages/admin/quanLyPhim/QuanLyPhim'
import SuaPhim from '../pages/admin/quanLyPhim/suaPhim/SuaPhim'
import TaoLichChieu from '../pages/admin/quanLyPhim/taoLichChieu/TaoLichChieu'
import ThemPhim from '../pages/admin/quanLyPhim/themPhim/ThemPhim'
import QuanLyUsers from '../pages/admin/quanLyUsers/QuanLyUsers'
import SuaNguoiDung from '../pages/admin/quanLyUsers/suaNguoiDung/SuaNguoiDung'
import ThemNguoiDung from '../pages/admin/quanLyUsers/themNguoiDung/ThemNguoiDung'
import Register from '../pages/pageRegister/Register'
import Login from '../pages/pageLogin/Login'
import Detail from '../pages/pageDetail/Detail'
import Profile from '../pages/pageProfile/Profile'
import Home from '../pages/pageHome/Home'
import Ticket from '../pages/pageTicket/Ticket'

export default function Routers() {
   return useRoutes([
      {
         path: '',
         element: <MainLayout />,
         children: [
            {
               path: '',
               element: <Navigate to='Home' />
            },
            {
               path: 'home',
               element: <Home />
            },
            {
               path: 'detail/:maphim',
               element: <Detail />
            },
            {
               path: 'ticket/:malichchieu',
               element: <Ticket />
            },
            {
               path: 'profile',
               element: <Profile />
            },
         ]
      },
      
      {
         path: 'user',
         element: <UserLayout />,
         children: [
            {
               path: 'login',
               element: <Login />
            },
            {
               path: 'register',
               element: <Register />
            },                 
         ]
      },

      {
         path: 'admin',
         element: <AdminLayout />,
         children: [
            {
               path: 'films',
               element: <QuanLyPhim />
            },
            {
               path: 'films/addnew',
               element: <ThemPhim />
            },
            {
               path: 'films/edit/:id',
               element: <SuaPhim />
            },
            {
               path: 'films/showtime/:id',
               element: <TaoLichChieu />
            },
            {
               path: 'users',
               element: <QuanLyUsers/>
            },
            {
               path: 'users/themnguoidung',
               element: <ThemNguoiDung />
            }, 
            {
               path: 'users/suanguoidung/:id',
               element: <SuaNguoiDung />
            }, 
         ]
      },
   ])
}
