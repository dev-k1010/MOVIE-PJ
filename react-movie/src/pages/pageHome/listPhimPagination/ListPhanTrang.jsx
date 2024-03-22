import React, { memo, useEffect, useState } from "react";
import { Pagination, Popover, Rate } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { quanLyPhimServices } from "../../../services/quanLyPhimServices";
import Carditem from "../../cardItem/Carditem";

function ListPhanTrang(props) {
  const navigate = useNavigate();
  const [soTrang, setSoTrang] = useState(1);
  const { listPhim } = props;
  const [isTrailerOpen, setTrailerOpen] = useState(false);
  const [selectedPhim, setSelectedPhim] = useState(null);
  const [phimPhanTrang, setPhimPhanTrang] = useState();
  const soPhanTuTrenTrang = 8;
  const tongSoPhim = listPhim ? listPhim.length : 0;
  useEffect(() => {
    quanLyPhimServices
      .layDanhSachPhimPhanTrang(soTrang, soPhanTuTrenTrang)
      .then((result) => {
        const phim = result.data.content;
        let newPhimPhanTrang = phim.items.slice(); // Copy danh sách phim
        const realItemCount = newPhimPhanTrang.length;
        if (realItemCount < soPhanTuTrenTrang) {
          const virtualItemCount = soPhanTuTrenTrang - realItemCount;
          for (let i = 0; i < virtualItemCount; i++) {
            newPhimPhanTrang.push({ isVirtual: true }); // Thêm thuộc tính isVirtual phân biệt
          }
        }
        setPhimPhanTrang(newPhimPhanTrang);
      })
      .catch((err) => {
        console.log("🙂 ~ useEffect ~ err:", err);
      });
  }, [soTrang, soPhanTuTrenTrang]);

  const renderTrailer = (phim) => {
    setTrailerOpen(true);
    setSelectedPhim(phim);
  };
  const closeTrailer = () => {
    setTrailerOpen(false);
    setSelectedPhim(null);
  };
  const handlePageChange = (page) => {
    setSoTrang(page);
  };
  return (
    <div>
      <div className="text-white grid grid-cols-12 justify-between items-center my-5">
        <div className="h-1 w-full bg-white col-span-4 "></div>
        <span className="text-3xl font-bold col-span-4 text-center">
          DANH SÁCH PHIM
        </span>
        <div className="h-1 w-full bg-white col-span-4"></div>
      </div>
      <div className="container w-full h-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {phimPhanTrang &&
            phimPhanTrang.map((phim, i) => {
              if (phim.isVirtual) {
                return (
                  <div
                    key={`virtual_${i}`}
                    className="p-5 pointer-events-none opacity-0"
                  >
                    <div className="shadow-lg shadow-black/70 rounded-md overflow-hidden group">
                      <div class="relative group">
                        <img
                          src={phim.hinhAnh}
                          alt=""
                          class="w-full h-[350px]"
                          loading="lazy"
                        />
                        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 duration-500 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                          <button onClick={() => renderTrailer(phim)}>
                            <PlayCircleOutlined className="text-7xl text-white" />
                          </button>
                        </div>
                      </div>
                      <div className="text-xl px-3 font-bold text-center flex justify-start items-center truncate text-white transition duration-500 group-hover:bg-black py-2">
                        <span className=" bg-color1 px-2 py-1 rounded-lg ">
                          C18
                        </span>
                        <p className=" text-ellipsis overflow-hidden">
                          {phim.tenPhim}
                        </p>
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
                );
              }
              return (
                <Carditem
                  key={i}
                  phim={phim}
                  navigate={navigate}
                  renderTrailer={renderTrailer}
                />
              );
            })}
        </div>
        <div className="py-2 bg-white flex items-center justify-center rounded-md mb-10">
          <Pagination
            current={soTrang}
            total={tongSoPhim}
            pageSize={soPhanTuTrenTrang}
            onChange={handlePageChange}
          />
        </div>
      </div>

      {isTrailerOpen && selectedPhim && (
        <div
          style={{ zIndex: 1000 }}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center "
        >
          <div className="relative w-full max-w-screen-lg">
            <button
              onClick={closeTrailer}
              className="absolute top-0 -right-16  text-white text-xl"
            >
              X
            </button>
            <ReactPlayer
              url={
                selectedPhim ? selectedPhim.trailer : "https://www.example.com"
              }
              controls
              width="100%"
              height="70vh"
            />
          </div>
        </div>
      )}
    </div>
  );
}
export default memo(ListPhanTrang);
