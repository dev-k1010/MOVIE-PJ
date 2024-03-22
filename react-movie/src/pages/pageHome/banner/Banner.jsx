import React, { memo, useState } from "react";
import Slider from "react-slick";
import Lottie from "lottie-react";
import styled from "styled-components";
import animateSrc from "./animationPlayVideo.json";
import ReactPlayer from "react-player";

function Banner(props) {
  const { listBanner } = props;
  const [isOpen, setOpen] = useState(false);
  const items = [
    {
      trailer: "uqJ9u7GSaYM",
    },
    {
      trailer: "kBY2k3G6LsM",
    },
    {
      trailer: "JNZv1SgHv68",
    },
  ];
  const settings = {
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Container className="Banner">
      <div>
        <Slider {...settings}>
          {listBanner.map((banner, i) => (
            <div key={i}>
              <div
                className="h-screen bg-bottom bg-cover bg-no-repeat flex justify-center items-center group"
                style={{
                  backgroundImage: `url(${banner.hinhAnh})`,
                }}
              >
                {!isOpen ? (
                  <button className="w-48 h-28" onClick={() => setOpen(true)}>
                    <Lottie animationData={animateSrc} loop={true} />
                  </button>
                ) : (
                  <div className=" w-full h-full flex justify-center items-center invisible group-hover:visible bg-black/75">
                    <div className="w-3/5 h-3/5  relative">
                      <div className="w-full ">
                        <ReactPlayer
                          url={`https://www.youtube.com/watch?v=${items[i].trailer}`}
                          controls
                          width="100%"
                          height="70vh"
                        />
                      </div>
                      <button
                        onClick={() => setOpen(false)}
                        className="absolute -top-5 -right-5 text-2xl text-white"
                      >
                        X
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </Container>
  );
}

export default memo(Banner);

export const Container = styled.div`
  &.Banner {
    .slick-prev {
      left: 10px;
      z-index: 1;
      width: initial;
      height: initial;
      &::before {
        font-size: 35px;
      }
    }
    .slick-next {
      right: 10px;
      width: initial;
      height: initial;
      &::before {
        font-size: 35px;
      }
    }
    .slick-dots {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      width: auto;
      button {
        &:before {
          color: white;
          font-size: 15px;
        }
      }
    }
    .slick-active {
      button {
        &:before {
          opacity: 1;
        }
      }
    }
  }
`;
