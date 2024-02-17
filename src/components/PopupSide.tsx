import React from "react";

import iconToExplorer from "@/assets/images/toExplorer.svg";
import iconUploadFail from "@/assets/images/uploadFail.svg";
import iconUploading from "@/assets/images/uploading.svg";
import iconUploadSuccess from "@/assets/images/uploadSuccess.svg";

import pageStyle from "./PopupSide.module.css";

function PopupSide({ person }: any) {
  const isShow = person.isShow;
  const status = person.status;
  const progress = person.progress;
  const hash = person.hash;
  const date =
    new Date().getMonth() +
    1 +
    "/" +
    new Date().getDate() +
    " " +
    new Date().getHours() +
    ":" +
    new Date().getMinutes();

  const openInExplorer = () => {
    window.open(`https://goerli.etherscan.io/tx/${hash}`, "_blank");
  };

  return (
    <>
      <div
        className={`${pageStyle.popupBox} ${
          isShow == "init"
            ? ""
            : isShow
            ? pageStyle.setInMove
            : pageStyle.setReMove
        }`}
      >
        <div className={pageStyle.popupTitleBox}>
          {status == 0 ? (
            <>
              <img
                className={pageStyle.popupTitleImg}
                src={iconUploadFail}
                alt="failed"
                width={42}
                height={42}
              />
              <div className={pageStyle.popupTitle}>failed</div>
            </>
          ) : /*
                            status == 1 ? (
                            <>
                                <img src={iconUploadFail} alt="insufficient funds" width={42} height={42} />
                                <div className={pageStyle.popupTitle}> insufficient funds</div>
                            </>
                            ) : (
                            */

          status == 1 ? (
            <>
              <img
                src={iconUploading}
                alt="Processing"
                width={42}
                height={42}
              />
              <div className={pageStyle.popupTitle}>Processing</div>
            </>
          ) : /*
                                    status == 3 ? (
                                    <>
                                        <img src={iconUploadingSuccess} alt="Successful" width={42} height={42} />
                                        <div className={pageStyle.popupTitle}>Successful</div>
                                    </>
                                    ) : (

                                    )
                                \)
                                    */
          status == 2 ? (
            <>
              <img
                src={iconUploadSuccess}
                alt="Successful"
                width={42}
                height={42}
              />
              <div className={pageStyle.popupTitle}>Successful</div>
            </>
          ) : (
            <></>
          )}

          {
            /**/
            status == 1 ? (
              <progress
                className={`${pageStyle.uploadProgressBox} ${pageStyle.progressYColor}`}
                value={progress}
                max={100}
              />
            ) : (
              <></>
            )
          }
        </div>

        <div className={pageStyle.popupInfoBox}>
          <div className={pageStyle.popupInfoTime}>{date}</div>
          <div
            className={pageStyle.popupInfoJump}
            onClick={() => openInExplorer()}
          >
            <div className={pageStyle.popupInfoJumpTitle}>View on Explorer</div>
            <img
              src={iconToExplorer}
              alt="View on Explorer"
              width={12.5}
              height={12.5}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function openPopup(
  popupData: any,
  setPopup: any,
  status: any,
  time: any,
  hash = ""
) {
  popupData.isShow = true;
  popupData.status = status;
  popupData.hash = hash;
  setPopup({ ...popupData });

  if (time) {
    const timer1 = setTimeout(() => {
      closePopup(popupData, setPopup);

      return () => {
        clearTimeout(timer1);
      };
    }, time);
  }
}

function closePopup(popupData: any, setPopup: any) {
  popupData.isShow = false;
  setPopup({ ...popupData });
}

export { closePopup, openPopup, PopupSide };
