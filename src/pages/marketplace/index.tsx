import { Image } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import iconBlast from "@/assets/images/iconBlast.svg";
import iconEthereum from "@/assets/images/iconEthereum.svg";
import imgNothing from "@/assets/images/nothing.png";
import { PageNav } from "@/components/PageNav";
import Select from "@/components/Select";
import styles from "@/styles/Home.module.css";

import pageStyle from "./index.module.css";

export default function MarketPlace() {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [isNothing, setIsNothing] = useState(false);

  const [listA, setListA] = useState([
    {
      inscription: "DRAG",
      total: "1,551,500",
      claimed: "500",
      floorPrice: "3.86",
      type: "ETH",
      Unitprice: "$ 9.093118",
      dayVolume: "283",
      marketCap: "$ 9.093118",
      holders: "283",
    },
    {
      inscription: "DRAG",
      total: "1,551,500",
      claimed: "500",
      floorPrice: "3.86",
      type: "ETH",
      Unitprice: "$ 9.093118",
      dayVolume: "283",
      marketCap: "$ 9.093118",
      holders: "283",
    },
  ]);
  const [listB, setListB] = useState([
    {
      token: "Name",
      deployTime: "2023/11/04 18:00:47",
      progress: "1.5",
      holders: "150,000",
      transactions: "150,000",
    },
    {
      token: "Name",
      deployTime: "2023/11/04 18:00:47",
      progress: "1.5",
      holders: "150,000",
      transactions: "150,000",
    },
  ]);
  const [listC, setListC] = useState([]);
  const [tableParamList, setTableParamList] = useState({
    progressType: {
      cur: "ALL",
      list: ["ALL", "In-Progress", "Completed"],
    },
    OrderBy: {
      curVal: "",
      isOpen: false,
      list: [
        { value: "a", label: "a" },
        { value: "b", label: "b" },
      ],
    },
    type: {
      curVal: "",
      isOpen: false,
      list: [
        {
          value: "Ethereum Goerli",
          label: "Ethereum Goerli",
          icon: iconEthereum,
        },
        { value: "Blast", label: "Blast", icon: iconBlast },
      ],
    },
  });
  const [tableParam, setTableParam] = useState({
    progressType: "ALL",
    OrderBy: "",
    type: "",
  });
  const [curArr, setCurArr] = useState([]);
  const [navData, setNavData] = useState({
    max: 280,
    cur: 1,
    unit: 10,
  });

  return (
    <div className={styles.container} data-theme="fantasy">
      <div className={`${"min-h-screen"} ${pageStyle.background}`}>
        <div className={pageStyle.content}>
          <div className={pageStyle.card}>
            <div className={pageStyle.cardTitle}>Explore Inscriptions</div>
            <div className={pageStyle.searchBox}>
              <input
                onChange={(e) => setSearchText(e.target.value)}
                type="text"
                placeholder="Search Tick"
                className={`${"input input-bordered w-full"} ${
                  pageStyle.searchInput
                }`}
              />
              <button
                className={`${"btn"} ${pageStyle.btn} ${pageStyle.searchBut}`}
              >
                Reset
              </button>
            </div>
            {isNothing ? (
              <div
                className={`${pageStyle.nothingBox}`}
                style={{ marginTop: "0rem" }}
              >
                <Image width={"100%"} src={imgNothing} preview={false} />
              </div>
            ) : (
              /*
              <div className={pageStyle.nothingBox}>
                <img
                  src={imgNothing}
                  alt="imgNothing"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>*/
              <>
                <div className={pageStyle.listButsBox}>
                  <div className={pageStyle.listButBox}>
                    {tableParamList.progressType.list.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          tableParamList.progressType.cur = item;
                          setTableParamList({ ...tableParamList });
                        }}
                        className={`${"btn"} ${pageStyle.btn} ${
                          item == tableParamList.progressType.cur
                            ? pageStyle.activeBtn
                            : ""
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <div className={pageStyle.listButBox}>
                    <div className={pageStyle.selectView}>
                      <Select
                        person={{
                          dataList: tableParamList.OrderBy,
                          setDataList: () =>
                            setTableParamList({ ...tableParamList }),
                          typeName: "Order By",
                        }}
                      />
                    </div>
                    {/*
                    <div className={pageStyle.selectView}>
                      <Select
                        person={{
                          dataList: tableParamList.type,
                          setDataList: () =>
                            setTableParamList({ ...tableParamList }),
                          typeName: "Type",
                          isIcon: true,
                        }}
                      />
                    </div>
                    */}
                  </div>
                </div>
                {tableParamList.progressType.cur == "ALL" ? (
                  listA.length > 0 ? (
                    <>
                      <div
                        className={`${"overflow-x-auto"} ${
                          pageStyle.overflowXFix
                        }`}
                      >
                        <table className={`${"table"} ${pageStyle.tableBox}`}>
                          {/*<!-- head -->*/}
                          <thead className={pageStyle.tableBox}>
                            <tr>
                              <th>Inscription</th>
                              <th>Total</th>
                              <th>Claimed</th>
                              <th>Floor price</th>
                              <th>Unitprice</th>
                              <th>24H Volume</th>
                              <th>Market Cap</th>
                              <th>Holders</th>
                            </tr>
                          </thead>
                          <tbody>
                            {listA.map((item, idx) => (
                              <tr
                                key={idx}
                                onClick={() => navigate("/placeDetails")}
                              >
                                <td
                                  className={`${pageStyle.tableItemTd} ${pageStyle.Aa}`}
                                >
                                  {item.inscription}
                                </td>
                                <td
                                  className={`${pageStyle.tableItemTd} ${pageStyle.Ab}`}
                                >
                                  {item.total}
                                </td>
                                <td
                                  className={`${pageStyle.tableItemTd} ${pageStyle.Ac}`}
                                >
                                  {item.claimed}
                                </td>
                                <td className={`${pageStyle.tableItemTd}`}>
                                  <div className={pageStyle.tableTdBox}>
                                    <div>{item.floorPrice}</div>
                                    <div className={pageStyle.tableIconBox}>
                                      <img
                                        className={`${pageStyle.tableIcon}`}
                                        src={
                                          item.type == "ETH" ? iconEthereum : ""
                                        }
                                        alt="icon"
                                      />
                                    </div>
                                  </div>
                                </td>
                                <td className={`${pageStyle.tableItemTd}`}>
                                  {item.Unitprice}
                                </td>
                                <td className={`${pageStyle.tableItemTd}`}>
                                  <div className={pageStyle.tableTdBox}>
                                    <div>{item.dayVolume}</div>
                                    <div className={pageStyle.tableIconBox}>
                                      <img
                                        className={`${pageStyle.tableIcon}`}
                                        src={
                                          item.type == "ETH" ? iconEthereum : ""
                                        }
                                        alt="icon"
                                        width={30}
                                        height={30}
                                      />
                                    </div>
                                  </div>
                                </td>
                                <td className={`${pageStyle.tableItemTd}`}>
                                  {item.marketCap}
                                </td>
                                <td className={`${pageStyle.tableItemTd}`}>
                                  {item.holders}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <PageNav
                        person={{ navData, curArr, setNavData, setCurArr }}
                      />
                    </>
                  ) : (
                    <div
                      className={`${pageStyle.nothingBox}`}
                      style={{ marginTop: "0rem" }}
                    >
                      <Image width={"100%"} src={imgNothing} preview={false} />
                    </div>
                  )
                ) : tableParamList.progressType.cur == "In-Progress" ? (
                  listB.length > 0 ? (
                    <>
                      <div
                        className={`${"overflow-x-auto"} ${
                          pageStyle.overflowXFix
                        }`}
                      >
                        <table className={`${"table"} ${pageStyle.tableBox}`}>
                          {/*<!-- head -->*/}
                          <thead className={pageStyle.tableBox}>
                            <tr>
                              <th>Token</th>
                              <th className="tableItemStart">Deploy Time</th>
                              <th className="tableItemStart">Progress</th>
                              <th>Holders</th>
                              <th>Transactions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {listB.map((item, idx) => (
                              <tr
                                key={idx}
                                onClick={() => navigate("/placeDetails")}
                              >
                                <td className={`${pageStyle.tableItemTd}`}>
                                  {item.token}
                                </td>
                                <td
                                  className={`${"tableItemStart"} ${
                                    pageStyle.tableItemTd
                                  }`}
                                >
                                  {item.deployTime}
                                </td>
                                <td
                                  className={`${"tableItemStart"} ${
                                    pageStyle.tableItemTd
                                  }`}
                                >
                                  <div className={pageStyle.tableProgressBox}>
                                    <div
                                      className={`${pageStyle.tableProgressText}`}
                                    >
                                      {item.progress + "%"}
                                    </div>
                                    <progress
                                      className={`${pageStyle.tableProgress}`}
                                      value={33}
                                      max={100}
                                    />
                                  </div>
                                </td>
                                <td className={`${pageStyle.tableItemTd}`}>
                                  {item.holders}
                                </td>
                                <td className={`${pageStyle.tableItemTd}`}>
                                  {item.transactions}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <PageNav
                        person={{ navData, curArr, setNavData, setCurArr }}
                      />
                    </>
                  ) : (
                    <div
                      className={`${pageStyle.nothingBox}`}
                      style={{ marginTop: "0rem" }}
                    >
                      <Image width={"100%"} src={imgNothing} preview={false} />
                    </div>
                  )
                ) : tableParamList.progressType.cur == "Completed" ? (
                  listC.length > 0 ? (
                    <>
                      <div
                        className={`${"overflow-x-auto"} ${
                          pageStyle.overflowXFix
                        }`}
                      >
                        <table className={`${"table"} ${pageStyle.tableBox}`}>
                          {/*<!-- head -->*/}
                          <thead className={pageStyle.tableBox}>
                            <tr>
                              <th>Token</th>
                              <th className="tableItemStart">Deploy Time</th>
                              <th className="tableItemStart">Progress</th>
                              <th>Holders</th>
                              <th>Transactions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {listC.map((item: any, idx) => (
                              <tr
                                key={idx}
                                onClick={() => navigate("/placeDetails")}
                              >
                                <td className={`${pageStyle.tableItemTd}`}>
                                  {item.token}
                                </td>
                                <td
                                  className={`${"tableItemStart"} ${
                                    pageStyle.tableItemTd
                                  }`}
                                >
                                  {item.deployTime}
                                </td>
                                <td
                                  className={`${"tableItemStart"} ${
                                    pageStyle.tableItemTd
                                  }`}
                                >
                                  <div className={pageStyle.tableProgressBox}>
                                    <div
                                      className={`${pageStyle.tableProgressText}`}
                                    >
                                      {item.progress + "%"}
                                    </div>
                                    <progress
                                      className={`${pageStyle.tableProgress}`}
                                      value={33}
                                      max={100}
                                    />
                                  </div>
                                </td>
                                <td className={`${pageStyle.tableItemTd}`}>
                                  {item.holders}
                                </td>
                                <td className={`${pageStyle.tableItemTd}`}>
                                  {item.transactions}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <PageNav
                        person={{ navData, curArr, setNavData, setCurArr }}
                      />
                    </>
                  ) : (
                    <div
                      className={`${pageStyle.nothingBox}`}
                      style={{ marginTop: "0rem" }}
                    >
                      <Image width={"100%"} src={imgNothing} preview={false} />
                    </div>
                  )
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
