import React, { memo } from "react";
import { Popover, Rate } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";

function Carditem({ phim, navigate, renderTrailer, key }) {
  const renderHover = () => {
    return (
      <div className="h-[460px] w-72 flex flex-col items-start space-y-5 relative overflow-hidden">
        <div className="text-xl font-semibold text-center flex justify-center items-center space-x-2 ">
          <span className="text-white bg-color4 px-2 py-1 rounded-lg">C18</span>
          <p className="text-black">{phim.tenPhim}</p>
        </div>
        <div className="text-base space-y-1">
          <div className="flex justify-start items-center space-x-3">
            <span className="px-2 py-1 bg-red-600 rounded-sm text-white ">
              {phim.hot === true && "Hot"}
            </span>
            <Rate disabled value={phim.danhGia} />
          </div>
          <p>
            Mã phim: <span className="text-color4">{phim.maPhim}</span>{" "}
          </p>
          <p>
            Ngày khởi chiếu:
            <span className="text-color4">{phim.ngayKhoiChieu}</span>
          </p>
          <p className="line-clamp-10">{phim.moTa}</p>
          <div className="absolute bottom-0 w-full">
            <button
              onClick={() => navigate(`/detail/${phim.maPhim}`)}
              className="w-full font-bold transition duration-300 mb-0 bg-gray-300 text-lg p-2 shadow hover:bg-gray-700"
            >
              Xem Chi Tiết
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Popover content={() => renderHover()} placement="left" key={key}>
      <div className="p-5 ">
        <div className="shadow-lg shadow-black/70 rounded-md overflow-hidden group">
          <div className="relative group">
            <img src={phim.hinhAnh} alt="" loading="lazy" className="w-full h-[350px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 duration-500 transition-opacity group-hover:opacity-100 flex items-center justify-center">
              <button onClick={() => renderTrailer(phim)}>
                <PlayCircleOutlined className="text-7xl text-white" />
              </button>
            </div>
          </div>
          <div className="text-xl px-3 font-bold text-center flex justify-start items-center truncate text-white transition duration-500 group-hover:bg-black py-2">
            <span className=" bg-color1 px-2 py-1 rounded-lg ">C18</span>
            <p className=" text-ellipsis overflow-hidden">{phim.tenPhim}</p>
          </div>
          <div className="flex flex-col justify-between">
            <button
              onClick={() => navigate(`/detail/${phim.maPhim}`)}
              className="w-full font-semibold transition duration-500 bg-color4 hover:bg-color4/70 mb-0 text-lg py-3  shadow "
            >
              Mua vé
            </button>
          </div>
        </div>
      </div>
    </Popover>
  );
}
export default memo(Carditem);
