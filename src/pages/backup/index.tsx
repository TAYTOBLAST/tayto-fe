import { Flex, Image, Slider, Typography } from "antd";
import { log } from "console";
import { parseEther } from "ethers/lib/utils";
import { useState } from "react";

import tokenImg from "@/assets/images/home_tokenImg.png";
import whyImg from "@/assets/images/whyImg.png";

import styles from "../../styles/Home.module.css";
import pageStyle from "../../styles/Home.module.css";

const { Text } = Typography;
let timer: string | number | NodeJS.Timeout | undefined;
let isScrollPhase: boolean;

export default function Home() {
  const [phaseNum, setPhaseNum] = useState(1);
  const [phaseVal, setPhaseVal] = useState(0);

  const onChangAnchor = (index: any) => {
    const param = {
      behavior: "smooth",
      block: "nearest",
    };

    if (index) {
      document.querySelector(index).scrollIntoView(param);
    }
  };

  const onChangePhase = (newValue: number) => {
    const value = Math.ceil(newValue / (100 / 6));

    setPhaseVal((100 / 5) * (value - 1));
    setPhaseNum(value ? value : 1);
    onChangAnchor("#part-" + (value ? value : 1));
  };

  const onScrollPhase = (e: { target: { scrollTop: any } }) => {
    const newValue = e.target.scrollTop;
    const idx = Math.round(newValue / (16 * 20)) + 1;
    /*
    if (isScrollPhase) {
      timer = setTimeout(() => {
        clearTimeout(timer);
        setPhaseVal((100 / 5) * (idx - 1));
        setPhaseNum(idx ? idx : 1);
        onChangAnchor("#part-" + (idx ? idx : 1));
        isScrollPhase = true;
      }, 350);
    }
    */
    //onChangAnchor("#part-" + (idx ? idx : 1));

    /*
    const value = Math.ceil(newValue / (100 / 6));

    setPhaseVal((100 / 5) * (value - 1));
    setPhaseNum(value ? value : 1);
    timer = setTimeout(() => {
      clearTimeout(timer);
      onChangAnchor("#part-" + (value ? value : 1));
    }, 350);
    */
  };

  return (
    <div className={styles.container} data-theme="fantasy">
      {/*
         <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div>
            <h1 className="text-5xl font-bold">Tayto!</h1>
          </div>
        </div>
      </div>
        */}

      <div className={`${"min-h-screen"} ${pageStyle.background}`}>
        <div className={pageStyle.backgroundItemE}></div>
        <div className={pageStyle.homeTitleBox}>
          <div className={pageStyle.backgroundItemA}></div>
          <div className={pageStyle.homeTitleBox}>
            <div className={pageStyle.homeTitleBoxTitle}>
              The{" "}
              <div className={pageStyle.homeTitleYColor}>
                First Inscription Protocol on
              </div>
            </div>
            <div className={pageStyle.homeTitleBoxTitle}>
              <div className={pageStyle.homeTitleYColor}></div> Blast L2
            </div>

            <div className={pageStyle.homeTitleBoxInfo}>
              From Blast Native Inscription Marketplace to Empowering L2
              Inscription Ecosystem!
            </div>
          </div>
          <div className={pageStyle.backgroundItemB}></div>
        </div>
        <div className={pageStyle.plateBox}>
          <div className={pageStyle.plateTitle}>Feature</div>
          <div className={pageStyle.plateInfoBox}>
            {[
              {
                icon: pageStyle.platePotatoImgA,
                title: "Blast Inscription & Trading Marketplace",
                infoA:
                  "As the first Blast native inscription protocol standard, we aim to empower the Blast ecosystem innovatively. By leveraging the strengths and addressing the limitations of protocols like BRC-20, ORC-20, RUNE, and combining them with Ethereum's EVM, we establish a novel inscription standard protocol.",
                infoB:
                  "This approach maximizes the applicability of inscriptions across various scenarios.",
              },
              {
                icon: pageStyle.platePotatoImgB,
                title: "User-Friendly with Zero Tax Fee",
                infoA:
                  "Providing a seamless interaction experience for the pioneers (early adopters) on Blast, enabling large-scale, high concurrency transactions, and offering convenience and reduced friction costs for volume trading.",
                infoB: "",
              },
              {
                icon: pageStyle.platePotatoImgC,
                title: "Unlimited Availability and Composability",
                infoA:
                  "Supporting developers to build on the inscription, including Staking, DEX, Lending protocols, DAO governance, and derivatives. Our goal is to expand the construction of Blast and L2 Inscription DeFi applications. We will continuously upgrade protocol standards to accommodate various inscription-based developments.",
                infoB: "",
              },
              /*
              {
                icon: pageStyle.platePotatoImgD,
                title: "Community-Driven Protocol",
                infoA:
                  "Tayto is a community-driven inscription protocol. Governance will be conducted through inscription token voting, although initially, launch ERC20 tokens $TYTO for faster project progression. Voting decisions include platform revenue distribution, product feature upgrades, and development roadmap.",
                infoB: "",
              },
              */
            ].map((item, idx) => (
              <div key={idx} className={pageStyle.plateInfoItemBox}>
                <div className={`${pageStyle.platePotatoBox}`}>
                  {idx % 2 === 0 ? (
                    <div className={`${pageStyle.platePotatoFrame}`}>
                      <div className={`${item.icon}`}></div>
                    </div>
                  ) : (
                    <div className={`${item.icon}`}></div>
                  )}
                </div>
                <div className={pageStyle.plateInfoItemInfoBox}>
                  <div className={pageStyle.plateInfoItemTitle}>
                    {item.title}
                  </div>
                  <div className={pageStyle.plateInfoItemInfo}>
                    {item.infoA}
                  </div>
                  {item.infoB.length ? (
                    <div className={pageStyle.plateInfoItemInfo}>
                      {item.infoB}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/*
          <div className={pageStyle.whyBox}>
            <div className={pageStyle.plateTitle}>Why buy and hold $TYTO</div>
            <div style={{ paddingBottom: "1rem" }}>
              <Image src={whyImg} width={"100%"} preview={false}></Image>
            </div>
            <div className={pageStyle.whyText}>
              1.buy <span className={pageStyle.nameColor}>$TYTO</span> to win
              secondary market profit
            </div>
            <div className={pageStyle.whyText}>
              2.hold <span className={pageStyle.nameColor}>$TYTO</span> to enjoy
              early minting, in succession new projects’ whitelist privileges.
            </div>
            <div className={pageStyle.whyText}>
              3.hold <span className={pageStyle.nameColor}>$TYTO</span> to share
              inscription trading revenue and Blast airdrop token.
            </div>
            <div className={pageStyle.whyText}>
              4.hold <span className={pageStyle.nameColor}>$TYTO</span> to vote,
              choose and decide the listing and future development of Tayto
              platform
            </div>
          </div>

          <div className={pageStyle.plateTitle}>TOKENOMICS</div>
          <div className={pageStyle.tokenBox}>
            <div style={{ paddingRight: "1rem" }}>
              <Image src={tokenImg} width={"14rem"} preview={false}></Image>
            </div>
            <Flex vertical={true} justify="center" align="center">
              <div className={pageStyle.tokenTitle}>$TYTO Total Supply:</div>
              <div className={pageStyle.tokenVal}>10,000,000,000,000</div>
              <Flex
                className={pageStyle.tokenInfoBox}
                vertical={true}
                justify="center"
              >
                <div className={pageStyle.tokenInfo}>
                  <div className={pageStyle.tokenInfoTitle}>Token Details</div>
                  <div>
                    <span className={pageStyle.tokenInfoItemTitle}>Token:</span>
                    $TYTO
                  </div>
                  <div>
                    <span className={pageStyle.tokenInfoItemTitle}>
                      Supply:
                    </span>
                    1,000,000,000
                  </div>
                  <div>
                    <span className={pageStyle.tokenInfoItemTitle}>
                      Presale:
                    </span>
                    20%
                  </div>
                  <div>
                    <span className={pageStyle.tokenInfoItemTitle}>LP：</span>
                    10%
                  </div>
                  <div>
                    <span className={pageStyle.tokenInfoItemTitle}>
                      Ecosystem development：
                    </span>
                    50%，50%，5%TGE multi-sign management ，2% vesting monthly
                    after 6months.
                  </div>
                  <div>
                    <span className={pageStyle.tokenInfoItemTitle}>
                      Team ：
                    </span>
                    20%，2%TGE，2%vesting monthly after 3 months.
                  </div>
                </div>
              </Flex>
              <div
                className={pageStyle.tokenTitle}
                style={{
                  marginTop: "1rem",
                }}
              >
                Contract ownership is renounced.
              </div>
            </Flex>
          </div>
 */}

          {/*  <div className={pageStyle.plateTitle}>ROADMAP</div>*/}
          {/*  <div*/}
          {/*    onScroll={(e) => {*/}
          {/*      console.log(e.target.scrollTop);*/}
          {/*    }}*/}
          {/*    className={pageStyle.roadmapBox}*/}
          {/*  >*/}
          {/*    <div className={pageStyle.roadmapItemA}>*/}
          {/*      {[1, 2, 3, 4, 5, 6].map((item, idx) => (*/}
          {/*        <div*/}
          {/*          onClick={() => {*/}
          {/*            setPhaseNum(item);*/}
          {/*            setPhaseVal((100 / 5) * (item - 1));*/}
          {/*            onChangAnchor("#part-" + item);*/}
          {/*          }}*/}
          {/*          className={`${pageStyle.phaseItem} ${*/}
          {/*            phaseNum == item ? pageStyle.phaseItemActive : ""*/}
          {/*          }`}*/}
          {/*          style={{*/}
          {/*            opacity:*/}
          {/*              Math.abs(phaseNum - item) == 1*/}
          {/*                ? "0.6"*/}
          {/*                : Math.abs(phaseNum - item) == 2*/}
          {/*                ? "0.5"*/}
          {/*                : Math.abs(phaseNum - item) == 3*/}
          {/*                ? "0.3"*/}
          {/*                : Math.abs(phaseNum - item) == 4*/}
          {/*                ? "0.2"*/}
          {/*                : Math.abs(phaseNum - item) == 5*/}
          {/*                ? "0.1"*/}
          {/*                : Math.abs(phaseNum - item) == 6*/}
          {/*                ? "0.1"*/}
          {/*                : "1",*/}
          {/*          }}*/}
          {/*        >*/}
          {/*          Phase {item}*/}
          {/*        </div>*/}
          {/*      ))}*/}
          {/*    </div>*/}
          {/*    <div className={pageStyle.plateSliderBox}>*/}
          {/*      <Slider*/}
          {/*        className={"plateSlider"}*/}
          {/*        onChange={onChangePhase}*/}
          {/*        value={phaseVal}*/}
          {/*        tooltip={{ formatter: null }}*/}
          {/*        included={false}*/}
          {/*        vertical*/}
          {/*        reverse*/}
          {/*      />*/}
          {/*    </div>*/}
          {/*    <div*/}
          {/*      id="scrollPhaseView"*/}
          {/*      onScroll={(e: any) => onScrollPhase(e)}*/}
          {/*      className={pageStyle.roadmapItemB}*/}
          {/*    >*/}
          {/*      {[*/}
          {/*        {*/}
          {/*          title: "The beginning",*/}
          {/*          infoList: [*/}
          {/*            "The Tayto Inscription protocol made the BRC-20",*/}
          {/*            "standard possible on ERC20",*/}
          {/*            "Buy $TYTO and stake for play in the playground",*/}
          {/*            "Token standards on Bitcoin: BRC-20, ORC-20,...",*/}
          {/*          ],*/}
          {/*        },*/}
          {/*        {*/}
          {/*          title: "Inscribe & Deploy & Develop",*/}
          {/*          infoList: [*/}
          {/*            "Potential ideas: ERC20 Inscription marketplace",*/}
          {/*            "Inscribe ERC20 Inscription",*/}
          {/*            "Development partners: Unisat, other EVM ",*/}
          {/*            "Inscription platforms",*/}
          {/*          ],*/}
          {/*        },*/}
          {/*        {*/}
          {/*          title: "$TYTO Token",*/}
          {/*          infoList: [*/}
          {/*            "Research on the applicability of the BRC-20 ",*/}
          {/*            "token standard Public Mint - $TYTO Token",*/}
          {/*            "Start building utilities for the $TYTO token",*/}
          {/*          ],*/}
          {/*        },*/}
          {/*        {*/}
          {/*          title: "Telegram Bot",*/}
          {/*          infoList: ["Inscribe Bot", "ERC-20 Buy Bot", "Swap Bot"],*/}
          {/*        },*/}
          {/*        {*/}
          {/*          title: "$TYTO Utility",*/}
          {/*          infoList: [*/}
          {/*            "Share revenue (Marketplace and Bots fees) to ",*/}
          {/*            "$TYTO stake holders",*/}
          {/*            "List $TYTO on CEX",*/}
          {/*            "Deploy BRC-20 Bridge for $TYTO tokens",*/}
          {/*          ],*/}
          {/*        },*/}
          {/*        {*/}
          {/*          title: "Cross chain Inscription market base on Bitcoin",*/}
          {/*          infoList: [*/}
          {/*            "Deploy BRC-20 Bridge for all other tokens",*/}
          {/*            "Stay up to date with technology to build other",*/}
          {/*            "DeFi ideas",*/}
          {/*          ],*/}
          {/*        },*/}
          {/*      ].map((item, idx) => {*/}
          {/*        return (*/}
          {/*          <div*/}
          {/*            id={"part-" + (idx + 1)}*/}
          {/*            className={pageStyle.roadmapItemBItem}*/}
          {/*          >*/}
          {/*            <div className={pageStyle.roadmapItemNum}>{idx + 1}</div>*/}
          {/*            <div className={pageStyle.roadmapItemTitle}>*/}
          {/*              {item.title}*/}
          {/*            </div>*/}
          {/*            {item.infoList.map((itemA, idxA) => (*/}
          {/*              <div className={pageStyle.roadmapItemInfo}>{itemA}</div>*/}
          {/*            ))}*/}
          {/*          </div>*/}
          {/*        );*/}
          {/*      })}*/}
          {/*    </div>*/}
          {/*  </div>*/}
        </div>
        <div className={pageStyle.backgroundItemC}></div>
        <div className={pageStyle.backgroundItemD}></div>
      </div>
      {/**
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            Click the connect button on the top of this page!
          </p>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
 */}
    </div>
  );
}
