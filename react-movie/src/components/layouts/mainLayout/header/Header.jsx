import React, { memo, useEffect, useState } from "react";
import {
  NavLink,
  unstable_HistoryRouter,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { quanLyNguoiDungActions } from "../../../../stores/quanLyNguoiDungReducer/quanLyNguoiDungReducer";
import { UserLogin } from "../../../../constants/api";
import { quanLyDatVeActions } from "../../../../stores/quanLyDatVeReducer/quanLyDatVeReducer";
import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { Link } from "react-scroll";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const nguoiDung = JSON.parse(localStorage.getItem(UserLogin));
  const [navbar, setNavbar] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setNavbar(false);
      } else {
        setNavbar(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    if (location.pathname !== "/home") {
      navigate("/home");
    }
  };
  const menuItems = [
    { id: "lichChieuPhim", label: "Lịch chiếu" },
    { id: "danhSachPhim", label: "Danh sách" },
    { id: "rapChieu", label: "Rạp chiếu" },
    { id: "tinTuc", label: "Tin tức" },
  ];
  return (
    <header
      style={{ zIndex: 10000 }}
      className={`Header fixed top-0  w-full ${
        !navbar ? "bg-black   shadow-sm shadow-black/50 " : " bg-black/60 "
      }
      }`}
    >
      <div>
        <div className="w-full justify-between bg-transparent lg:items-center lg:flex py-5">
          {/* Trái */}
          <div>
            <div className="flex items-center justify-between lg:block transition duration-500 ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 pl-10">
              <NavLink to="home">
                <div className="flex justify-center items-center">
                  <img className="w-12" src="/icon.png" alt="" />
                  <p className="text-xl font-bold  text-color4">yberM</p>
                </div>
              </NavLink>
              <div className="lg:hidden">
                <button
                  className="p-2  rounded-md outline-none border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? <AiOutlineClose /> : <AiOutlineMenu />}
                </button>
              </div>
            </div>
          </div>
          {/* Giữa */}
          <div>
            <div
              className={`flex-1 justify-self-center py-3 lg:block lg:py-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <ul className="items-center justify-center space-y-2 lg:flex lg:space-x-6 lg:space-y-0 mb-0 text-lg">
                {menuItems.map((menuItem, index) => (
                  <li key={index}>
                    <Link
                      onClick={handleClick}
                      to={menuItem.id}
                      className="text-white transition duration-500 hover:text-color4 hover:cursor-pointer"
                      smooth={true}
                      duration={1000}
                      offset={-60}
                      spy={true}
                      key={index}
                    >
                      {menuItem.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-3 space-x-2 lg:hidden ">
                {nguoiDung ? (
                  <div className="inline-block space-x-2">
                    <NavLink
                      to="profile"
                      className="inline-block text-lg rounded-lg px-6 py-2 text-white bg-gray-800 hover:bg-gray-500 hover:text-white transition duration-300"
                    >
                      Chào! {nguoiDung.taiKhoan}
                    </NavLink>
                    <button
                      onClick={() => {
                        dispatch(quanLyNguoiDungActions.dangXuat());
                        dispatch(quanLyDatVeActions.huyErrKetQuaDatVe());
                        navigate("/home");
                      }}
                      className="inline-block px-4 py-2 text-white bg-white rounded-md shadow hover:bg-gray-500 hover:text-white transition duration-300"
                    >
                      Đăng xuất
                    </button>
                    {nguoiDung.maLoaiNguoiDung === "QuanTri" ? (
                      <NavLink
                        to="/admin/films"
                        className="inline-block px-4 py-2 text-white bg-gray-800 rounded-md shadow hover:bg-gray-500 hover:text-white transition duration-300"
                      >
                        Page Admin
                      </NavLink>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  <div className="inline-block space-x-2">
                    <NavLink
                      to="/user/login"
                      className="inline-block px-4 py-2 text-center text-white bg-gray-800 rounded-md shadow hover:bg-gray-500 hover:text-white transition duration-300"
                    >
                      Đăng nhập
                    </NavLink>
                    <NavLink
                      to="/user/register"
                      className="inline-block px-4 py-2 text-white bg-dark rounded-md shadow hover:bg-gray-500 hover:text-white transition duration-300"
                    >
                      Đăng kí
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Phải */}
          <div className="hidden lg:block">
            {nguoiDung ? (
              <div className="flex items-center justify-center space-x-3">
                {nguoiDung.maLoaiNguoiDung === "QuanTri" ? (
                  <NavLink to="/admin/films" className="inline-block ">
                    <SettingOutlined className="text-color4 text-3xl" />
                  </NavLink>
                ) : (
                  <span className="text-lg text-color1 font-semibold">
                    {nguoiDung.hoTen}
                  </span>
                )}
                <div className="group overflow-hidden space-x-5">
                  <NavLink
                    to="profile"
                    className="inline-block text-lg rounded-lg text-white hover:text-white transition duration-300 relative z-10"
                  >
                    <span className="w-12 h-12 bg-white rounded-full flex items-center justify-center ">
                      <span className="text-color1 font-bold text-lg">
                        {nguoiDung.hoTen[0]}
                      </span>
                    </span>
                  </NavLink>
                  <button
                    onClick={() => {
                      dispatch(quanLyNguoiDungActions.dangXuat());
                      dispatch(quanLyDatVeActions.huyErrKetQuaDatVe());
                      navigate("/home");
                    }}
                    className="inline-block  py-1 px-2 text-black bg-white rounded-md shadow hover:bg-gray-500 hover:text-white transition transform -rotate-180 duration-500   -translate-x-14 group-hover:-translate-x-2 group-hover:rotate-0 relative z-0"
                  >
                    <LogoutOutlined className="text-sm text-color1" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="inline-block space-x-3 pr-10">
                <NavLink
                  to="/user/login"
                  className="inline-block px-4 py-2 text-center text-white bg-color3 rounded-sm border-2 border-white hover:text-white transition duration-300 ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
                >
                  Đăng nhập
                </NavLink>
                <NavLink
                  to="/user/register"
                  className="inline-block px-4 py-2 text-black bg-color4 border-2 border-white rounded-t-sm transition duration-300 ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 "
                >
                  Đăng kí
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
export default memo(Header);
