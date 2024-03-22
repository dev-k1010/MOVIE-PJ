// đặt ghế
import { Modal, Progress, Result, Tabs } from "antd";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  datVe,
  layDanhSachPhongVe,
  quanLyDatVeActions,
} from "../../stores/quanLyDatVeReducer/quanLyDatVeReducer";
import { thongTinTaiKhoan } from "../../stores/quanLyNguoiDungReducer/quanLyNguoiDungReducer";
import Lottie from "lottie-react";
import animateSrc from "./anhdaden.json";
import animateSrcSuccess from "./successamination.json";
import monkeyanimation from "./monkeyamination.json";
import { WarningOutlined } from "@ant-design/icons";
import io from "socket.io-client";

export default function Ticket() {
  return (
    <div
      style={{
        backgroundImage: `url( '/IMG/bg-1.jpg')`,
      }}
    >
      <Container
        style={{
          backgroundImage: `url( 'IMG/bg-1.jpg')`,
        }}
        className="DatVe p-20  "
      >
        <Tabs
          items={[
            {
              label: (
                <span className="font-bold uppercase sm:text-lg text-color4">
                  01-Chọn ghế & thanh toán
                </span>
              ),
              key: 1,
              children: <ChonGhe />,
            },
            {
              label: (
                <span className="font-bold uppercase sm:text-lg text-color4">
                  02-Kết quả đặt vé
                </span>
              ),
              key: 2,
              children: <KetQuaDatVe />,
            },
          ]}
        />
      </Container>
    </div>
  );
}

