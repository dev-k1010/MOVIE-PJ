import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { UserLogin } from '../../../constants/api';
import { quanLyDatVeActions } from '../../../stores/quanLyDatVeReducer/quanLyDatVeReducer';
import { quanLyNguoiDungActions } from '../../../stores/quanLyNguoiDungReducer/quanLyNguoiDungReducer';

export default function AdminLayout() {
   const active = ({ isActive }) => isActive ? { backgroundColor: '#dad7d3' } : undefined
   const nguoiDung = JSON.parse(localStorage.getItem(UserLogin));
   const navigate = useNavigate();
   const dispatch = useDispatch();

   return (
      <div className='container'>
         <div className='flex bg-gray-300'>
            <div className='w-40 bg-slate-800 h-screen'>
               <div className='p-3'>
                  <NavLink to='/home'><img src="https://cdn.icon-icons.com/icons2/3380/PNG/512/film_youtube_video_movie_social_media_multimedia_icon_212509.png" alt="" className='w-20' /></NavLink>                  
               </div>
               <div className='mt-5 space-y-2'>
                  <NavLink style={active} to='films' className='block px-3 py-1 text-white text-base font-semibold hover:text-white hover:bg-gray-300'>Quản lý phim</NavLink>
                  <NavLink style={active} to='users' className='block px-3 py-1 text-white text-base font-semibold hover:text-white hover:bg-gray-300'>Quản lý users</NavLink>
               </div>
            </div>
            <div className='flex-1'>
               <div className='text-right bg-white p-3 space-x-2'>
                  <NavLink to="/profile" className="inline-block text-lg rounded-lg py-2 px-4 text-white bg-gray-700 hover:bg-gray-300 hover:text-white transition duration-300">
                     Hello admin! {nguoiDung.taiKhoan}
                  </NavLink>
                  <button onClick={() => {
                     dispatch(quanLyNguoiDungActions.dangXuat());
                     dispatch(quanLyDatVeActions.huyErrKetQuaDatVe())
                     navigate("/home");
                  }} className="inline-block px-4 py-2 text-black bg-white rounded-md shadow hover:bg-gray-300 hover:text-black transition duration-300">
                     Đăng xuất
                  </button>
               </div>
               <div className='m-3 bg-white'>
                  <Outlet />
               </div>
            </div>
         </div>
      </div>
   )
}
