import {
  useAccountModal,
  useChainModal,
  useConnectModal,
} from "@rainbow-me/rainbowkit";
import React, { useState } from "react";
import { Link, useHref } from "react-router-dom";
import { useAccount } from "wagmi";

import Logo from "@/assets/images/logo.png";

import styles from "../styles/Home.module.css";

export default function Header() {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();

  const { address, isConnected } = useAccount();

  const href = useHref({});

  //const [messageApi, contextHolder] = message.useMessage();
  return (
    <div
      className={`${styles.navbar}`}
      style={{
        flexShrink: "0",
      }}
    >
      <div className={`${styles.imgLogoBox}`}>
        <div className="">
          <Link to="/">
            <img className={`${styles.imgLogo}`} src={Logo} alt="Tayto" />
          </Link>
        </div>
      </div>
      <div className={`${styles.navbarTextBox}`}>
        <Link to="/home">
          <span
            className={`${"text-base ml-6 mt-1 cursor-pointer font-medium"} ${
              styles.navbarText
            } ${href == "/backup" ? styles.navbarCurCorlor : ""}`}
          >
            Home
          </span>
        </Link>
        <Link to="/marketplace">
          <span
            className={`${"text-base ml-6 mt-1 cursor-pointer font-medium"} ${
              styles.navbarText
            } ${href == "/marketplace" ? styles.navbarCurCorlor : ""}`}
            style={{ color: "#6e645d80" }}
          >
            MarketPlace
            <div className={styles.pointBox} style={{ left: "20%" }}>
              <div className={styles.triangle}></div>
              coming soon!
            </div>
          </span>
        </Link>
        <Link to="/deploy">
          <span
            className={`${"text-base ml-6 cursor-pointer mt-1 font-medium"} ${
              styles.navbarText
            } ${href == "/deploy" ? styles.navbarCurCorlor : ""}`}
            style={{ color: "#6e645d80" }}
          >
            Deploy
            <div className={styles.pointBox} style={{ left: "0%" }}>
              <div className={styles.triangle}></div>
              coming soon!
            </div>
          </span>
        </Link>

        <span
          className={`${"text-base ml-6 mt-1 cursor-pointer font-medium"} ${
            styles.navbarText
          } ${href == "/mint" ? styles.navbarCurCorlor : ""}`}
          style={{ color: "#6e645d80" }}
        >
          Earn
          <div className={styles.pointBox}>
            <div className={styles.triangle}></div>
            coming soon!
          </div>
        </span>
      </div>

      <div
        className={`${styles.navbarButBox}`}
        style={{
          flexShrink: "0",
        }}
      >
        {/*<button className={`${styles.navbarText} ${styles.navbarDocsBut}`}>*/}
        {/*  <div className={`${styles.navbarText} ${styles.navbarDocsIconBox}`}>*/}
        {/*    <svg*/}
        {/*      className={`${styles.navbarDocsIcon}`}*/}
        {/*      xmlns="http://www.w3.org/2000/svg"*/}
        {/*      width="42"*/}
        {/*      height="42"*/}
        {/*      viewBox="0 0 42 42"*/}
        {/*    >*/}
        {/*      <path d="M13.3086 12.4592C13.3086 12.1194 13.4436 11.7935 13.6839 11.5532C13.9241 11.3129 14.25 11.1779 14.5898 11.1779H26.5465C26.8863 11.1779 27.2122 11.3129 27.4524 11.5532C27.6927 11.7935 27.8277 12.1194 27.8277 12.4592C27.8277 12.799 27.6927 13.1249 27.4524 13.3652C27.2122 13.6055 26.8863 13.7404 26.5465 13.7404H14.5898C14.25 13.7404 13.9241 13.6055 13.6839 13.3652C13.4436 13.1249 13.3086 12.799 13.3086 12.4592ZM14.5898 18.0096C14.25 18.0096 13.9241 18.1446 13.6839 18.3848C13.4436 18.6251 13.3086 18.951 13.3086 19.2908C13.3086 19.6306 13.4436 19.9565 13.6839 20.1968C13.9241 20.4371 14.25 20.5721 14.5898 20.5721H19.7148C20.0547 20.5721 20.3805 20.4371 20.6208 20.1968C20.8611 19.9565 20.9961 19.6306 20.9961 19.2908C20.9961 18.951 20.8611 18.6251 20.6208 18.3848C20.3805 18.1446 20.0547 18.0096 19.7148 18.0096H14.5898Z" />*/}
        {/*      <path d="M22.815 2.63455H21.3287C17.9847 2.63455 15.353 2.63455 13.2953 2.89593C11.1889 3.16243 9.49254 3.72105 8.14979 4.98436C6.79423 6.26049 6.18692 7.88768 5.89736 9.90437C5.62061 11.8544 5.62061 14.3477 5.62061 17.4817V28.1878C5.62061 29.5972 5.62061 30.717 5.67954 31.6267C5.74104 32.5569 5.86917 33.3564 6.16642 34.1123C6.61668 35.2178 7.29897 36.2138 8.16721 37.0329C9.03544 37.8521 10.0694 38.4754 11.1992 38.8606C12.6342 39.3654 14.3767 39.3654 17.1698 39.3654H18.9072C23.2916 39.3603 25.9259 39.3014 28.1014 38.5377C31.8862 37.2104 34.9023 34.389 36.3322 30.7759C36.8037 29.5895 37.0164 28.3031 37.1214 26.7221C37.2239 25.1589 37.2239 23.2268 37.2239 20.7361V16.2594C37.2239 13.7071 37.2239 11.6776 37.0343 10.0658C36.8395 8.40274 36.4295 7.02668 35.4968 5.85818C35.0021 5.2374 34.4214 4.69036 33.7722 4.23355C32.5499 3.37255 31.1226 2.9933 29.3852 2.81393C27.6837 2.63455 25.5389 2.63455 22.815 2.63455ZM24.3704 36.6646C25.3215 35.442 25.8365 33.9366 25.8336 32.3877C25.8336 32.0726 25.8208 31.7471 25.808 31.4447L25.8003 31.3294C25.79 31.0604 25.7772 30.8092 25.7721 30.5607C25.7451 30.0827 25.7839 29.6033 25.8874 29.1359C25.9586 28.8705 26.0983 28.6285 26.2926 28.4341C26.4869 28.2398 26.729 28.1001 26.9944 28.0289C27.3685 27.9264 27.8349 27.9008 28.4166 27.9136C28.6677 27.9187 28.9214 27.929 29.1879 27.9418L29.3032 27.9469C29.6056 27.9623 29.931 27.9751 30.2488 27.9751C31.8785 27.9751 33.3802 27.4165 34.5692 26.4761L34.564 26.5529C34.4692 28.0084 34.2822 28.9976 33.949 29.8329C32.8062 32.7183 30.3744 35.0246 27.2532 36.1213C26.4512 36.4032 25.5569 36.5672 24.3704 36.6646ZM34.6614 20.9667V21C34.6614 23.4369 32.6857 25.4126 30.2488 25.4126C29.9977 25.4126 29.726 25.4024 29.4237 25.387L29.3109 25.3819C29.047 25.3716 28.7574 25.3562 28.4704 25.3511C27.752 25.3191 27.0326 25.3882 26.3333 25.5561C24.9085 25.9354 23.7964 27.0475 23.412 28.4722C23.2447 29.1725 23.1766 29.8927 23.2096 30.6119C23.2147 30.8989 23.2301 31.1859 23.2429 31.4524L23.248 31.5626C23.2609 31.8676 23.2737 32.1366 23.2737 32.3877C23.2737 34.7965 21.3467 36.7517 18.9507 36.8004H17.4619C14.2793 36.8004 13.0185 36.785 12.0499 36.4416C11.2662 36.1779 10.5482 35.749 9.94431 35.1841C9.34045 34.6191 8.86483 33.9312 8.54954 33.1667C8.39067 32.7644 8.29073 32.2622 8.23692 31.4576C8.18608 30.3539 8.16814 29.249 8.18311 28.1442V17.5842C8.18311 14.3247 8.18311 12.0159 8.43423 10.2657C8.67767 8.56161 9.13379 7.57761 9.90511 6.85243C10.6892 6.11443 11.768 5.67368 13.6156 5.43793C15.4939 5.19961 17.9642 5.19705 21.421 5.19705H22.7432C25.5543 5.19705 27.5659 5.19961 29.1187 5.36105C30.6511 5.51993 31.5839 5.82486 32.2962 6.32711C32.7524 6.64743 33.1547 7.02924 33.4929 7.45461C34.008 8.10293 34.3232 8.94855 34.4897 10.3631C34.6589 11.8109 34.6614 13.6892 34.6614 16.3414V20.9667Z" />*/}
        {/*    </svg>*/}
        {/*  </div>*/}
        {/*  <div className={`${styles.navbarDocsText}`}>Docs</div>*/}
        {/*</button>*/}

        {isConnected ? (
          <>
            <button
              className={`${styles.navbarBut} ${styles.navbarText}`}
              onClick={openAccountModal}
            >
              Profile
            </button>
            <button
              className={`${styles.navbarBut} ${styles.navbarText}`}
              style={{ marginLeft: "10px" }}
              onClick={openChainModal}
            >
              Chain
            </button>
          </>
        ) : (
          <button
            className={`${styles.navbarBut} ${styles.navbarText}`}
            onClick={openConnectModal}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}
