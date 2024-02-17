import type { JSXElementConstructor, ReactElement, ReactNode } from "react";

import { ReactPortal } from "react";

import iconArrowLeft from "@/assets/images/arrowLeft.svg";
import iconArrowRight from "@/assets/images/arrowRight.svg";

import pageStyle from "./PageNav.module.css";

function PageNav({ person }: any) {
  const curArr = person.curArr;
  const navData = person.navData;
  const setNavData = person.setNavData;
  const setCurArr = person.setCurArr;

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

  function flipping(
    num:
      | string
      | number
      | boolean
      | ReactElement<any, string | JSXElementConstructor<any>>
      | Iterable<ReactNode>
      | null
      | undefined
  ) {
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
      flipping(navData.cur - navData.unit > 1 ? navData.cur - navData.unit : 1);
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
            curArr.map((item: any, idx: any) => (
              <div
                className={`${pageStyle.pageNavItem} ${
                  item == navData.cur ? pageStyle.pageNavItemCur : ""
                }`}
                key={item.toString()}
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
          curArr.map((item: any, idx: any) => (
            <div
              className={`${pageStyle.pageNavItem} ${
                item == navData.cur ? pageStyle.pageNavItemCur : ""
              }`}
              key={item.toString()}
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
            curArr.map((item: any, idx: any) => (
              <div
                className={`${pageStyle.pageNavItem} ${
                  item == navData.cur ? pageStyle.pageNavItemCur : ""
                }`}
                key={item.toString()}
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
                <svg
                  onClick={() => {
                    flippingPagination(1);
                  }}
                  width="38"
                  height="22"
                  viewBox="0 0 21 38"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.463 17.6658L20.6992 18.9904L3.68151 37.2556C3.35324 37.6045 2.90989 37.8002 2.44787 37.8002C1.98585 37.8002 1.54251 37.6045 1.21424 37.2556C1.05141 37.0822 0.922151 36.8759 0.833889 36.6486C0.745627 36.4214 0.700107 36.1776 0.699944 35.9314C0.699782 35.6852 0.744982 35.4414 0.832944 35.214C0.920905 34.9866 1.04989 34.7802 1.21249 34.6064L15.7577 18.9941L1.21249 3.39488C1.04983 3.22145 0.920745 3.01521 0.832656 2.78804C0.744568 2.56087 0.699219 2.31726 0.699219 2.07121C0.699219 1.82516 0.744568 1.58154 0.832656 1.35438C0.920745 1.12721 1.04983 0.920973 1.21249 0.747542C1.54038 0.39763 1.98384 0.200899 2.44628 0.200197C2.90873 0.199495 3.3527 0.394879 3.68151 0.743795L19.3914 17.5927L19.463 17.6676V17.6658Z" />
                </svg>
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

export { PageNav };
