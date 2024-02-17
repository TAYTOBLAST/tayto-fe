import { Button, Flex, Image, Modal, Statistic, Typography } from "antd";
import React, { useState } from "react";
import { Link, useHref, useNavigate } from "react-router-dom";

import goBackIcon from "@/assets/images/goBackIcon.svg";
import iconEthereum from "@/assets/images/iconEthereum.svg";
import iconEthereumOrange from "@/assets/images/iconEthereumOrange.svg";
import imgNothing from "@/assets/images/nothing.png";
import iconValidity from "@/assets/images/validity.svg";
import iconValidityError from "@/assets/images/validityError.svg";
import { PageNav } from "@/components/PageNav";

import uploadIcon from "../../../assets/images/uploadIcon.svg";
import WarriorsLogo from "../../../assets/images/WarriorsLogo.png";
import {
  closePopup,
  openPopup,
  PopupSide,
} from "../../../components/PopupSide";
import styles from "../../../styles/Home.module.css";
import pageStyle from "./index.module.css";

export default function Home() {
  // 一些页面数据
  const [goodsInfoData, setGoodsInfoData] = useState({
    logo: "logo",
    addr: "0x6525ca8ba275be76b5c5748eee8fe29bb1ee11da16daf892d5f0a9e90819de3f",
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
        Cost: "0.22E($454.54)",
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
        Cost: "0.22E($454.54)",
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
        Cost: "0.22E($454.54)",
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
  const [changeName, setChangeName] = useState("Portfolio");

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
    style: any;
    children: string;
  }> = ({ suffixCount, className, style, children }) => {
    const start = children.slice(0, children.length - suffixCount).trim();
    const suffix = children.slice(-suffixCount).trim();

    return (
      <Text className={className} style={style} ellipsis={{ suffix }}>
        {start}
      </Text>
    );
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCheckoutOpen, setIsModalCheckoutOpen] = useState(false);
  const [isModalTransferOpen, setIsModalTransferOpen] = useState(false);

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

  const [inputList, setInputList] = useState([
    {
      key: "input1",
      title: "Transfer",
      defaultText: "Enter transfer address",
      type: "text",
      errorText: "4 character like “abcd....",
      isTextError: false, // 输入框背景变红 输入框内提示错误信息 输入框下提示错误信息
      isIconState: false,
      isIconDisplay: false,
      inputVal: "",
      isTextarea: false,
    },
    {
      key: "input1",
      title: "Amount",
      defaultText: "Enter amount",
      type: "text",
      errorText: "4 character like “abcd....",
      isTextError: false, // 输入框背景变红 输入框内提示错误信息 输入框下提示错误信息
      isIconState: false,
      isIconDisplay: false,
      inputVal: "",
      isTextarea: false,
    },
  ]);
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);

  function testInput(idx) {
    let isPass = false;

    switch (idx) {
      case 0:
        if (false) {
          inputList[idx].isIconDisplay = true;
          inputList[idx].isIconState = true;
          inputList[idx].isTextError = false;
          isPass = true;
        } else {
          inputList[idx].isIconDisplay = true;
          inputList[idx].isIconState = false;
          inputList[idx].isTextError = true;
        }

        break;
      case 1:
        if (Number(inputList[idx].inputVal) > 0) {
          inputList[idx].isIconDisplay = true;
          inputList[idx].isIconState = true;
          inputList[idx].isTextError = false;
          isPass = true;
        } else {
          inputList[idx].isIconDisplay = true;
          inputList[idx].isIconState = false;
          inputList[idx].isTextError = true;
        }

        break;
    }

    setInputList([...inputList]);

    return isPass;
  }

  function InputFormItem({ person, idx }) {
    const [inputData, setInputData] = useState(person.inputVal);

    return (
      <>
        <label className="form-control w-full">
          <div
            className={`${"text1p26 pointBrownColor"} ${
              pageStyle.itemTitleBox
            }`}
          >
            <span className={pageStyle.itemTitle}>{person.title}</span>
          </div>
          <div className={pageStyle.itemInputBox}>
            {person.isTextarea ? (
              <textarea
                placeholder={
                  person.isTextError ? person.errorText : person.defaultText
                }
                className={`${"input input-bordered w-full"} ${
                  pageStyle.itemTextarea
                } ${person.isTextError ? pageStyle.iremInputError : ""}`}
                disabled={isConfirmLoading}
                value={inputData}
                onBlur={(e) => testInput(idx, e.target.value)}
                onChange={(e) => {
                  setInputData(e.target.value);
                  inputList[idx].inputVal = e.target.value;
                }}
              />
            ) : (
              <input
                type={person.type}
                form="form1"
                placeholder={
                  person.isTextError ? person.errorText : person.defaultText
                }
                className={`${"input input-bordered w-full"} ${
                  pageStyle.itemInput
                } ${person.isTextError ? pageStyle.iremInputError : ""}`}
                disabled={isConfirmLoading}
                value={inputData}
                onBlur={(e) => testInput(idx, e.target.value)}
                onChange={(e) => {
                  setInputData(e.target.value);
                  inputList[idx].inputVal = e.target.value;
                }}
              />
            )}
            {person.isIconDisplay ? (
              <div className={pageStyle.inputValidutyIcon}>
                <img
                  src={person.isIconState ? iconValidity : iconValidityError}
                  alt="upload"
                  width={32}
                  height={32}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
          {person.isTextError ? (
            <div className={pageStyle.inputValidutyText}>
              String must contain at least 4 character(s)
            </div>
          ) : (
            <></>
          )}
        </label>
      </>
    );
  }

  return (
    <div className={styles.container} data-theme="fantasy">
      <div className={`${"min-h-screen"} ${pageStyle.background}`}>
        <div className={pageStyle.content}>
          <Modal
            title={
              <div>
                List <span style={{ color: "#C68E2C" }}>ierc-m4</span> for sale
              </div>
            }
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
                {modalData.goods.protocol.type}
              </div>
            </div>

            <div
              className={`${"ptb1"} ${pageStyle.goodsCurPriceBox}`}
              style={{ margin: 0 }}
            >
              <div className={"text1 infoBrownColor"}>Service Fee</div>
              <div className={"text1 mainColor"}>
                {modalData.service.val + " " + modalData.service.type}
              </div>
            </div>
            <Flex
              vertical={false}
              justify={"center"}
              align="center"
              className={"text1 infoBrownColor"}
              style={{ width: "100%", paddingTop: "1rem" }}
            >
              <div style={{ marginRight: "0.6rem" }}>Floor Price </div>
              <div>{modalData.service.val + " " + modalData.service.type}</div>
            </Flex>
            <Flex
              className={`${"ptb1"} `}
              vertical={false}
              justify={"space-between"}
              align="center"
              style={{ width: "100%" }}
            >
              <div className={"text1 infoBrownColor"}>Expiration</div>
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
              <div className={"text1 infoBrownColor"}>Service Fee</div>
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
              <div className={"text1 infoBrownColor"}>Creator Royalty</div>
              <div className={"text1 mainColor"}>
                {modalData.pay.val +
                  " " +
                  modalData.pay.type +
                  " ≈ " +
                  modalData.pay.price}
              </div>
            </Flex>

            <Flex
              vertical={false}
              justify={"space-between"}
              align="center"
              style={{ width: "100%", paddingTop: "1rem" }}
            >
              <button className={`${"btn"} ${pageStyle.btn1}`}>Cancel</button>
              <button
                onClick={() => {
                  setIsModalCheckoutOpen(true);
                  setIsModalOpen(false);
                }}
                className={`${"btn"} ${pageStyle.btn2}`}
                style={{ margin: 0 }}
              >
                Depositing...
              </button>
            </Flex>
          </Modal>

          <Modal
            title={"Checkout"}
            open={isModalCheckoutOpen}
            onOk={() => setIsModalCheckoutOpen(false)}
            onCancel={() => setIsModalCheckoutOpen(false)}
          >
            <div className={pageStyle.goodsInfoBox}>
              <div className={"text1 infoBrownColor"}>{modalData.goods.id}</div>
              <div className={"text2p56 mainBrownColor"}>
                {modalData.goods.total}
              </div>
              <div className={"text1 infoBrownColor"}>
                {modalData.goods.protocol.type}
              </div>
            </div>

            <Flex
              vertical={false}
              justify={"center"}
              align="center"
              className={"text1 infoBrownColor"}
              style={{ width: "100%", paddingTop: "1rem" }}
            >
              <div style={{ marginRight: "0.6rem" }}>Price </div>
              <div>{modalData.service.val + " " + modalData.service.type}</div>
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
              vertical={false}
              justify={"space-between"}
              align="center"
              style={{ width: "100%", paddingTop: "1rem" }}
            >
              <button
                onClick={() => setIsModalCheckoutOpen(false)}
                className={`${"btn"} ${pageStyle.btn1}`}
                style={{ width: "40%" }}
              >
                Cancel
              </button>
              <button
                className={`${"btn"} ${pageStyle.btn2}`}
                style={{ margin: 0, width: "60%" }}
              >
                ...
              </button>
            </Flex>
          </Modal>

          <Modal
            title={"Transfer Inscription"}
            open={isModalTransferOpen}
            onOk={() => setIsModalTransferOpen(false)}
            onCancel={() => setIsModalTransferOpen(false)}
            width="50rem"
          >
            {inputList.map((item, idx) => (
              <InputFormItem
                key={item.toString()}
                person={{ ...item }}
                idx={idx}
              />
            ))}
            <Button
              className={`${"btn btn-block mt-6"} ${pageStyle.btn2}`}
              loading={isConfirmLoading}
              style={{
                height: "3.4rem",
                width: "80%",
                margin: "0 10%",
                marginTop: "3.75rem",
              }}
            >
              Confirm
            </Button>
          </Modal>

          <div className={pageStyle.infoCard} style={{ marginTop: "4rem" }}>
            <div className={pageStyle.logoBox}>
              {/*<div>{goodsInfoData.logo}</div>*/}
              <Image height={"6rem"} src={WarriorsLogo} preview={false} />
            </div>
            <div className={pageStyle.infoBox} style={{ width: "100%" }}>
              <div className={pageStyle.infoNameBox} style={{ width: "100%" }}>
                <Flex
                  vertical={false}
                  justify="flex-start"
                  align="center"
                  className={"text2 mainColor"}
                  style={{ width: "100%" }}
                >
                  <EllipsisMiddle
                    className={`${pageStyle.middleOmit}`}
                    style={{ maxWidth: "47rem", width: "100%" }}
                    suffixCount={3}
                  >
                    {goodsInfoData.addr}
                  </EllipsisMiddle>
                  <div style={{ paddingLeft: "0.6rem" }}>
                    <Image width={"2rem"} src={uploadIcon} preview={false} />
                  </div>
                </Flex>
              </div>
              {/*<div>{goodsInfoData.tag}</div>*/}
            </div>
          </div>

          <div className={`${"text1p75 mainColor"} ${pageStyle.paginCard}`}>
            <div
              className={`${pageStyle.selectItem}`}
              onClick={() => setChangeName("Portfolio")}
            >
              Portfolio
              <div
                className={`${
                  changeName == "Portfolio" ? pageStyle.selectPagin : ""
                }`}
              ></div>
            </div>
            <div
              onClick={() => setChangeName("Recent")}
              className={`${pageStyle.selectItem}`}
            >
              Recent Activity
              <div
                className={`${
                  changeName == "Recent" ? pageStyle.selectPagin : ""
                }`}
              ></div>
            </div>
          </div>
          {changeName == "Portfolio" ? (
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
                        {item.protocolType}
                      </div>
                    </div>

                    <Flex
                      vertical={false}
                      justify={"space-between"}
                      align="center"
                      style={{ width: "100%", padding: "1rem 0" }}
                    >
                      <div className={"text1 infoBrownColor"}>Cost</div>
                      <div className={"text1 mainBrownColor"}>{item.Cost}</div>
                    </Flex>

                    <Flex
                      vertical={false}
                      justify={"space-between"}
                      align="center"
                      style={{ width: "100%", padding: "1rem 0" }}
                    >
                      <button
                        onClick={() => handleOpen(item.Seller)}
                        className={`${"btn"} ${pageStyle.btn}`}
                      >
                        List
                      </button>
                      <button
                        onClick={() => setIsModalTransferOpen(true)}
                        className={`${"btn"} ${pageStyle.btn3}`}
                        style={{ margin: 0 }}
                      >
                        Transfer
                      </button>
                    </Flex>
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
                      <tr key={idx}>
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
                            style={{ maxWidth: "30rem", width: "100%" }}
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
