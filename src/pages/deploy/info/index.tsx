import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Button, Typography } from "antd";
import { ethers } from "ethers";
import { toUtf8String } from "ethers/lib/utils";
import React, {  useEffect, useState } from "react";
import { useAccount, useSendTransaction, useTransaction } from "wagmi";

import Api from "@/api/api";
import iconArrowLeft from "@/assets/images/arrowLeft.svg";
import iconArrowRight from "@/assets/images/arrowRight.svg";
import iconClose from "@/assets/images/close.svg";
import iconCopy from "@/assets/images/iconCopy.svg";
import iconValidity from "@/assets/images/validity.svg";
import iconValidityError from "@/assets/images/validityError.svg";
import { closePopup, openPopup, PopupSide } from "@/components/PopupSide";
import { convertToHexa } from "@/utils";

import styles from "../../../styles/Home.module.css";
import pageStyle from "./index.module.css";

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

export default function Home() {
  const { openConnectModal } = useConnectModal();
  const searchParams = new URLSearchParams(window.location.search);
  const { isConnected, address } = useAccount();

  const {
    data: transactionInfo,
    status: transactionInfoStatus,
    refetch: transactionInfoRefetch,
  } = useTransaction({
    hash: searchParams.get("hash"),
    watch: true,
  });

  const [maxId, setMaxId] = useState(0);
  const [myHolding, setMyHolding] = useState(0);
  const [totalHolding, setTotalHolding] = useState(0);

  const [mintHash, setMintHash] = useState("");
  const [pagingNum, setPagingNum] = useState("0");
  const [isInscribeLoading, setIsInscribeLoading] = useState(false);
  const [isTransferLoading, setIsTransferLoading] = useState(false);

  const [deployInfo, setDeployInfo] = useState({
    tick: "",
    lim: 0,
    max: 0,
    dec: "",
    p: "",
  });
  const [popupData, setPopupData] = useState({
    isShow: "init",
    status: "0",
    time: 0,
    progress: 0,
    hash: "",
  });

  useEffect(() => {
    if (transactionInfo?.data) {
      loadInscriptionData();
    }
  }, [transactionInfo?.data]);

  const loadInscriptionData = async () => {
    console.log(transactionInfo);
    const data = toUtf8String(transactionInfo?.data).replace("data:,", "");

    let maxId = 0;
    let myHolding = 0;

    let totalHolding = 0;

    console.log(JSON.parse(data));
    const deployInfo = JSON.parse(data);
    const ethSccriptions: any[] = [];

    const res: any = await Api.getEthscriptionsByOwner(address);

    console.log(res);

    for (let i = 0; i < res.length; i++) {
      const d = res[i];
      const r = d.content_uri.substring(6);

      try {
        const data = JSON.parse(r);

        if (
          data &&
          deployInfo.tick === data.tick &&
          data.p === "erc-20" &&
          data.op === "mint"
        ) {
          totalHolding += data.amt;

          myHolding += data.amt;

          if (data.id > maxId) {
            maxId = data.id;
          }

          ethSccriptions.push({
            ...data,
            ...res[i],
          });
        }
      } catch (e) {
        continue;
      }
    }

    console.log(ethSccriptions);
    console.log(maxId);

    setMaxId(maxId);
    setMyHolding(myHolding);
    setTotalHolding(totalHolding);
    setDeployInfo(deployInfo);
  };

  const [isConfirmLoading, setIsConfirmLoading] = useState(false);
  const [isShowpopupWindow, setIsShowpopupWindow] = useState(false);

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
    // {
    //   key: "input1",
    //   title: "Amount",
    //   defaultText: "Enter amount",
    //   type: "text",
    //   errorText: "4 character like “abcd....",
    //   isTextError: false, // 输入框背景变红 输入框内提示错误信息 输入框下提示错误信息
    //   isIconState: false,
    //   isIconDisplay: false,
    //   inputVal: "",
    //   isTextarea: false,
    // },
  ]);

  // 一些页面数据
  const [listA, setListA] = useState([
    {
      rank: "1",
      address:
        "0x2343302343323223433023433232234330234332322343302343323223433023433232",
      percentage: "1.5",
      value: "150000",
    },
    {
      rank: "1",
      address:
        "0x2343302343323223433023433232234330234332322343302343323223433023433232",
      percentage: "1.5",
      value: "150000",
    },
    {
      rank: "1",
      address:
        "0x2343302343323223433023433232234330234332322343302343323223433023433232",
      percentage: "1.5",
      value: "150000",
    },
  ]);
  const [listB, setListB] = useState([
    {
      num: "#6921",
      method: "transfer",
      quantity: "1000",
      from: "0x2343302343323223433023433232234330234332322343302343323223433023433232",
      to: "0x2343302343323223433023433232234330234332322343302343323223433023433232",
      time: "2023/12/09 05:20:23",
    },
  ]);
  const hexData = convertToHexa(`data:,{"p":"blrc20","op":"mint"}`.trim());

  const { sendTransactionAsync: mintTransactionAsync } = useSendTransaction({
    request: {
      to: "address",
      value: ethers.utils.parseEther("0"),
      // 十六进制数据
      data: hexData,
    },
  });

  async function inscribe() {
    if (isConnected) {
      const hexData = convertToHexa(
        `data:,{"p":"erc-20","op":"mint","tick":"${deployInfo.tick}","id":${
          maxId + 1
        },"amt":${deployInfo.lim}}`.trim()
      );

      setIsInscribeLoading(true);
      mintTransactionAsync?.({
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

          r.wait()
            .then((s) => {
              console.log("wait", s);
              openPopup(popupData, setPopupData, "2", null, r.hash);
              setMintHash(r.hash);
              setIsInscribeLoading(false);
              loadInscriptionData();
              transactionInfoRefetch?.();
            })
            .finally(() => {
              clearInterval(timer1);
              closePopup(popupData, setPopupData);
            });
        })
        .catch((e) => {
          openPopup(popupData, setPopupData, "0", 10000);
          setIsInscribeLoading(false);
          console.log("error send", e);
        });
    } else {
      openConnectModal?.();
    }
  }

  function PageNav() {
    const person = {
      max: 280,
      cur: 1,
      unit: 10,
    };
    const [curArr, setCurArr] = useState([]);
    const [navData, setNavData] = useState(person);

    function flippingCount() {
      const tmpCurArr:any = [];

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

    function flipping(num: number) {
      navData.cur = num;
      setNavData(navData);
      flippingCount();
    }

    function flippingPagination(num: number) {
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
              curArr.map((item, idx) => (
                <div
                  className={`${pageStyle.pageNavItem} ${
                    item == navData.cur ? pageStyle.pageNavItemCur : ""
                  }`}
                  key={"navData" + idx}
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

  function onCopy(text) {
    window.navigator.clipboard
      .writeText(text)
      .then((res) => {
        console.log("text复制成功");
      })
      .catch((err) => {
        console.log("text复制需要插入其他插件实现");
      });
  }

  function send() {
    for (let i = 0; i < inputList.length; i++) {
      if (!testInput(i)) {
        return;
      }
    }

    if (isConnected) {
      setIsTransferLoading(true);

      mintTransactionAsync?.({
        recklesslySetUnpreparedRequest: {
          from: address,
          to: inputList[0].inputVal,
          value: ethers.utils.parseEther("0"), //use formatUnits from viems, ethers is not supported anymore
          // 十六进制数据
          data: mintHash,
          gasLimit: ethers.utils.parseEther("0.00000000001"),
        },
      })
        .then((r) => {
          openPopup(popupData, setPopupData, "1", null, r.hash);
          const timer1 = setInterval(() => {
            popupData.progress = popupData.progress + 5;
            setPopupData({ ...popupData });
          }, 1000);

          r.wait()
            .then((s) => {
              console.log("wait", s);
              openPopup(popupData, setPopupData, "2", null, r.hash);
              setMintHash("");
              setIsTransferLoading(false);
              setIsShowpopupWindow(false);
            })
            .finally(() => {
              clearInterval(timer1);
              closePopup(popupData, setPopupData);
            });
        })
        .catch((e) => {
          closePopup(popupData, setPopupData);
          openPopup(popupData, setPopupData, "0", 10000);
          setIsTransferLoading(false);
          console.log("error send", e);
        });
    } else {
      openConnectModal?.();
    }
  }

  function testInput(idx: number) {
    let isPass = false;

    switch (idx) {
      case 0:
        if (inputList[idx].inputVal) {
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
          <div className={`${"label"} ${pageStyle.itemTitleBox}`}>
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
          <div className={pageStyle.cardTitle}>{deployInfo.tick}</div>
          <div className={pageStyle.uploadProgressView}>
            <progress
              className={`${pageStyle.uploadProgressBox}`}
              value={(totalHolding / deployInfo.max) * 100}
              max={100}
            />
            <div className={`${pageStyle.uploadProgressText}`}>
              {(totalHolding / deployInfo.max) * 100 + "%"}
            </div>
          </div>
          <div className={pageStyle.cardTitle}>Overview</div>
          <div className={pageStyle.overviewBox}>
            <div className={pageStyle.overviewItem}>
              <div className={pageStyle.overviewItemTitle}>Created By</div>
              <div
                className={`${pageStyle.copyFm} ${pageStyle.overviewItemContent}`}
              >
                <div className={pageStyle.overviewItemContent}>
                  {transactionInfo?.from}
                </div>
                <div
                  onClick={() => {
                    onCopy(transactionInfo?.from);
                  }}
                  className={pageStyle.copyImg}
                >
                  <img src={iconCopy} alt="failed" width={27} height={27} />
                </div>
              </div>
            </div>
            <div className={pageStyle.overviewItem}>
              <div className={pageStyle.overviewItemTitle}>Owned By</div>
              <div
                className={`${pageStyle.copyFm} ${pageStyle.overviewItemContent}`}
              >
                <div className={pageStyle.overviewItemContent}>
                  {transactionInfo?.to}
                </div>
                <div
                  onClick={() => {
                    onCopy(transactionInfo?.to);
                  }}
                  className={pageStyle.copyImg}
                >
                  <img src={iconCopy} alt="failed" width={27} height={27} />
                </div>
              </div>
            </div>
            <div className={pageStyle.overviewItem}>
              <div className={pageStyle.overviewItemTitle}>Status</div>
              <div
                className={`${
                  transactionInfo
                    ? pageStyle.confirmedText
                    : pageStyle.errorText
                }`}
              >
                {transactionInfoStatus}
              </div>
            </div>
            <div className={pageStyle.overviewItem}>
              <div className={pageStyle.overviewItemTitle}>
                Transaction Index
              </div>
              <div className={pageStyle.overviewItemContent}>
                {transactionInfo?.transactionIndex}
              </div>
            </div>
            <div className={pageStyle.overviewItem}>
              <div className={pageStyle.overviewItemTitle}>Block Number</div>
              <div className={pageStyle.overviewItemContent}>
                {transactionInfo?.blockNumber}
              </div>
            </div>
            <div className={pageStyle.overviewItem}>
              <div className={pageStyle.overviewItemTitle}>Created </div>
              <div className={pageStyle.overviewItemContent}>N/A</div>
            </div>
            <div className={pageStyle.overviewItem}>
              <div className={pageStyle.overviewItemTitle}>Dec </div>
              <div className={pageStyle.overviewItemContent}>
                {deployInfo.dec}
              </div>
            </div>
            <div className={pageStyle.overviewItem}>
              <div className={pageStyle.overviewItemTitle}>Type</div>
              <div className={pageStyle.overviewItemContent}>
                {deployInfo.p}
              </div>
            </div>
            <div className={pageStyle.overviewItem}>
              <div className={pageStyle.overviewItemTitle}>My Holding</div>
              <div className={pageStyle.overviewItemContent}>{myHolding}</div>
            </div>
          </div>
          <div className={`${pageStyle.butBox}`}>
            <Button
              className={`${pageStyle.butA} ${"btn"}`}
              disabled={transactionInfoStatus !== "success"}
              onClick={() => inscribe()}
              loading={isInscribeLoading}
            >
              Inscribe
            </Button>
            <button
              onClick={() => {
                setIsShowpopupWindow(true);
              }}
              disabled={mintHash === "" || !totalHolding}
              className={`${pageStyle.butB} ${"btn"} `}
            >
              Transfer Inscription
            </button>
          </div>
          {/*
                        <button className={`${'btn btn-block mt-6'} ${pageStyle.btn} ${ isLoading ? 'loading loading-spinner loading-md' : ''}`} onClick={()=>send()}>
                            Deploy
                        </button>
                        */}

          <div className={`${pageStyle.pagingBox}`}>
            <div className={`${pageStyle.pagingItem}`}>
              <div
                className={`${pageStyle.pagingText} ${
                  pagingNum == "0" ? pageStyle.pagingItemActive : ""
                }`}
                onClick={() => setPagingNum("0")}
              >
                Holders
              </div>
              {pagingNum == "0" ? (
                <div className={`${pageStyle.pagingPoint}`}></div>
              ) : (
                <></>
              )}
            </div>
            <div className={`${pageStyle.pagingItem}`}>
              <div
                className={`${pageStyle.pagingText} ${
                  pagingNum == "1" ? pageStyle.pagingItemActive : ""
                }`}
                onClick={() => setPagingNum("1")}
              >
                Transfers
              </div>
              {pagingNum == "1" ? (
                <div className={`${pageStyle.pagingPoint}`}></div>
              ) : (
                <></>
              )}
            </div>
          </div>

          {pagingNum == "0" ? (
            <div className={pageStyle.cardSub}>
              <div className={pageStyle.tableList}>
                <div
                  className={`${pageStyle.tableItem} ${pageStyle.tableHeader}`}
                >
                  <div
                    className={`${pageStyle.tableItemUnit} ${pageStyle.tableHeaderItem} ${pageStyle.unitWidth3}`}
                  >
                    Rank
                  </div>
                  <div
                    className={`${pageStyle.tableItemUnit} ${pageStyle.tableHeaderItem} ${pageStyle.unitWidth3}`}
                  >
                    Address
                  </div>
                  <div
                    className={`${pageStyle.tableItemUnit} ${pageStyle.tableHeaderItem} ${pageStyle.unitWidth3}`}
                  >
                    Percentage
                  </div>
                  <div
                    className={`${pageStyle.tableItemUnit} ${pageStyle.tableHeaderItem} ${pageStyle.unitWidth3} ${pageStyle.unitReverse}`}
                  >
                    Value
                  </div>
                </div>
                {listA.map((item, number) => (
                  <div
                    className={`${pageStyle.tableItem}`}
                    key={number.toString()}
                    value={number}
                  >
                    <div
                      className={`${pageStyle.tableItemUnit} ${pageStyle.unitWidth3}`}
                    >
                      {item.rank}
                    </div>
                    <div
                      className={`${pageStyle.unitWidth3}`}
                      title={item.address}
                    >
                      {/*
                      <Link to={"/deploy/info?hash=" + item.tx}></Link>

                       */}
                      <EllipsisMiddle
                        className={`${pageStyle.middleOmit} `}
                        suffixCount={3}
                      >
                        {item.address}
                      </EllipsisMiddle>
                    </div>
                    <div
                      className={`${pageStyle.tableItemUnit} ${pageStyle.unitWidth3} ${pageStyle.tableUnitPercentageBox}`}
                    >
                      <div>{Number(item.percentage).toFixed(2) + "%"}</div>
                      <progress
                        className={`${pageStyle.tableUnitProgress} ${pageStyle.progressYColor}`}
                        value={item.percentage}
                        max={100}
                      />
                    </div>
                    <div
                      className={`${pageStyle.tableItemUnit} ${pageStyle.unitWidth3} ${pageStyle.unitReverse}`}
                    >
                      {Number(item.value).toLocaleString()}
                    </div>
                  </div>
                ))}
                <PageNav />
              </div>
            </div>
          ) : (
            <div className={pageStyle.cardSub}>
              <div className={pageStyle.tableList}>
                <div
                  className={`${pageStyle.tableItem} ${pageStyle.tableHeader}`}
                >
                  <div
                    className={`${pageStyle.tableItemUnit} ${pageStyle.tableHeaderItem} ${pageStyle.unitWidth6} ${pageStyle.tableHeaderItemComplex}`}
                  >
                    <div>Number</div>
                    <div className={`${pageStyle.tableHeaderItemMiniText}`}>
                      {"(Ethscription)"}
                    </div>
                  </div>
                  <div
                    className={`${pageStyle.tableItemUnit} ${pageStyle.tableHeaderItem} ${pageStyle.unitWidth4}`}
                  >
                    Method
                  </div>
                  <div
                    className={`${pageStyle.tableItemUnit} ${pageStyle.tableHeaderItem} ${pageStyle.unitWidth4}`}
                  >
                    Quantity
                  </div>
                  <div
                    className={`${pageStyle.tableItemUnit} ${pageStyle.tableHeaderItem} ${pageStyle.unitWidth5}`}
                  >
                    From
                  </div>
                  <div
                    className={`${pageStyle.tableItemUnit} ${pageStyle.tableHeaderItem} ${pageStyle.unitWidth5}`}
                  >
                    To
                  </div>
                  <div
                    className={`${pageStyle.tableItemUnit} ${pageStyle.tableHeaderItem} ${pageStyle.unitWidth7}`}
                  >
                    Date Time
                  </div>
                </div>
                {listB.map((item, number) => (
                  <div
                    className={`${pageStyle.tableItem}`}
                    key={number.toString()}
                    value={number}
                  >
                    <div
                      className={`${pageStyle.tableItemUnit} ${pageStyle.unitWidth6}`}
                    >
                      {item.num}
                    </div>
                    <div
                      className={`${pageStyle.tableItemUnit} ${pageStyle.unitWidth4}`}
                    >
                      {item.method}
                    </div>
                    <div
                      className={`${pageStyle.tableItemUnit} ${pageStyle.unitWidth4}`}
                    >
                      {item.quantity}
                    </div>
                    <div
                      className={`${pageStyle.unitWidth5}`}
                      title={item.from}
                    >
                      <EllipsisMiddle
                        className={`${pageStyle.middleOmit} `}
                        suffixCount={3}
                      >
                        {item.from}
                      </EllipsisMiddle>
                    </div>
                    <div className={`${pageStyle.unitWidth5}`} title={item.to}>
                      <EllipsisMiddle
                        className={`${pageStyle.middleOmit} `}
                        suffixCount={3}
                      >
                        {item.to}
                      </EllipsisMiddle>
                    </div>
                    <div
                      className={`${pageStyle.tableItemUnit} ${pageStyle.unitWidth7}`}
                    >
                      {item.time}
                    </div>
                  </div>
                ))}
                <PageNav />
              </div>
            </div>
          )}
        </div>
      </div>
      {/*
            <div className={pageStyle.popupBox}>
                <div className={pageStyle.popupTitleBox}>
                    {
                        uploadState == 0 ? (
                            <>
                                <img className={pageStyle.popupTitleImg} src={iconUploadFail} alt="failed" width={42} height={42} />
                                <div className={pageStyle.popupTitle}>failed</div>
                            </>
                        ) : (
                            uploadState == 1 ? (
                            <>
                                <img src={iconUploadFail} alt="insufficient funds" width={42} height={42} />
                                <div className={pageStyle.popupTitle}> insufficient funds</div>
                            </>
                            ) : (
                                uploadState == 2 ? (
                                <>
                                    <img src={iconUploading} alt="Processing" width={42} height={42} />
                                    <div className={pageStyle.popupTitle}>Processing</div>
                                </>
                                ) : (
                                    uploadState == 3 ? (
                                    <>
                                        <img src={iconUploadingSuccess} alt="Successful" width={42} height={42} />
                                        <div className={pageStyle.popupTitle}>Successful</div>
                                    </>
                                    ) : (
                                        uploadState == 4 ? (
                                        <>
                                            <img src={iconUploadSuccess} alt="Successful" width={42} height={42} />
                                            <div className={pageStyle.popupTitle}>Successful</div>
                                        </>
                                        ) : (<></>)
                                    )
                                )
                            )
                        )
                    }
                    {
                        (uploadState == 2 | uploadState == 3) ?
                        (<progress className={`${pageStyle.uploadProgressBox} ${ uploadState == 2 ? pageStyle.progressYColor : (uploadState == 3 ? pageStyle.progressGColor : '')}`}
                            value={uploadProgress} max={100}
                        />) : (<></>)
                    }

                </div>


                <div className={pageStyle.popupInfoBox}>
                    <div className={pageStyle.popupInfoTime}>12/11 12:10</div>
                    <div className={pageStyle.popupInfoJump}>
                        <div className={pageStyle.popupInfoJumpTitle}>View on Explorer</div>
                        <img src={iconToExplorer} alt="View on Explorer" width={12.5} height={12.5} />
                    </div>

                </div>
            </div>
            */}
      <PopupSide person={popupData} />
      {isShowpopupWindow ? (
        <>
          <div className={`${pageStyle.popupWindowMask}`}></div>
          <div className={`${pageStyle.popupWindowBox}`}>
            <div className={`${pageStyle.popupWindow}`}>
              <div
                onClick={() => {
                  setIsShowpopupWindow(false);
                }}
                className={pageStyle.popupWindowCloseIcon}
              >
                <img src={iconClose} alt="close" width={22} height={22} />
              </div>
              <div className={`${pageStyle.popupWindowTitle}`}>
                Transfer Inscription
              </div>
              {inputList.map((item, idx) => (
                <InputFormItem
                  key={item.toString()}
                  person={{ ...item }}
                  idx={idx}
                />
              ))}
              <Button
                className={`${"btn btn-block mt-6"} ${pageStyle.btn}`}
                loading={isTransferLoading}
                onClick={() => send()}
              >
                Confirm
              </Button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
