import { Button, Flex, Image, Modal, Statistic, Typography } from "antd";
import React, { useState } from "react";
import { Link, useHref, useNavigate } from "react-router-dom";

import goBackIcon from "@/assets/images/goBackIcon.svg";
import iconEthereum from "@/assets/images/iconEthereum.svg";
import iconEthereumOrange from "@/assets/images/iconEthereumOrange.svg";
import imgNothing from "@/assets/images/nothing.png";
import { PageNav } from "@/components/PageNav";

import InscriptionGoodsTag from "../../assets/images/InscriptionGoodsTag.svg";
import WarriorsLogo from "../../assets/images/WarriorsLogo.png";
import { closePopup, openPopup, PopupSide } from "../../components/PopupSide";
import styles from "../../styles/Home.module.css";
import pageStyle from "./index.module.css";

export default function Home() {
  const navigate = useNavigate();

  // 一些页面数据
  const [goodsInfoData, setGoodsInfoData] = useState({
    logo: "logo",
    name: "Inscription Warriors",
    id: "#234",
    tag: "true",
    info: "Inscribed Warriors are 100 AI-generated unique digital inscriptions embodying valour from diverse cultures. Each warrior, carrying distinct symbols and backstory, represents the human spirit battling adversity. They also signify a blend of art, technology, and storytelling. Embrace courage, honour, and strength.",
    overview: [
      { name: "Floor Price", val: "114.55", type: "Ethereum" },
      { name: "Unit Price", val: "$0.0075", type: "Amount" },
      { name: "24h Sales", val: "2,229", type: "num" },
      { name: "24h Sales", val: "2,229", type: "num" },
      { name: "Market Cap", val: "$21,000,000", type: "Amount" },
      { name: "Owners", val: "21,000", type: "num" },
    ],
  });

  const [goodsListData, setGoodsListData] = useState({
    ListedNum: "278",
    OrdersNum: "123",
    List: [
      {
        id: "#2432",
        val: "50,000",
        protocolType: "ierc-m4",
        protocolVal: "/4,419 GWei",
        price: "$0.0091",
        type: "ETH",
        virtualPrice: "0.220928571",
        totalPrice: "$454.54",
        Seller:
          "0x371f0abbce1fcab655f65a18dfdad68061dcbd9d20526138b92bbe299284e0ca",
        TimeLeft: "05:23:51",
        isBuy: "true",
      },
      {
        id: "#2432",
        val: "50,000",
        protocolType: "ierc-m4",
        protocolVal: "/4,419 GWei",
        price: "$0.0091",
        type: "ETH",
        virtualPrice: "0.220928571",
        totalPrice: "$454.54",
        Seller:
          "0x371f0abbce1fcab655f65a18dfdad68061dcbd9d20526138b92bbe299284e0ca",
        TimeLeft: "05:23:51",
        isBuy: "true",
      },
      {
        id: "#2432",
        val: "50,000",
        protocolType: "ierc-m4",
        protocolVal: "/4,419 GWei",
        price: "$0.0091",
        type: "ETH",
        virtualPrice: "0.220928571",
        totalPrice: "$454.54",
        Seller:
          "0x371f0abbce1fcab655f65a18dfdad68061dcbd9d20526138b92bbe299284e0ca",
        TimeLeft: "05:23:51",
        isBuy: "true",
      },
    ],
    Order: [
      {
        Activity: "Deploy",
        Inscription: "xxxx",
        Amount: "500",
        Price: { val: "3.86", unit: "$ 0.093118", type: "ETH" },
        Total: { val: "3.86", unit: "$ 0.093118", type: "ETH" },
        TX: "0x371f0abbce1fcab655f65a18dfdad68061dcbd9d20526138b92bbe299284e0ca",
        Time: "2023/12/09 05:20:23",
      },
      {
        Activity: "Listing",
        Inscription: "xxxx",
        Amount: "500",
        Price: { val: "3.86", unit: "$ 0.093118", type: "ETH" },
        Total: { val: "3.86", unit: "$ 0.093118", type: "ETH" },
        TX: "0x371f0abbce1fcab655f65a18dfdad68061dcbd9d20526138b92bbe299284e0ca",
        Time: "2023/12/09 05:20:23",
      },
      {
        Activity: "Mint",
        Inscription: "xxxx",
        Amount: "500",
        Price: { val: "3.86", unit: "$ 0.093118", type: "ETH" },
        Total: { val: "3.86", unit: "$ 0.093118", type: "ETH" },
        TX: "0x371f0abbce1fcab655f65a18dfdad68061dcbd9d20526138b92bbe299284e0ca",
        Time: "2023/12/09 05:20:23",
      },
      {
        Activity: "Transfer",
        Inscription: "xxxx",
        Amount: "500",
        Price: { val: "3.86", unit: "$ 0.093118", type: "ETH" },
        Total: { val: "3.86", unit: "$ 0.093118", type: "ETH" },
        TX: "0x371f0abbce1fcab655f65a18dfdad68061dcbd9d20526138b92bbe299284e0ca",
        Time: "2023/12/09 05:20:23",
      },
    ],
  });
  const [changeName, setChangeName] = useState("Listed");

  const [curArr, setCurArr] = useState([]);
  const [navData, setNavData] = useState({
    max: 280,
    cur: 1,
    unit: 10,
  });
  const { Text } = Typography;

  const EllipsisMiddle: React.FC<{
    suffixCount: number;
    className: any;
    children: string;
  }> = ({ suffixCount, className, children }) => {
    const start = children.slice(0, children.length - suffixCount).trim();
    const suffix = children.slice(-suffixCount).trim();

    return (
      <Text
        className={className}
        style={{ maxWidth: "30rem", width: "100%" }}
        ellipsis={{ suffix }}
      >
        {start}
      </Text>
    );
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setIsModalData] = useState({
    goods: {
      protocol: {
        type: "ierc-m4",
        val: "/4,419 GWei",
      },
      id: "#2432",
      TX: "0x371f0abbce1fcab655f65a18dfdad68061dcbd9d20526138b92bbe299284e0ca",
      total: "50,000",

      val: "0.5496",
      type: "ETH",
      price: "$100",
    },

    service: {
      val: "0.5496",
      type: "ETH",
      price: "$100",
    },
    total: {
      val: "0.5496",
      type: "ETH",
      price: "$100",
    },
    network: {
      val: "0.5496",
      type: "ETH",
      price: "$100",
    },
    pay: {
      val: "0.5496",
      type: "ETH",
      price: "$100",
    },
    balance: {
      val: "0.5496",
      type: "ETH",
      price: "$100",
    },
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOpen = (TX) => {
    console.log(TX);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container} data-theme="fantasy">
      <div className={`${"min-h-screen"} ${pageStyle.background}`}>
        <div className={pageStyle.content}>
          <div style={{ width: "100%", padding: "2.6rem 0 1.6rem 0" }}>
            <Link to={-1}>
              {/*<div>{goodsInfoData.logo}</div>*/}
              <Image height={"2rem"} src={goBackIcon} preview={false} />
            </Link>
          </div>

          <Modal
            title={"Purchase Confirmation"}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <div className={pageStyle.goodsInfoBox}>
              <div className={"text1 infoBrownColor"}>{modalData.goods.id}</div>
              <div className={"text2p56 mainBrownColor"}>
                {modalData.goods.total}
              </div>
              <div className={"text1 infoBrownColor"}>
                <span className={"text1 mainBrownColor"}>
                  {modalData.goods.protocol.type}
                </span>
                {modalData.goods.protocol.val}
              </div>
              <div className={"text1 infoBrownColor"}>
                {modalData.goods.price}
              </div>
            </div>
            <Flex
              vertical={false}
              justify={"center"}
              align="center"
              className={"text1p26 mainColor"}
              style={{ width: "100%", paddingTop: "1rem" }}
            >
              Purchase Confirmation
            </Flex>
            <div
              className={`${"ptb1"} ${pageStyle.goodsCurPriceBox}`}
              style={{ margin: 0 }}
            >
              <div className={"text1 infoBrownColor"}>Service Fee</div>
              <div className={"text1 mainColor"}>
                {modalData.service.val +
                  " " +
                  modalData.service.type +
                  " ≈ " +
                  modalData.service.price}
              </div>
            </div>

            <Flex
              className={`${"ptb1"} `}
              vertical={false}
              justify={"space-between"}
              align="center"
              style={{ width: "100%" }}
            >
              <div className={"text1 infoBrownColor"}>Total Value</div>
              <div className={"text1 mainColor"}>
                {modalData.total.val +
                  " " +
                  modalData.total.type +
                  " ≈ " +
                  modalData.total.price}
              </div>
            </Flex>

            <Flex
              className={`${"ptb1"} `}
              vertical={false}
              justify={"space-between"}
              align="center"
              style={{ width: "100%", borderBottom: "0.04rem solid #E7AF4E" }}
            >
              <div className={"text1 infoBrownColor"}>Network Fee</div>
              <div className={"text1 mainColor"}>
                {modalData.network.val +
                  " " +
                  modalData.network.type +
                  " ≈ " +
                  modalData.network.price}
              </div>
            </Flex>

            <Flex
              className={`${"ptb1"} `}
              vertical={false}
              justify={"space-between"}
              align="center"
              style={{ width: "100%" }}
            >
              <div className={"text1 pointBrownColor"}>You Pay</div>
              <div className={"text1 mainColor"}>
                {modalData.pay.val +
                  " " +
                  modalData.pay.type +
                  " ≈ " +
                  modalData.pay.price}
              </div>
            </Flex>
            <Flex
              className={`${"ptb1"} `}
              vertical={false}
              justify={"space-between"}
              align="center"
              style={{ width: "100%" }}
            >
              <div className={"text1 infoBrownColor"}>Available Balance</div>
              <div className={"text1 mainColor"}>
                {modalData.balance.val + modalData.balance.type}
              </div>
            </Flex>

            <button
              onClick={() => handleOpen(modalData.goods.id)}
              className={`${"btn"} ${pageStyle.btn2}`}
            >
              Confirm
            </button>
          </Modal>

          <div className={pageStyle.infoCard}>
            <div className={pageStyle.logoBox}>
              {/*<div>{goodsInfoData.logo}</div>*/}
              <Image height={"100%"} src={WarriorsLogo} preview={false} />
            </div>
            <div className={pageStyle.infoBox}>
              <div className={pageStyle.infoNameBox}>
                <div
                  className={"text2 mainColor"}
                  style={{ paddingRight: "1.6rem" }}
                >
                  {goodsInfoData.name}
                </div>
                <div className={"text2 mainColor "}>{goodsInfoData.id}</div>
                {/*<div>{goodsInfoData.tag}</div>*/}
                <div style={{ paddingLeft: "0.6rem" }}>
                  <Image
                    width={"2rem"}
                    src={InscriptionGoodsTag}
                    preview={false}
                  />
                </div>
              </div>
              <div className={"info infoColor"}>{goodsInfoData.info}</div>
            </div>
          </div>

          <div className={pageStyle.overviewListCard}>
            {goodsInfoData.overview.map((item, idx) => (
              <div key={idx} className={pageStyle.overviewItem}>
                {/*
                <div className={`${"text1 infoColor"}`}>{item.name}</div>
                <div className={`${"text1p26 mainColor"}`}>
                    <div>{item.type}</div>
                  <div>{item.val}</div>
                </div>
                */}
                <Statistic
                  title={item.name}
                  value={item.val}
                  prefix={
                    item.name == "Floor Price" ? (
                      <Flex vertical justify={"center"} align="center">
                        <Image
                          height={"1.26rem"}
                          src={iconEthereum}
                          preview={false}
                        ></Image>
                      </Flex>
                    ) : (
                      ""
                    )
                  }
                />
              </div>
            ))}
          </div>

          <div className={`${"text1p75 mainColor"} ${pageStyle.paginCard}`}>
            <div
              className={`${pageStyle.selectItem}`}
              onClick={() => setChangeName("Listed")}
            >
              {"Listed(" + goodsListData.ListedNum + ")"}
              <div
                className={`${
                  changeName == "Listed" ? pageStyle.selectPagin : ""
                }`}
              ></div>
            </div>
            <div
              onClick={() => setChangeName("Order")}
              className={`${pageStyle.selectItem}`}
            >
              {"Order(" + goodsListData.OrdersNum + ")"}
              <div
                className={`${
                  changeName == "Order" ? pageStyle.selectPagin : ""
                }`}
              ></div>
            </div>
          </div>
          {changeName == "Listed" ? (
            <>
              <div className={pageStyle.goodsListCard}>
                {goodsListData.List.map((item, idx) => (
                  <div key={idx} className={pageStyle.goodsItem}>
                    <div className={pageStyle.goodsInfoBox}>
                      <div className={"text1 infoBrownColor"}>{item.id}</div>
                      <div className={"text2p56 mainBrownColor"}>
                        {item.val}
                      </div>
                      <div className={"text1 infoBrownColor"}>
                        <span className={"text1 mainBrownColor"}>
                          {item.protocolType}
                        </span>
                        {item.protocolVal}
                      </div>
                      <div className={"text1 infoBrownColor"}>{item.price}</div>

                      <div className={pageStyle.goodsCurPriceBox}>
                        <div className={pageStyle.goodsCurPrice}>
                          {item.type == "ETH" ? (
                            <Flex
                              vertical
                              justify={"center"}
                              align="center"
                              style={{ marginRight: "0.25rem" }}
                            >
                              <Image
                                height={"1.26rem"}
                                src={iconEthereumOrange}
                                preview={false}
                              ></Image>
                            </Flex>
                          ) : (
                            <></>
                          )}

                          <div className={"text1 pointBrownColor"}>
                            {item.virtualPrice}
                          </div>
                        </div>
                        <div className={"text1 pointBrownColor"}>
                          {item.totalPrice}
                        </div>
                      </div>
                    </div>
                    <Flex
                      vertical={false}
                      justify={"space-between"}
                      align="center"
                      style={{ width: "100%", padding: "1rem 0 1rem 0" }}
                    >
                      <div
                        className={"text1 infoBrownColor"}
                        style={{ marginRight: "1rem" }}
                      >
                        Seller
                      </div>
                      <div
                        className={"text1 mainBrownColor"}
                        style={{ width: "100%" }}
                      >
                        <EllipsisMiddle
                          className={`${pageStyle.middleOmit}`}
                          suffixCount={3}
                        >
                          {item.Seller}
                        </EllipsisMiddle>
                      </div>
                    </Flex>

                    <Flex
                      vertical={false}
                      justify={"space-between"}
                      align="center"
                      style={{ width: "100%", paddingBottom: "1rem" }}
                    >
                      <div className={"text1 infoBrownColor"}>Time Left</div>
                      <div className={"text1 mainBrownColor"}>
                        {item.TimeLeft}
                      </div>
                    </Flex>
                    <button
                      onClick={() => handleOpen(item.Seller)}
                      className={`${"btn"} ${pageStyle.btn}`}
                    >
                      Buy
                    </button>
                  </div>
                ))}
              </div>
              <div>
                <PageNav person={{ navData, curArr, setNavData, setCurArr }} />
              </div>
            </>
          ) : goodsListData.Order.length > 0 ? (
            <>
              <div className={`${"overflow-x-auto"} ${pageStyle.overflowXFix}`}>
                <table className={`${"table"} ${pageStyle.tableBox}`}>
                  {/*<!-- head -->*/}
                  <thead className={pageStyle.tableBox}>
                    <tr>
                      <th>Activity</th>
                      <th>Inscription</th>
                      <th>Amount</th>
                      <th>Price</th>
                      <th>Total</th>
                      <th>TX</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {goodsListData.Order.map((item, idx) => (
                      <tr
                        key={idx}
                        onClick={() => navigate("/placeDetails/orderDetails")}
                      >
                        <td
                          className={`${pageStyle.tableItemTd} ${"text1p75"} ${
                            item.Activity == "Deploy"
                              ? "pointBrownColor"
                              : item.Activity == "Listing"
                              ? "successColor"
                              : item.Activity == "Mint"
                              ? "errorColor"
                              : "infoColor"
                          }`}
                        >
                          {item.Activity}
                        </td>
                        <td
                          className={`${
                            pageStyle.tableItemTd
                          } ${"text1p26 mainColor"}`}
                        >
                          {item.Inscription}
                        </td>
                        <td
                          className={`${
                            pageStyle.tableItemTd
                          } ${"text1p26 mainColor"}`}
                        >
                          {item.Amount}
                        </td>

                        <td className={`${pageStyle.tableItemTd}`}>
                          <Flex
                            vertical
                            justify={"space-between"}
                            align="center"
                          >
                            <Flex
                              vertical={false}
                              justify={"center"}
                              align="center"
                            >
                              <div className={`${"text1p26 mainColor"}`}>
                                {item.Price.val}
                              </div>
                              <div className={pageStyle.tableIconBox}>
                                <img
                                  className={`${pageStyle.tableIcon}`}
                                  src={
                                    item.Price.type == "ETH" ? iconEthereum : ""
                                  }
                                  alt="icon"
                                  width={30}
                                  height={30}
                                />
                              </div>
                            </Flex>
                            <div className={`${"text1 mainColor"}`}>
                              {item.Price.unit}
                            </div>
                          </Flex>
                        </td>

                        <td className={`${pageStyle.tableItemTd}`}>
                          <Flex
                            vertical
                            justify={"space-between"}
                            align="center"
                          >
                            <Flex
                              vertical={false}
                              justify={"center"}
                              align="center"
                            >
                              <div className={`${"text1p26 mainColor"}`}>
                                {item.Total.val}
                              </div>
                              <div className={pageStyle.tableIconBox}>
                                <img
                                  className={`${pageStyle.tableIcon}`}
                                  src={
                                    item.Total.type == "ETH" ? iconEthereum : ""
                                  }
                                  alt="icon"
                                  width={30}
                                  height={30}
                                />
                              </div>
                            </Flex>
                            <div className={`${"text1 mainColor"}`}>
                              {item.Total.unit}
                            </div>
                          </Flex>
                        </td>
                        <td
                          className={`${pageStyle.tableItemTd}`}
                          style={{
                            display: "flex",
                            alignContent: "center",
                            justifyContent: "center",
                          }}
                        >
                          <EllipsisMiddle
                            className={`${pageStyle.middleOmit}`}
                            suffixCount={3}
                          >
                            {item.TX}
                          </EllipsisMiddle>
                        </td>

                        <td
                          className={`${
                            pageStyle.tableItemTd
                          } ${"text1 mainBrownColor"}`}
                        >
                          {item.Time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <PageNav person={{ navData, curArr, setNavData, setCurArr }} />
            </>
          ) : (
            <div
              className={`${pageStyle.nothingBox}`}
              style={{ marginTop: "0rem" }}
            >
              <Image width={"100%"} src={imgNothing} preview={false} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
