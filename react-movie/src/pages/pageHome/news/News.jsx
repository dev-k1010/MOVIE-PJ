import { Card, Tabs } from "antd";
import Meta from "antd/es/card/Meta";
import TabPane from "antd/es/tabs/TabPane";
import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import { Button } from "react-scroll";

function News() {
  const [newsDienAnhMore, setNewsDienAnhMore] = useState(null);
  const [newsReviewMore, setNewsReviewMore] = useState(null);
  const [newsKhuyenMaiMore, setNewsKhuyenMaiMore] = useState(null);
  const [seeMore, setSeeMore] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (newValue) => {
    console.log("🙂 ~ handleChange ~ newValue:", newValue);
    setValue(newValue);
  };
  const callAxios = (url, setState, boolSeeMore) => {
    return axios({
      url,
      method: "GET",
    })
      .then((result) => {
        setState(result.data);
        setSeeMore(boolSeeMore);
      })
      .catch((error) => console.log(error));
  };
  const renderNews = (newsArr) => {
    return (
      <div className="space-y-5">
        <div className=" overflow-hidden">
          <div className="grid grid-cols-2 gap-5 ">
            {/* item0 */}
            <div>
              <div>
                <a target="_blank" href={newsArr[0].url} rel="noreferrer">
                  <img
                    alt="poster"
                    src={newsArr[0].img}
                    className="w-full h-full rounded-md"
                    loading="lazy"
                  />
                </a>
              </div>
              <a
                target="_blank"
                href={newsArr[0].url}
                rel="noreferrer"
                className="text-xl text-color4 font-semibold hover:text-color1"
              >
                <p>{newsArr[0].title}</p>
              </a>
              <p className="text-start line-clamp-3 text-white">
                {newsArr[0].text}
              </p>
            </div>
            {/* item1 */}
            <div>
              <div>
                <a target="_blank" href={newsArr[1].url} rel="noreferrer">
                  <img
                    alt="poster"
                    src={newsArr[1].img}
                    className="w-full h-full rounded-md"
                    loading="lazy"
                  />
                </a>
              </div>
              <a
                target="_blank"
                href={newsArr[1].url}
                rel="noreferrer"
                className="text-xl text-color4 font-semibold hover:text-color1"
              >
                <p>{newsArr[1].title}</p>
              </a>
              <p className="text-start line-clamp-3 text-white">
                {newsArr[1].text}
              </p>
            </div>
          </div>
        </div>

        <div className=" grid grid-cols-10 gap-5 ">
          <div className="col-span-6">
            <div className="grid grid-cols-2 gap-5">
              {/* item2 */}
              <div>
                <div>
                  <a target="_blank" href={newsArr[2].url} rel="noreferrer">
                    <img
                      alt="poster"
                      src={newsArr[2].img}
                      className="w-full h-full rounded-md"
                      loading="lazy"
                    />
                  </a>
                </div>
                <a
                  target="_blank"
                  href={newsArr[2].url}
                  rel="noreferrer"
                  className="text-xl text-color4 font-semibold hover:text-color1"
                >
                  <p>{newsArr[2].title}</p>
                </a>
                <p className="text-start line-clamp-3 text-white">
                  {newsArr[2].text}
                </p>
              </div>
              {/* item3 */}
              <div>
                <div>
                  <a target="_blank" href={newsArr[3].url} rel="noreferrer">
                    <img
                      alt="poster"
                      src={newsArr[3].img}
                      className="w-full h-full rounded-md"
                      loading="lazy"
                    />
                  </a>
                </div>
                <a
                  target="_blank"
                  href={newsArr[3].url}
                  rel="noreferrer"
                  className="text-xl text-color4 font-semibold hover:text-color1"
                >
                  <p>{newsArr[3].title}</p>
                </a>
                <p className="text-start line-clamp-3 text-white">
                  {newsArr[3].text}
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-4 grid grid-cols-1 gap-3">
            {/* item4 */}
            <div className="flex space-x-5">
              <div>
                <a target="_blank" href={newsArr[4].url} rel="noreferrer">
                  <img
                    alt="poster"
                    src={newsArr[4].img}
                    className="rounded-md w-20"
                    loading="lazy"
                  />
                </a>
              </div>
              <a
                target="_blank"
                href={newsArr[4].url}
                rel="noreferrer"
                className="text-lg text-color4 font-semibold hover:text-color1"
              >
                <p>{newsArr[4].title}</p>
              </a>
            </div>
            {/* item5 */}
            <div className="flex space-x-5">
              <div>
                <a target="_blank" href={newsArr[5].url} rel="noreferrer">
                  <img
                    alt="poster"
                    src={newsArr[5].img}
                    className="rounded-md w-20"
                    loading="lazy"
                  />
                </a>
              </div>
              <a
                target="_blank"
                href={newsArr[5].url}
                rel="noreferrer"
                className="text-lg text-color4 font-semibold hover:text-color1"
              >
                <p>{newsArr[5].title}</p>
              </a>
            </div>
            {/* item6 */}
            <div className="flex space-x-5">
              <div>
                <a target="_blank" href={newsArr[6].url} rel="noreferrer">
                  <img
                    alt="poster"
                    src={newsArr[6].img}
                    className="rounded-md w-20"
                    loading="lazy"
                  />
                </a>
              </div>
              <a
                target="_blank"
                href={newsArr[6].url}
                rel="noreferrer"
                className="text-lg text-color4 font-semibold hover:text-color1"
              >
                <p c>{newsArr[6].title}</p>
              </a>
            </div>
            {/* item7 */}
            <div className="flex space-x-5">
              <div>
                <a target="_blank" href={newsArr[7].url} rel="noreferrer">
                  <img
                    alt="poster"
                    src={newsArr[7].img}
                    className="rounded-md w-24"
                    loading="lazy"
                  />
                </a>
              </div>
              <a
                target="_blank"
                href={newsArr[7].url}
                rel="noreferrer"
                className="text-lg text-color4 font-semibold hover:text-color1"
              >
                <p>{newsArr[7].title}</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const onClickSeeMore = () => {
    switch (value) {
      case 0:
        callAxios(
          `https://60b9f19280400f00177b744b.mockapi.io/ArticlesDienAnh02`,
          setNewsDienAnhMore,
          true
        );
        break;
      case 1:
        callAxios(
          `https://60babc8f42e1d0001761ff84.mockapi.io/ArticlesReview02`,
          setNewsReviewMore,
          true
        );
        break;
      case 2:
        callAxios(
          `https://60babc8f42e1d0001761ff84.mockapi.io/ArticlesKhuyenMai02`,
          setNewsKhuyenMaiMore,
          true
        );
      // eslint-disable-next-line no-fallthrough
      default:
        break;
    }
  };
  const onClickSeeLess = () => {
    setSeeMore(false);
  };
  const itemsButton = [
    {
      key: "0",
      label: (
        <button className="text-2xl transition duration-300 font-semibold rounded-lg shadow mr-2 hover:bg-white-500 text-white ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-color1 ">
          Điện ảnh 24H
        </button>
      ),
      children: (
        <>{seeMore && newsDienAnhMore && renderNews(newsDienAnhMore)}</>
      ),
    },
    {
      key: "1",
      label: (
        <button className="text-2xl transition duration-300 font-semibold rounded-lg shadow mr-2 hover:bg-white-500 text-white ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-color1 ">
          Review
        </button>
      ),
      children: <></>,
    },
    {
      key: "2",
      label: (
        <button className="text-2xl transition duration-300 font-semibold rounded-lg shadow mr-2 hover:bg-white-500 text-white ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-color1 ">
          Khuyến mãi
        </button>
      ),
      children: <></>,
    },
  ];
  return (
    <div className=" py-10">
      <Tabs
        defaultActiveKey="0"
        centered
        destroyInactiveTabPane={true}
        className="px-7 md:px-5 "
        onChange={handleChange}
      >
        {itemsButton.map((item) => (
          <TabPane
            className="px-32"
            tab={<span className=" text-black text-xs">{item.label}</span>}
            key={item.key}
          >
            {item.children}
          </TabPane>
        ))}
      </Tabs>
      <div className="flex flex-col justify-center items-center mt-5">
        <Button
          onClick={seeMore ? onClickSeeLess : onClickSeeMore}
          className="px-4 py-2 bg-color4 rounded-md"
          variant="outlined"
        >
          {seeMore ? "RÚT GỌN" : "XEM THÊM"}
        </Button>
      </div>
    </div>
  );
}
export default memo(News);
