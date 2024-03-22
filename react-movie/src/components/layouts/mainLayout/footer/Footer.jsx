import React, { memo, useEffect } from "react";
import { logo2 } from "./dataImg/footer-icon-2";
import { logo1 } from "./dataImg/footer-icon-1";
import { dataImage } from "./ImageFooter";

function Footer() {
  const anhFooter = dataImage;
  return (
    <div className="bg-black">
      <div className="pt-10">
        <div className="grid grid-cols-4 bg-black mx-40">
          {/* TIX */}
          <div className=" col-span-1 text-white space-y-5">
            <h2 className="text-xl font-semibold ">TIX</h2>
            <div className="space-y-2 text-gray-300">
              <p className="hover:text-color4">FAQ</p>
              <p className="hover:text-color4">Brand Guidelines</p>
              <p className="hover:text-color4">Thỏa thuận sử dụng</p>
              <p className="hover:text-color4">Chính sách bảo mật</p>
            </div>
          </div>
          {/* Đố tác */}
          <div className=" col-span-1 text-white space-y-5">
            <h2 className="text-xl font-semibold text-center">ĐỐI TÁC</h2>
            <div className="align-top">
              <div className="grid md:grid-cols-3 grid-cols-2 justify-items-center">
                {anhFooter.map((item, index) => (
                  <div
                    key={index}
                    className="h-10 w-10 small_wh rounded-full mb-4"
                    style={{
                      backgroundImage: `url(${item.url})`,
                      backgroundSize: "cover",
                    }}
                  >
                    <a
                      href={item.href}
                      className="hover:text-white cursor-pointer h-full w-full inline-block"
                      style={{
                        color: "#9e9e9e",
                      }}
                    ></a>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-2 grid-rows-2">
            {/* MOBILE APP */}
            <div className=" col-span-1  text-white space-y-5 ">
              <h2 className="text-xl font-semibold text-center">MOBILE APP</h2>
              <div className="flex justify-center space-x-5">
                <div
                  className="h-10 w-10 small_wh mb-4 rounded-full"
                  style={{
                    backgroundImage:
                      "url(https://logos-world.net/wp-content/uploads/2021/02/App-Store-Logo.png)",
                    backgroundSize: "cover",
                    backgroundPosition: " center center ",
                  }}
                >
                  <a
                    href="https://www.apple.com/vn/app-store/"
                    className="hover:text-white cursor-pointer h-full w-full inline-block"
                    style={{
                      color: "#9e9e9e",
                    }}
                  ></a>
                </div>
                <div
                  className="h-10 w-10 small_wh   rounded-full bg-white"
                  style={{
                    backgroundImage: `url( 'IMG/gg-play.png')`,
                    backgroundSize: "cover",
                    backgroundPosition: " 2px center",
                  }}
                >
                  <a
                    href="https://play.google.com/"
                    className="hover:text-white cursor-pointer h-full w-full inline-block"
                    style={{
                      color: "#9e9e9e",
                    }}
                  ></a>
                </div>
              </div>
            </div>

            {/*LIÊN HỆ */}
            <div className=" col-span-1 text-white space-y-5 ">
              <h2 className="text-xl font-semibold text-center">LIÊN HỆ</h2>
              <div className="flex justify-center space-x-5">
                <div
                  className="h-10 w-10 small_wh  rounded-full mb-4"
                  style={{
                    backgroundImage: `url( 'IMG/fb_icon.png')`,
                    backgroundSize: "cover",
                    backgroundPosition: " 0 0",
                  }}
                >
                  <a
                    href="https://www.facebook.com"
                    className="hover:text-white cursor-pointer h-full w-full inline-block"
                    style={{
                      color: "#9e9e9e",
                    }}
                  ></a>
                </div>
                <div
                  className="h-10 w-10 small_wh   rounded-full bg-white"
                  style={{
                    backgroundImage: `url( 'IMG/zalo-icon.jfif')`,
                    backgroundSize: "cover",
                    backgroundPosition: " 0 0",
                  }}
                >
                  <a
                    href="https://zalo.me/pc"
                    className="hover:text-white cursor-pointer h-full w-full inline-block"
                    style={{
                      color: "#9e9e9e",
                    }}
                  ></a>
                </div>
              </div>
            </div>

            {/* IMG */}
            <div className="flex justify-center items-center col-span-2 w-full">
              <div className=" col-span-1 flex items-center">
                <div className=" col-span-4 px-4 md:px-8" colSpan={2}>
                  <p className="text-xl text-white px-6 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-sm animate-bounce hover:cursor-pointer">
                    QUOC KHANG A_A
                  </p>
                </div>
                <img
                  src="/icon.png"
                  className="w-24 mb-3 md:mx-8 lg:ml-0 lg:m-4"
                />
              </div>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
}
export default memo(Footer);
