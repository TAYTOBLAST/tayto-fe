import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Button, Typography } from "antd";
import { ethers } from "ethers";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAccount, useSendTransaction } from "wagmi";

import iconArrowLeft from "@/assets/images/arrowLeft.svg";
import iconArrowRight from "@/assets/images/arrowRight.svg";
import iconValidity from "@/assets/images/validity.svg";
import iconValidityError from "@/assets/images/validityError.svg";
import { convertToHexa } from "@/utils";

import { closePopup, openPopup, PopupSide } from "../../components/PopupSide";
import styles from "../../styles/Home.module.css";
import pageStyle from "./index.module.css";

export default function Deploy() {
  const navigate = useNavigate();
  const { openConnectModal } = useConnectModal();

  const { isConnected, address } = useAccount();

  const [popupData, setPopupData] = useState({
    isShow: "init",
    status: "0",
    time: 0,
    progress: 0,
    hash: "",
  });

  const list = [
    {
      name: "NAME",
      status: "Success",
      total: "210000000",
      tx: "0x371f0abbce1fcab655f65a18dfdad68061dcbd9d20526138b92bbe299284e0ca",
      time: "19:00 02/10 2023",
    },
    {
      name: "NAME",
      status: "Fail",
      total: "210000000",
      tx: "0x371f0abbce1fcab655f65a18dfdad68061dcbd9d20526138b92bbe299284e0ca",
      time: "19:00 02/10 2023",
    },
    {
      name: "NAME",
      status: "Fail",
      total: "210000000",
      tx: "0x371f0abbce1fcab655f65a18dfdad68061dcbd9d20526138b92bbe299284e0ca",
      time: "19:00 02/10 2023",
    },
  ];
  const [inputList, setInputList] = useState([
    {
      key: "input1",
      title: "Tick",
      defaultText: "Enter Tick",
      type: "text",
      errorText: "4 character like “abcd....",
      isTextError: false, // 输入框背景变红 输入框内提示错误信息 输入框下提示错误信息
      isIconState: false,
      isIconDisplay: false,
      inputVal: "",
      isTextarea: false,
    },
    {
      key: "input2",
      title: "Total Supply",
      defaultText: "Enter Total Supply",
      type: "number",
      errorText: "Please enter an integer greater than 1",
      isTextError: false,
      isIconState: false,
      isIconDisplay: false,
      inputVal: "",
      isTextarea: false,
    },
    {
      key: "input3",
      title: "Limit Per Mint",
      defaultText: "Enter Limit Per Mint",
      type: "number",
      errorText: "Please enter an integer greater than 1",
      isTextError: false,
      isIconState: false,
      isIconDisplay: false,
      inputVal: "",
      isTextarea: false,
    },
    {
      key: "input4",
      title: "Narrative",
      defaultText: "Maximum 300 words",
      type: "text",
      errorText: "",
      isTextError: false,
      isIconState: false,
      isIconDisplay: false,
      inputVal: "",
      isTextarea: true,
    },
  ]);

  const [curArr, setCurArr] = useState([]);
  const [navData, setNavData] = useState({
    max: 280,
    cur: 1,
    unit: 10,
  });

  const hexData = convertToHexa(`data:,{"p":"blrc20","op":"deploy"}`.trim());
  const { sendTransactionAsync: deployTransactionAsync } = useSendTransaction({
    request: {
      to: address,
      value: ethers.utils.parseEther("0.000001"),
      data: hexData,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  async function send() {
    if (isConnected) {
      for (let i = 0; i < inputList.length; i++) {
        if (!testInput(i)) {
          return;
        }
      }

      setIsLoading(true);
      const tick = inputList[0].inputVal.trim();
      const max = inputList[1].inputVal;
      const lim = inputList[2].inputVal;
      const dec = inputList[3].inputVal;
      const hexData = convertToHexa(
        `data:,{"p":"erc-20","op":"deploy","tick":"${tick}","lim":${lim},"max":${max},"dec":"${dec}"}`.trim()
      );

      console.log("hexData", hexData);

      deployTransactionAsync?.({
        recklesslySetUnpreparedRequest: {
          to: address,
          value: ethers.utils.parseEther("0.000001"), //use formatUnits from viems, ethers is not supported anymore
          // 十六进制数据
          data: hexData,
        },
      })
        .then((r) => {
          openPopup(popupData, setPopupData, "1", null, r.hash);
          const timer1 = setInterval(() => {
            popupData.progress = popupData.progress + 5;
            setPopupData({ ...popupData });
          }, 1000);

          console.log("send result", r.hash);
          r.wait()
            .then((s) => {
              closePopup(popupData, setPopupData);
              openPopup(popupData, setPopupData, "2", null, r.hash);
              setTimeout(() => {
                setIsLoading(false);
                //跳转mint页面
                navigate("/deploy/info?hash=" + r.hash);
              }, 3000);
            })
            .finally(() => {
              clearInterval(timer1);
            });
        })
        .catch((e) => {
          closePopup(popupData, setPopupData);
          openPopup(popupData, setPopupData, "0", 10000);
          setIsLoading(false);
          console.log("error send", e);
        });
    } else {
      openConnectModal?.();
    }
  }

  function testInput(idx) {
    let isPass = false;

    switch (idx) {
      case 0:
        if (inputList[idx].inputVal.length == 4) {
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
      case 2:
        if (
          Number(inputList[idx].inputVal) > 0 &&
          Number(inputList[idx].inputVal) < Number(inputList[1].inputVal)
        ) {
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
      case 3:
        if (true) {
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
          <div className={`${"label"} ${pageStyle.itemTitleBox}`}>
            <span className={pageStyle.itemTitle}>{person.title}</span>
          </div>
          <div className={pageStyle.itemInputBox}>
            {person.isTextarea ? (
              <textarea
                type={person.type}
                placeholder={
                  person.isTextError ? person.errorText : person.defaultText
                }
                className={`${"input input-bordered w-full"} ${
                  pageStyle.itemTextarea
                } ${person.isTextError ? pageStyle.iremInputError : ""}`}
                disabled={isLoading}
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
                disabled={isLoading}
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
                  fill={true}
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

  {
    /*
                    .map((item, number) => {
                            <div>item</div>
                        })
                    */
  }

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
        style={{ maxWidth: "100%" }}
        ellipsis={{ suffix }}
      >
        {start}
      </Text>
    );
  };

  function PageNav() {
    const person = {
      max: 280,
      cur: 1,
      unit: 10,
    };
    const [curArr, setCurArr] = useState([]);
    const [navData, setNavData] = useState(person);

    function flippingCount() {
      const tmpCurArr = [];

      if (navData.cur < 5) {
        for (let i = 1; i < 6; i++) {
          tmpCurArr.push(i);
        }
      } else if (navData.cur >= 5 && navData.cur <= navData.max - 4) {
        for (let i = navData.cur - 1; i <= navData.cur + 1; i++) {
          tmpCurArr.push(i);
        }
      } else if (navData.cur > navData.max - 4) {
        for (let i = navData.max - 4; i <= navData.max; i++) {
          tmpCurArr.push(i);
        }
      }

      //curArr = tmpCurArr;
      setCurArr(tmpCurArr);
    }

    function flipping(num) {
      navData.cur = num;
      setNavData(navData);
      flippingCount();
    }

    function flippingPagination(num) {
      if (num > 0) {
        flipping(
          navData.cur + navData.unit < navData.max
            ? navData.cur + navData.unit
            : navData.max
        );
      } else {
        flipping(
          navData.cur - navData.unit > 1 ? navData.cur - navData.unit : 1
        );
      }

      flipping(navData.cur);
    }

    function flippingPaginationUnit() {
      if (navData.unit >= 1000) {
        navData.unit = 1;
      } else {
        navData.unit = navData.unit * 10;
      }

      flipping(navData.cur);
    }

    if (!curArr.length) {
      flipping(navData.cur);
    }

    return (
      <>
        <div className={pageStyle.pageNavView}>
          <div className={pageStyle.pageNavBox}>
            {navData.cur < 5 ? (
              curArr.map((item, idx) => (
                <div
                  className={`${pageStyle.pageNavItem} ${
                    item == navData.cur ? pageStyle.pageNavItemCur : ""
                  }`}
                  key={item.toString()}
                  value={item}
                  onClick={() => {
                    flipping(item);
                  }}
                >
                  {item}
                </div>
              ))
            ) : (
              <>
                <div className={pageStyle.pageNavArrowImg}>
                  <img
                    src={iconArrowLeft}
                    alt="ArrowLeft"
                    onClick={() => {
                      flippingPagination(-1);
                    }}
                    width={38}
                    height={22}
                  />
                </div>
                {navData.cur != 1 ? (
                  <div
                    className={`${pageStyle.pageNavItem} ${
                      1 == navData.cur ? pageStyle.pageNavItemCur : ""
                    }`}
                    onClick={() => {
                      flipping(1);
                    }}
                  >
                    1
                  </div>
                ) : (
                  <></>
                )}
                <div className={`${pageStyle.pageNavItem}`}>...</div>
              </>
            )}
          </div>

          {navData.cur >= 5 && navData.cur <= navData.max - 4 ? (
            curArr.map((item, idx) => (
              <div
                className={`${pageStyle.pageNavItem} ${
                  item == navData.cur ? pageStyle.pageNavItemCur : ""
                }`}
                key={item.toString()}
                value={item}
                onClick={() => {
                  flipping(item);
                }}
              >
                {item}
              </div>
            ))
          ) : (
            <></>
          )}

          <div className={pageStyle.pageNavBox}>
            {navData.cur > navData.max - 4 ? (
              curArr.map((item:any, idx) => (
                <div
                  className={`${pageStyle.pageNavItem} ${
                    item == navData.cur ? pageStyle.pageNavItemCur : ""
                  }`}
                  key={item?.toString()}
                  value={item}
                  onClick={() => {
                    flipping(item);
                  }}
                >
                  {item}
                </div>
              ))
            ) : (
              <>
                <div className={`${pageStyle.pageNavItem}`}>...</div>
                {navData.cur != navData.max ? (
                  <div
                    className={`${pageStyle.pageNavItem} ${
                      navData.max == navData.cur ? pageStyle.pageNavItemCur : ""
                    }`}
                    onClick={() => {
                      flipping(navData.max);
                    }}
                  >
                    {navData.max}
                  </div>
                ) : (
                  <></>
                )}
                <div className={pageStyle.pageNavArrowImg}>
                  <img
                    src={iconArrowRight}
                    alt="ArrowRight"
                    onClick={() => {
                      flippingPagination(1);
                    }}
                    width={38}
                    height={22}
                  />
                </div>
              </>
            )}
          </div>
          <div
            className={`${pageStyle.pageNavItem} ${pageStyle.pageNavItemCur}`}
            onClick={() => {
              flippingPaginationUnit();
            }}
          >
            {navData.unit + "/page"}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className={styles.container} data-theme="fantasy">
      <div className={`${"min-h-screen"} ${pageStyle.background}`}>
        <div className={pageStyle.backgroundItemA}></div>
        <div className={pageStyle.backgroundItemB}></div>
        <div className={pageStyle.backgroundItemC}></div>
        <div className={pageStyle.backgroundItemD}></div>

        <div className={pageStyle.content}>
          <div className={pageStyle.card}>
            <div className={pageStyle.cardTitle}>Deploy</div>
            <form id="form1">
              {inputList.map((item, idx) => (
                <InputFormItem
                  key={item.toString()}
                  value={item}
                  person={{ ...item }}
                  idx={idx}
                />
              ))}
            </form>

            {/*
                        <label className="form-control w-full">
                            <div className="label">
                                <span className={pageStyle.itemTitle}>Logo</span>
                            </div>

                            <div {...getRootProps()} className={pageStyle.itemFilesBox}>
                                <input {...getInputProps()} className={pageStyle.itemInput}/>
                                <div className={pageStyle.itemFilesImg}>
                                    <img
                                        src={iconImgUpload}
                                        alt="upload"
                                        width={32}
                                        height={32}

                                    />
                                </div>
                                <div className={pageStyle.itemFilesText}>
                                {
                                    isDragActive ?
                                    <p>Drop the files here ...</p> :
                                    <p>Drop files here(Maximum size: 96KB)</p>
                                }
                                </div>
                            </div>
                        </label>
                        */}

            {/*
                        <progress className="progress w-56 mt-6" value="40" max="100"></progress>
                        */}

            <Button
              className={`${"btn btn-block mt-6"} ${pageStyle.btn}`}
              loading={isLoading}
              onClick={() => send()}
            >
              {isConnected ? "Deploy" : "Connect Wallet"}
            </Button>
          </div>
          <div className={pageStyle.cardTitle}>Deploy History</div>
          <div className={pageStyle.cardSub}>
            <div className={pageStyle.tableList}>
              <div
                className={`${pageStyle.tableItem} ${pageStyle.tableHeader}`}
              >
                <div
                  className={`${pageStyle.tableItemUnit} ${pageStyle.tableHeaderItem} ${pageStyle.unitWidth2}`}
                >
                  Inscription
                </div>
                <div
                  className={`${pageStyle.tableItemUnit} ${pageStyle.tableHeaderItem} ${pageStyle.unitWidth2} ${pageStyle.unitReverse}`}
                >
                  Status
                </div>
                <div
                  className={`${pageStyle.tableItemUnit} ${pageStyle.tableHeaderItem} ${pageStyle.unitWidth2} ${pageStyle.unitReverse}`}
                >
                  Total supply{" "}
                </div>
                <div
                  className={`${pageStyle.tableItemUnit} ${pageStyle.tableHeaderItem} ${pageStyle.unitWidth2}`}
                >
                  TX
                </div>
                <div
                  className={`${pageStyle.tableItemUnit} ${pageStyle.tableHeaderItem} ${pageStyle.unitWidth2} ${pageStyle.unitReverse}`}
                >
                  TIME
                </div>
              </div>
              {list.map((item, number) => (
                <div
                  className={`${pageStyle.tableItem}`}
                  key={number.toString()}
                >
                  <div
                    className={`${pageStyle.tableItemUnit} ${pageStyle.unitWidth2}`}
                  >
                    {item.name}
                  </div>
                  {item.status == "Success" ? (
                    <div
                      className={`${pageStyle.tableItemUnit} ${pageStyle.unitWidth2} ${pageStyle.unitReverse} ${pageStyle.colorG}`}
                    >
                      {item.status}
                    </div>
                  ) : (
                    <div
                      className={`${pageStyle.tableItemUnit} ${pageStyle.unitWidth2} ${pageStyle.unitReverse} ${pageStyle.colorR}`}
                    >
                      {item.status}
                    </div>
                  )}
                  <div
                    className={`${pageStyle.tableItemUnit} ${pageStyle.unitWidth2} ${pageStyle.unitReverse}`}
                  >
                    {item.total}
                  </div>
                  <div className={`${pageStyle.unitWidth2}`} title={item.tx}>
                    <Link to={"/deploy/info?hash=" + item.tx}>
                      <EllipsisMiddle
                        className={`${pageStyle.middleOmit} `}
                        suffixCount={3}
                      >
                        {item.tx}
                      </EllipsisMiddle>
                    </Link>
                  </div>
                  <div
                    className={`${pageStyle.tableItemUnit} ${pageStyle.unitWidth2} ${pageStyle.unitReverse}`}
                  >
                    {item.time}
                  </div>
                </div>
              ))}
              <PageNav />
            </div>
          </div>
          {/*
          <div className={pageStyle.cardSub}>
            {list.length > 0 ? (
              <>
                <table className={`${"table tableBox"}`}>
                  <thead className={"tableBox"}>
                    <tr>
                      <th>Inscription</th>
                      <th>Status</th>
                      <th>Total supply</th>
                      <th>TX</th>
                      <th>TIME</th>
                    </tr>
                  </thead>

                  <tbody>
                    {list.map((item, idx) => (
                      <tr key={idx}>
                        <td className={`${"tableItemTd"}`}>{item.name}</td>
                        <td className={`${"tableItemTd"}`}>
                          {item.status == "Success" ? (
                            <div
                              className={`${pageStyle.tableItemUnit} ${pageStyle.unitReverse} ${pageStyle.colorG}`}
                            >
                              {item.status}
                            </div>
                          ) : (
                            <div
                              className={`${pageStyle.tableItemUnit} ${pageStyle.unitReverse} ${pageStyle.colorR}`}
                            >
                              {item.status}
                            </div>
                          )}
                        </td>
                        <td className={`${"tableItemTd"}`}>{item.total}</td>
                        <td className={`${"tableItemTd"}`}>
                          <Link to={"/deploy/info?hash=" + item.tx}>
                            <EllipsisMiddle
                              className={`${"middleOmit"} `}
                              suffixCount={3}
                            >
                              {item.tx}
                            </EllipsisMiddle>
                          </Link>
                        </td>
                        <td className={`${"tableItemTd"}`}>{item.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
          */}
        </div>
      </div>
      {/*
            <PopupSide person={{ isShow: isShowPopup, setShow: setIsShowPopup}}/>
            popupList.map((item, idx) => (
                    <PopupSide key={idx} person={{ popupList: popupList, setPopupList:setPopupList, isShow: item.isShow, idx: idx, id: item.id}}/>
                ))
            */}
      <PopupSide person={popupData} />
    </div>
  );
}
