import { Button, Flex, Image, Typography } from "antd";

import BtnIcon1 from "@/assets/images/firstInscriptionBtnIcon1.svg";
import BtnIcon2 from "@/assets/images/firstInscriptionBtnIcon2.svg";
import styles from "@/styles/Home.module.css";

import pageStyle from "./index.module.css";

const { Text } = Typography;

export default function MarketPlace() {
  // 一些页面数据
  return (
    <div
      className={styles.container}
      style={{ overflow: "hidden" }}
      data-theme="fantasy"
    >
      <div className={`${"min-h-screen"} ${pageStyle.background}`}>
        <div className={pageStyle.topBox}>
          <Text className={`${pageStyle.pageTitle}`}>
            The First Inscription Protocol on Blast L2
          </Text>

          <Text className={`${pageStyle.pageInfo}`}>
            Amidst the desolation and wonders of Planet Blast, a humble potato
            became the key to rescuing stranded astronauts. Now, this potato
            leads us into a new era of inscriptions.
          </Text>
          <Text className={`${pageStyle.subInfo}`}>Feature</Text>
          <Text className={`${pageStyle.subInfoTime}`}>12:12:00</Text>
          <Text className={`${pageStyle.subInfoSubInfo}`}>Not started yet</Text>

          <Flex
            className={`${pageStyle.btnList}`}
            vertical={false}
            justify={"center"}
            align={"center"}
          >
            <Button
              className={`${"firstInscriptionBtn"} ${
                pageStyle.btnBorderColor1
              }`}
            >
              <Flex
                justify={"center"}
                align={"center"}
                className={pageStyle.btnContent}
              >
                <div style={{ marginRight: "0.3vw" }}>
                  <Image width={"4vw"} src={BtnIcon1} preview={false} />
                </div>
                <Text className={pageStyle.btn}>Blast Inscription</Text>
              </Flex>
            </Button>
            <Button className="firstInscriptionBtn">
              <Flex
                justify={"center"}
                align={"center"}
                className={pageStyle.btnContent}
              >
                <div style={{ marginRight: "0.6vw" }}>
                  <Image width={"3vw"} src={BtnIcon2} preview={false} />
                </div>

                <Text className={pageStyle.btn}>Trading Marketplace</Text>
              </Flex>
            </Button>
          </Flex>
        </div>
        <div className={pageStyle.topPlate1}>
          <Text className={`${pageStyle.text1}`}>
            As the{" "}
            <span style={{ fontSize: "2.6vw", color: "#753300" }}>first</span>{" "}
            Blast native inscription protocol standard, we aim to innovate and
            empower the Blast ecosystem.
          </Text>
          <Text className={`${pageStyle.text2}`}>
            By harnessing the strengths and overcoming the limitations of
            protocols like{" "}
            <span style={{ color: "#753300" }}>BRC-20, ORC-20, RUNE,</span> and
            blending them with Ethereum's{" "}
            <span style={{ color: "#753300" }}>EVM</span>, we've crafted a
            groundbreaking inscription standard protocol. This strategy
            maximizes the versatility of inscriptions across diverse
            applications.
          </Text>
        </div>
        <div className={pageStyle.topPlate2}>
          <Text className={`${pageStyle.text1}`}>
            User-Friendly with Zero Tax Fee
          </Text>
          <Text className={`${pageStyle.text2}`}>
            We're committed to providing a fluid interaction experience for the
            pioneers on Blast, enabling large-scale, high-concurrency
            transactions.
          </Text>
          <Text className={`${pageStyle.text3}`}>
            Our platform offers ease and reduced friction costs for high-volume
            trading, ensuring a user-friendly environment with zero tax fee .
          </Text>
        </div>
        <div className={pageStyle.topPlate3}>
          <Text className={`${pageStyle.text1}`}>
            Unlimited Availability and Composability
          </Text>
          <Text className={`${pageStyle.text2}`}>
            Our platform supports developers in creating on the inscription
            framework, encompassing Staking, DEX, Lending protocols, DAO
            governance, and derivatives.
          </Text>
          <Text className={`${pageStyle.text3}`}>
            Our mission is to broaden the construction of Blast and L2
            Inscription DeFi applications. We are dedicated to continuously
            upgrading protocol standards to support a wide range of
            inscription-based developments.
          </Text>
        </div>
      </div>
    </div>
  );
}