function ChonGhe() {
  const param = useParams();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("UserLogin"));
  const { danhSachPhongVe, danhSachGheDangDat, ketQuaDatVe, errKetQuaDatVe } =
    useSelector((state) => state.quanLyDatVeReducer);
  const { danhSachGhe, thongTinPhim } = danhSachPhongVe;
  const danhSachVe = danhSachGheDangDat?.map((ghe) => {
    return { maGhe: ghe.maGhe, giaVe: ghe.giaVe };
  });
  const [listGhe, setListGhe] = useState();
  const socket = io("http://localhost:8080");

  useEffect(() => {
    dispatch(quanLyDatVeActions.huyErrKetQuaDatVe());
    // Xử lý khi kết nối thành công
    socket.on("connect", () => {
      console.log("a user connected");
    });
    socket.on("newSeatList", (updatedSeats) => {
      setListGhe(updatedSeats);
    });
    // Xử lý khi ngắt kết nối
    return () => {
      socket.emit("disconnectRequest");
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    setListGhe(danhSachGhe?.map((ghe) => ({ ...ghe, dangChon: false })));
  }, [danhSachGhe]);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(layDanhSachPhongVe(param.malichchieu));
  }, [ketQuaDatVe]);

  const handleChonGhe = (ghe) => {
    // Kiểm tra xem ghế đã được đặt chưa
    if (ghe.daDat) {
      Modal.error({
        content: (
          <div className="flex flex-col justify-center items-center">
            <p className="text-center text-red-500 text-xl font-semibold">
              Ghế đã có người đặt !
            </p>
            <span>
              <Lottie animationData={monkeyanimation} loop={true} />
            </span>
          </div>
        ),
        okButtonProps: {
          className: "bg-red-500 text-white",
        },
      });
      return;
    }
    // Kiểm tra xem ghế đã được chọn bởi người dùng khác chưa
    if (ghe.dangChon && ghe.taiKhoanNguoiDat !== user.taiKhoan) {
      Modal.error({
        content: (
          <div className="flex flex-col justify-center items-center">
            <p className="text-center text-red-500 text-xl font-semibold">
              Ghế đã được chọn bởi người dùng khác !
            </p>
            <span>
              <Lottie animationData={monkeyanimation} loop={true} />
            </span>
          </div>
        ),
        okButtonProps: {
          className: "bg-red-500 text-white",
        },
      });

      return;
    }
    // Cập nhật trạng thái ghế
    let updatedSeats = listGhe.map((seat) => {
      if (seat.maGhe === ghe.maGhe) {
        // Nếu ghế đã được chọn bởi người dùng hiện tại, hủy chọn ghế đó
        if (seat.dangChon && seat.taiKhoanNguoiDat === user.taiKhoan) {
          return { ...seat, dangChon: false, taiKhoanNguoiDat: null };
        } else {
          // Nếu ghế chưa được chọn, chọn ghế và ghi lại thông tin người dùng đã chọn ghế này
          return { ...seat, dangChon: true, taiKhoanNguoiDat: user.taiKhoan };
        }
      }
      return seat;
    });
    setListGhe(updatedSeats);
    socket.emit("updatedSeats", updatedSeats);
    dispatch(quanLyDatVeActions.danhSachGheDangDat(ghe));
  };

  return (
    <div className="ChonGhe pt-3">
      <div className="grid grid-cols-12">
        <div className="col-span-12 lg:col-span-8 pb-5 lg:pr-5">
          <div>
            <div className="h-3"></div>
            <div className="w-11/12 h-0 m-auto text-center text-white text-xl border-b-[40px] border-gray-600 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent drop-shadow-[0_12px_10px_#757373]">
              Màn hình
            </div>
          </div>
          {/* Danh sách ghế */}
          <div className="pt-10 pb-3 text-center">
            {listGhe?.map((ghe, i) => {
              let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
              let classGheThuong = ghe.loaiGhe === "Thuong" ? "gheThuong" : "";
              let classGheDaDat = ghe.daDat === true ? "gheDaDat" : "";
              let classGheDangChon = ghe.dangChon === true ? "gheDangChon" : "";
              let classGheDangDat = danhSachGheDangDat.find(
                (gheDangDat) => gheDangDat.maGhe === ghe.maGhe
              )
                ? "gheDangDat"
                : "";

              let backgroundColorClass = "";
              if (ghe.daDat) {
                backgroundColorClass = "bg-red-500 cursor-not-allowed";
              } else {
                if (classGheDangDat) {
                  backgroundColorClass = "bg-blue-700 hover:scale-110";
                } else if (classGheDangChon) {
                  backgroundColorClass = "bg-gray-800 cursor-not-allowed";
                } else if (classGheThuong) {
                  backgroundColorClass = "bg-white hover:scale-110";
                } else if (classGheVip) {
                  backgroundColorClass = "bg-color4 hover:scale-110";
                }
              }

              return (
                <Fragment key={i}>
                  <button
                    onClick={() => {
                      handleChonGhe(ghe);
                    }}
                    className={`w-4 h-4 m-[1px] text-[10px] sm:w-6 sm:h-6 sm:text-xs sm:m-1 md:w-8 md:h-8 md:m-[6px] md:text-base lg:w-9 lg:h-9 lg:m-[8px] xl:w-9 xl:h-9 shadow transition duration-300 ease-in-out transform  rounded-md  ${
                      danhSachGheDangDat ? backgroundColorClass : ""
                    } ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDangChon}`}
                  >
                    {ghe.daDat === true ? "X" : ghe.stt}
                  </button>
                  {(i + 1) % 16 === 0 ? <br /> : ""}
                </Fragment>
              );
            })}
          </div>
          {/* Chú thích các loại ghế */}
          <div className="border-t pt-3 text-center text-white flex space-x-5 justify-center items-center">
            <span className="whitespace-nowrap">
              <button
                className="bg-white rounded-md shadow ghe w-6 h-6"
                style={{ cursor: "default" }}
              ></button>
              <span>Ghế thường</span>
            </span>
            <span className="whitespace-nowrap">
              <button
                className="bg-yellow-500 ghe gheVip w-6 h-6 rounded-md shadow"
                style={{ cursor: "default" }}
              ></button>{" "}
              <span>Ghế VIP</span>
            </span>
            <span className="whitespace-nowrap">
              <button
                className="bg-blue-700 ghe gheDangDat w-6 h-6 rounded-md shadow"
                style={{ cursor: "default" }}
              ></button>{" "}
              <span>Ghế đang chọn</span>
            </span>
            <span className="whitespace-nowrap">
              <button
                className="bg-red-500 rounded-md shadow ghe gheDaDat w-6 h-6"
                style={{ cursor: "default" }}
              ></button>{" "}
              <span>Ghế đã đặt</span>
            </span>
            <span className="whitespace-nowrap">
              <button
                className="bg-gray-800 w-6 h-6 inline-block rounded-md shadow"
                style={{ cursor: "default" }}
              ></button>{" "}
              <span>Ghế đang có người chọn</span>
            </span>
          </div>
        </div>
        {/* Thông tin đặt vé */}
        <div className="col-span-12 lg:col-span-4 border p-3 shadow-lg text-base bg-white rounded-lg">
          <div className="border-b text-center flex pb-3 items-center">
            <img
              src={thongTinPhim?.hinhAnh}
              alt=""
              className="w-1/4"
              loading="lazy"
            />
            <p className="text-Red-500 font-bold text-4xl m-0 text-center flex-1">
              {thongTinPhim?.tenPhim}
            </p>
          </div>
          <div className="border-b py-3 flex justify-between">
            <p className="m-0 font-semibold">Ngày chiếu giờ chiếu</p>
            <p className="m-0 text-right">
              <span>{thongTinPhim?.ngayChieu}</span>-
              <span className="text-amber-500">{thongTinPhim?.gioChieu}</span>
            </p>
          </div>
          <div className="border-b py-3 flex justify-between">
            <p className="m-0 font-semibold w-20">Cụm rạp</p>
            <p className="m-0 text-right">{thongTinPhim?.tenCumRap}</p>
          </div>
          <div className="border-b py-3 flex justify-between">
            <p className="m-0 font-semibold w-28">Địa chỉ</p>
            <p className="m-0 text-right">{thongTinPhim?.diaChi}</p>
          </div>
          <div className="border-b py-3 flex justify-between">
            <p className="m-0 font-semibold">Rạp</p>
            <p className="m-0">{thongTinPhim?.tenRap}</p>
          </div>
          <div className="border-b py-3 flex justify-between">
            <p className="m-0 font-semibold w-20 text-amber-500">Ghế chọn</p>
            <div className="space-x-2 flex-1 text-right">
              {danhSachGheDangDat.map((ghe, i) => (
                <p className="m-0 font-semibold" key={i}>
                  {ghe.loaiGhe === "Thuong" ? (
                    <span className="text-gray-500">Thường</span>
                  ) : (
                    <span className="text-red-500">{ghe.loaiGhe}</span>
                  )}
                  <span>/</span>
                  <span className="text-red-600">số-{ghe.stt}</span>
                  <span>/</span>
                  <span className="text-red-500">
                    Giá:{ghe.giaVe.toLocaleString()}đ
                  </span>
                </p>
              ))}
            </div>
          </div>
          <div className="border-b py-3 flex justify-between">
            <p className="m-0 font-semibold">Ưu đãi</p>
            <p className="m-0">0%</p>
          </div>
          <div className="border-b py-3 flex justify-between items-center">
            <p className="m-0 font-semibold">Tổng tiền</p>
            <p className="m-0 text-black-500 text-3xl font-bold">
              {danhSachGheDangDat
                .reduce((tongTien, ghe) => (tongTien += ghe.giaVe), 0)
                .toLocaleString()}
              đ
            </p>
          </div>
          <div className="pt-3">
            <button
              onClick={() => {
                dispatch(
                  datVe({
                    maLichChieu: param.malichchieu,
                    danhSachVe:
                      danhSachGheDangDat[0] === undefined
                        ? "chưa chọn ghế"
                        : danhSachVe,
                  })
                );
              }}
              className="bg-gray-500 w-full font-bold text-xl py-2 rounded-xl text-white hover:bg-gray-700 transition duration-300"
            >
              Đặt vé
            </button>
          </div>
        </div>
      </div>
      {/* Kiểm tra trước khi dispatch */}
      {ketQuaDatVe || errKetQuaDatVe ? (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black/50">
          <div className="w-96 bg-black flex flex-col justify-center items-center rounded-lg">
            {ketQuaDatVe ? (
              <Result
                status="success"
                title={
                  <div className="flex flex-col justify-center items-center">
                    <span className="text-white">Đặt vé thành công </span>
                  </div>
                }
                icon={<Lottie animationData={animateSrcSuccess} loop={true} />}
              />
            ) : null}
            {errKetQuaDatVe ? (
              <Result
                status="warning"
                title={
                  <div className="flex flex-col justify-center items-center">
                    <span className="text-color4 font-semibold">
                      Bạn quên chọn ghế mất rồi{" "}
                      <WarningOutlined className=" text-3xl" />
                    </span>
                  </div>
                }
                icon={<Lottie animationData={animateSrc} loop={true} />}
              />
            ) : null}
            <button
              onClick={() => {
                dispatch(quanLyDatVeActions.huyErrKetQuaDatVe());
              }}
              className="py-3 px-7 rounded-lg bg-color4 text-white hover:bg-color4/60 mb-8"
            >
              OK
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

function KetQuaDatVe() {
  const dispatch = useDispatch();
  const { ttTaiKhoan } = useSelector((state) => state.quanLyNguoiDungReducer);
  const { ketQuaDatVe } = useSelector((state) => state.quanLyDatVeReducer);

  useEffect(() => {
    dispatch(thongTinTaiKhoan());
  }, [ketQuaDatVe]);

  return (
    <div className="KetQuaDatVe">
      <div className="text-lg font-semibold border-b p-3 bg-white ">
        <span>Tài khoản: </span>
        <span className="text-amber-500 mr-2">{ttTaiKhoan?.taiKhoan} | </span>
        <span>Email: </span>
        <span className="text-amber-500 mr-2">{ttTaiKhoan?.email} | </span>
        <span>Họ tên: </span>
        <span className="text-amber-500 mr-2">{ttTaiKhoan?.hoTen} | </span>
        <span>Số điện thoại: </span>
        <span className="text-amber-500">{ttTaiKhoan?.soDT}</span>
      </div>
      <div>
        {ttTaiKhoan?.thongTinDatVe.map((ve, i) => (
          <div key={i} className="py-2 border-b grid grid-cols-12">
            <div className="col-span-4 md:col-span-2 lg:col-span-1">
              <img src={ve.hinhAnh} alt="" className="w-full" loading="lazy" />
            </div>
            <div className="col-span-8 pl-3 md:col-span-3">
              <p className="m-0 text-xl font-bold text-amber-500">
                {ve.tenPhim}
              </p>
              <p className="m-0 text-green-500">
                Thời lượng phim: {ve.thoiLuongPhim}p
              </p>
              <p className="m-0 text-amber-500">
                Ngày đặt: {moment(ve.ngayDat).format("HH:mm DD-MM-YYYY")}
              </p>
            </div>
            <div className="col-span-12 md:col-span-7 md:pl-3">
              <p className="m-0 font-semibold text-white">Danh sách ghế</p>
              {ve.danhSachGhe.map((ghe, i) => (
                <div key={i}>
                  <span className="font-semibold text-white">Ghế: </span>
                  <span className="text-amber-500">{ghe.tenGhe} - </span>

                  <span className="text-amber-500">{ghe.tenRap} - </span>
                  <span>/</span>
                  <span className="text-amber-500">{ghe.tenHeThongRap}</span>
                </div>
              ))}
            </div>
            <div className="col-span-12 lg:col-span-1">
              <p>
                <span className="font-semibold">Tổng tiền:</span>{" "}
                <span className="text-amber-500 text-xl font-semibold">
                  {(ve.giaVe * ve.danhSachGhe.length).toLocaleString()}đ
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const Container = styled.div`
  &.Ticket {
    .ant-tabs-top > .ant-tabs-nav {
      box-shadow: 0 3px 5px 0 #0000002e;
      padding: 5px;
    }
    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
      color: #f59e0b;
    }
    .ant-tabs-ink-bar {
      background-color: #f59e0b;
    }
    .ant-tabs-tab:hover {
      color: #f59e0b;
    }
    .ghe {
      border-radius: 5px;
      cursor: pointer;
      color: #fff;
      background-color: #aaa;
    }
    .gheDaDat {
      background-color: red !important;
      cursor: no-drop;
    }
    .gheDangDat {
      background-color: green !important;
    }
    .gheVip {
      background-color: orange;
    }
  }
`;
