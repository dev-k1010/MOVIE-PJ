import { Modal, Select, Space } from "antd";
import React, { memo, useState } from "react";
import { quanLyRapServices } from "../../../services/quanLyRapServices";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "../../../constants/api";

function HomeTool(props) {
  const { listPhim } = props;
  const navigate = useNavigate();
  const [phim, setPhim] = useState();
  const [rapChieu, setRapChieu] = useState();
  const [gioChieu, setGioChieu] = useState();
  const fectData = (maPhim) => {
    quanLyRapServices
      .layThongTinLichChieuPhim(maPhim)
      .then((result) => {
        const phim = result.data.content;
        setPhim(phim.heThongRapChieu);
      })
      .catch((err) => {
        console.log(
          "🙂 ~ quanLyRapServices.layThongTinLichChieuPhim ~ err:",
          err.data
        );
      });
  };
  const handleChonPhim = (maPhim) => {
    fectData(maPhim);
  };
  const handelChonRap = (maRap) => {
    const gioChieuTheoRap = phim
      .filter((rap) => rap.maHeThongRap === maRap)
      .map((rap) =>
        rap.cumRapChieu.map((lichChieu) => lichChieu.lichChieuPhim)
      );

    const array_lon = gioChieuTheoRap[0].reduce(
      (acc, curr) => acc.concat(curr),
      []
    );

    setRapChieu(array_lon);
  };
  const handelChonGioChieu = (maRap) => {
    setGioChieu(maRap);
  };
  const handelDatVe = () => {
    if (!phim || !rapChieu || !gioChieu) {
      Modal.warning({
        title: "This is a warning message",
        content: (
          <>
            {!phim && (
              <p className="text-base text-color1"> Vui lòng chọn phim! </p>
            )}
            {!rapChieu && (
              <p className="text-base text-color1">Vui lòng chọn rap chiếu!</p>
            )}
            {!gioChieu && (
              <p className="text-base text-color1">Vui lòng giờ chiếu chiếu!</p>
            )}
          </>
        ),
        okButtonProps: {
          className: "bg-color3 text-white",
        },
      });
    } else {
      localStorage.getItem(UserLogin)
        ? navigate(`/ticket/${gioChieu}`)
        : navigate("/user/login");
    }
  };

  return (
    <div className="-translate-y-16">
      <div  style={{ zIndex: 100000 }} className="flex justify-center items-center space-x-3 mx-80 rounded-md bg-white">
        <Space wrap className="py-5 ">
          <Select
            style={{
              width: 200,
              height: 50,
            }}
            placeholder={
              <span className="text-black font-semibold text-lg">Phim</span>
            }
            onChange={handleChonPhim}
            options={listPhim.map((phim) => ({
              label: (
                <span className="font-semibold text-lg">{phim.tenPhim}</span>
              ),
              value: phim.maPhim,
            }))}
          />
          <Select
            style={{
              width: 200,
              height: 50,
            }}
            placeholder={
              <span className="text-black font-semibold text-lg">Rạp</span>
            }
            onChange={handelChonRap}
            options={
              phim &&
              phim.map((rap) => ({
                label: (
                  <span className="font-semibold text-lg">
                    {rap.tenHeThongRap}
                  </span>
                ),
                value: rap.maHeThongRap,
              }))
            }
          />
          <Select
            style={{
              width: 200,
              height: 50,
            }}
            placeholder={
              <span className="text-black font-semibold text-lg">
                Ngày chiếu
              </span>
            }
            onChange={handelChonGioChieu}
            options={
              rapChieu &&
              rapChieu.map((rap) => ({
                label: (
                  <span className="font-semibold text-lg">
                    {rap.ngayChieuGioChieu}
                  </span>
                ),
                value: rap.maLichChieu,
              }))
            }
          />
        </Space>
        <button
          style={{ zIndex: 100 }}
          onClick={() => {
            handelDatVe();
          }}
          className="px-8 py-4 rounded-md bg-color4 font-semibold text-lg "
        >
          Đặt vé
        </button>
      </div>
    </div>
  );
}
export default memo(HomeTool);
