import { Tabs } from "antd";

import moment from "moment";
import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "../../../constants/api";

function RapList(props) {
  const navigate = useNavigate();
  const [position, setPosition] = useState("left");
  const { lichChieuHeThongRap } = props;
  window.onresize = () => {
    if (window.innerWidth <= 1024) {
      setPosition("top");
    } else {
      setPosition("left");
    }
  };
  return (
    <div className="RapList overflow-hidden p-5 border mx-40">
      <Tabs
        tabPosition={position}
        style={{ height: 500 }}
        items={lichChieuHeThongRap.map((heThongRap, i) => {
          return {
            key: i,
            label: (
              <img
                src={heThongRap.logo}
                alt=""
                className="w-20"
                loading="lazy"
              />
            ),
            children: (
              <Tabs
                tabPosition={position}
                defaultActiveKey="1"
                style={{ height: 500 }}
                items={heThongRap.lstCumRap.map((cumRap, i) => {
                  return {
                    key: i,
                    label: (
                      <div className="w-40">
                        <img
                          src={cumRap.hinhAnh}
                          alt=""
                          className="w-20"
                          loading="lazy"
                        />
                        <p className="whitespace-normal m-0 text-white text-left">
                          {cumRap.diaChi}
                        </p>
                      </div>
                    ),
                    children: (
                      <div style={{ overflowY: "scroll", height: 460 }}>
                        {cumRap.danhSachPhim.map((phim, i) => (
                          <div key={i} className="border-b py-3 sm:flex">
                            <div style={{ display: "flex" }}>
                              <img
                                style={{ height: 100, width: 100 }}
                                src={phim.hinhAnh}
                                alt=""
                                loading="lazy"
                              />
                            </div>
                            <div className="sm:pl-5 flex-1 space-y-3">
                              <h1 className=" text-2xl text-color4 font-medium">
                                {phim.tenPhim}
                              </h1>
                              <p className="text-base text-red text-white">
                                {cumRap.diaChi}
                              </p>
                              <div className="grid grid-cols-2 gap-2 mt-4 justify-items-start ">
                                {phim.lstLichChieuTheoPhim
                                  .slice(0, 12)
                                  .map((lichChieu, i) => (
                                    <button
                                      onClick={() => {
                                        localStorage.getItem(UserLogin)
                                          ? navigate(
                                              `/ticket/${lichChieu.maLichChieu}`
                                            )
                                          : navigate("/user/login");
                                      }}
                                      key={i}
                                      className=" text-start px-3 py-1 rounded-md font-medium hover:bg-slate-200 transition duration-300 bg-gray-300"
                                    >
                                      <span className="">
                                        {moment(
                                          lichChieu.ngayChieuGioChieu
                                        ).format("DD-MM-YYYY")}{" "}
                                        ~
                                      </span>
                                      <span className="text-red-500">
                                        {moment(
                                          lichChieu.ngayChieuGioChieu
                                        ).format("hh:mm")}
                                      </span>
                                    </button>
                                  ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ),
                  };
                })}
              />
            ),
          };
        })}
      />
    </div>
  );
}
export default memo(RapList);
