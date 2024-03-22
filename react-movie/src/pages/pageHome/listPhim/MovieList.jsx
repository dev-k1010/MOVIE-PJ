import { PlayCircleOutlined } from "@ant-design/icons";
import { Popover, Rate, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import React, { memo, useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate, useSearchParams } from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";
import Carditem from "../../cardItem/Carditem";

function MovieList(props) {
  const [search, setSearch] = useSearchParams({
    phimdangchieu: true,
  });
  const navigate = useNavigate();
  const { listPhim } = props;
  const [isTrailerOpen, setTrailerOpen] = useState(false);
  const [selectedPhim, setSelectedPhim] = useState(null);
  const settings = {
    className: "center ",
    infinite: true,
    centerPadding: "2px",
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    rows: 1,
    cssEase: "ease-in-out",

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  const renderTrailer = (phim) => {
    setTrailerOpen(true);
    setSelectedPhim(phim);
  };
  const closeTrailer = () => {
    setTrailerOpen(false);
    setSelectedPhim(null);
  };
  const renderMovieSlider = (movies, filterFunc) => {
    const filteredMovies = [...movies].reverse().filter(filterFunc);
    let customSettings = { ...settings };

    if (filteredMovies.length < 4) {
      customSettings = {
        ...settings,
        slidesToShow: 1,
        className: "center px-[450px]", // Thêm className mới ở đây
      };
    }
    return (
      <Slider {...customSettings}>
        {filteredMovies.map((phim, i) => (
          <>
            <Carditem
              key={i}
              phim={phim}
              navigate={navigate}
              renderTrailer={renderTrailer}
            />
          </>
        ))}
      </Slider>
    );
  };
  const createButton = (label, value, isActive) => (
    <button
      onClick={() => setSearch({ phimdangchieu: value })}
      className={`text-lg transition duration-300 p-2 font-semibold rounded-lg shadow mr-2 hover:bg-white-500 ${
        isActive ? "bg-color3 text-white" : " text-white"
      }`}
    >
      {label}
    </button>
  );
  const itemSlider = [
    {
      key: "1",
      label: createButton(
        "Đang chiếu",
        true,
        search.get("phimdangchieu") === "true"
      ),
      children: renderMovieSlider(listPhim, (phim) => phim.dangChieu === true),
    },
    {
      key: "2",
      label: createButton(
        "Sắp chiếu",
        false,
        search.get("phimdangchieu") === "false"
      ),
      children: renderMovieSlider(listPhim, (phim) => phim.dangChieu === true),
    },
  ];
  return (
    <Container className="MovieList container pb-10 pt-5 overflow-hidden">
      <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
        {itemSlider.map((item) => (
          <TabPane
            tab={<span className=" text-black text-xs">{item.label}</span>}
            key={item.key}
          >
            {item.children}
          </TabPane>
        ))}
      </Tabs>
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
    </Container>
  );
}
export default memo(MovieList);

const Container = styled.div`
  &.MovieList {
    .slick-prev {
      width: initial;
      height: initial;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      bottom: auto;
      z-index: 1;
      &::before {
        color: white;
        font-size: 30px;
      }
    }
    .slick-next {
      width: initial;
      height: initial;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      bottom: auto;
      z-index: 1;
      &::before {
        color: white;
        font-size: 30px;
      }
    }
  }
`;
