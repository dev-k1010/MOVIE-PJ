import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  layDanhSachBanner,
  layDanhSachPhim,
} from "../../stores/quanLyPhimReducer/quanLyPhimReducer";
import { layThongTinLichChieuHeThongRap } from "../../stores/quanLyRapReducer/quanLyRapReducer";
import Banner from "./banner/Banner";
import MovieList from "./listPhim/MovieList";
import RapList from "./listRap/RapList";
import HomeTool from "./homeTool/HomeTool";
import ListPhanTrang from "./listPhimPagination/ListPhanTrang";
import News from "./news/News";

export default function Home() {
  const dispatch = useDispatch();
  const { listBanner, listPhim } = useSelector(
    (state) => state.quanLyPhimReducer
  );
  const { lichChieuHeThongRap } = useSelector(
    (state) => state.quanLyRapReducer
  );

  useEffect(() => {
    // window.scrollTo(0, 0);
    dispatch(layDanhSachBanner());
    dispatch(layDanhSachPhim());
    dispatch(layThongTinLichChieuHeThongRap());
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url( 'IMG/bg-1.jpg')`,
      }}
    >
      <Banner listBanner={listBanner} />
      <HomeTool listPhim={listPhim} />
      <div id="lichChieuPhim">
        <MovieList listPhim={listPhim} />
      </div>

      <div id="danhSachPhim">
        <ListPhanTrang listPhim={listPhim} />
      </div>

      <div id="rapChieu">
        <RapList lichChieuHeThongRap={lichChieuHeThongRap} />
      </div>

      <div id="tinTuc">
        <News />
      </div>
    </div>
  );
}
