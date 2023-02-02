import React, { createContext, useContext, useEffect, useState } from "react";
import Layout from "@theme/Layout";
import useRouterQuery from "../hooks/useRouterQuery";
import TailwindWrapper from "../components/TailwindWrapper";
import Step from "../components/Stepper/Step";
import Stepper from "../components/Stepper";
import StepLoginGithub from "./certificate/_StepLoginGithub";
import StepConnectWallet from "./certificate/_StepConnectWallet";
import StepMint from "./certificate/_StepMint";
import StepEnd from "./certificate/_StepEnd";
import { useRequest } from "ahooks";
import { getUserCourseInfo } from "../api/user";
import get from "lodash/get";
import TailwindImage from "../components/Image";
import { getCourseInfo } from "../api/course";
import useAuth from "../hooks/useAuth";
import Link from "@docusaurus/Link";
import { CourseIdAndSuffixLinkMap } from "../constants/course";
import { StarknetConfig } from "@starknet-react/core";

export const CertificateContext = createContext(null);

const Main = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [finish, setFinish] = useState(false);
  const [finishTxInfo, setFinishTxInfo] = useState(null);
  const { info, requestInfoLoading } = useContext(CertificateContext);
  const { isLogin } = useAuth();

  const hasClaimed = get(info, "hasClaimed");
  const canGraduate = get(info, "can_graduate");
  const title = get(info, "course_info.course_title");
  const nftImage = get(info, "course_info.image_url");
  const courseId = get(info, "courseId");

  useEffect(() => {
    if (hasClaimed) {
      setFinish(true);
    }
  }, [hasClaimed]);

  const handleNext = (step) => {
    if (step || step === 0) {
      setActiveStep(step);
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleFinish = (info) => {
    setFinish(true);
    setFinishTxInfo(info);
  };

  const Title = () => {
    if (!isLogin) {
      return <>领取WTF Solidity入门的技能认证NFT</>;
    }

    if (requestInfoLoading) {
      return <>数据加载中...</>;
    }

    if (!canGraduate) {
      return <>你尚未完成WTF Solidity入门课程</>;
    }

    return (
      <>
        恭喜你，
        <br className="md:hidden" />
        通过WTF {title}测试
      </>
    );
  };

  const SubTitle = () => {
    if (!isLogin) {
      return <>请登录后完成下面步骤领取技能认证NFT吧！</>;
    }

    if (requestInfoLoading) {
      return <>耐心等待！</>;
    }

    if (!canGraduate) {
      return (
        <>
          进入
          <Link to={CourseIdAndSuffixLinkMap[courseId]}>课程页面</Link>
          继续学习并通过测试吧！
        </>
      );
    }

    return <>按照下面步骤领取技能认证NFT吧！（公测）</>;
  };

  return (
    <>
      <div className="container">
        <div className="flex flex-col mt-10 md:items-center">
          <h1 className="text-[28px] font-bold md:text-[40px]">
            <Title />
          </h1>
          <p className="text-md lg:text-2xl lg:mt-3">
            <SubTitle />
          </p>
        </div>
        <div className="w-full bg-[#7A7A7A99] m-auto h-px my-8 lg:mt-[54px] lg:mb-[90px]" />
        <div className="flex flex-col lg:flex-row">
          <div className="lg:mr-[10%]">
            <div className="font-medium text-[24px] mb-6">NFT证书展示</div>
            <div className="lg:w-[602px]">
              <TailwindImage
                src={nftImage}
                imageClass="w-full min-h-[229px] max-h-[400px] lg:w-[602px] lg:h-[302px]"
              />
            </div>
          </div>
          {/*<div className="divider my-6 lg:hidden lg:my-0" />*/}
          <div className="flex-auto mb-20 mt-6 lg:mt-0 lg:mb-0">
            <div className="font-medium text-[24px] mb-6">
              {finish ? "🎉 NFT证书领取成功！" : "领取NFT证书"}
            </div>
            <div className="flex flex-col mt-8 gap-y-4 lg:mt-0">
              {!finish && (
                <Stepper activeStep={activeStep}>
                  <Step>
                    <StepLoginGithub next={handleNext} />
                  </Step>
                  <Step disabled={!canGraduate}>
                    <StepConnectWallet info={info} next={handleNext} />
                  </Step>
                  <Step disabled={!canGraduate}>
                    {/* <StepMint info={info} next={handleFinish} /> */}
                  </Step>
                </Stepper>
              )}
              {finish && <StepEnd txInfo={finishTxInfo} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Certificate = () => {
  const routerQuery = useRouterQuery();
  const courseId = routerQuery.get("cid");
  const { data: courseInfoData } = useRequest(() => getCourseInfo(courseId));

  const courseInfo = get(courseInfoData, "data", {});
  const tokenId = get(courseInfo, "course_info.token_id");

  const { data, loading, refresh } = useRequest(
    () => getUserCourseInfo(courseId, tokenId),
    { manual: true }
  );

  const userInfoWithCourse = get(data, "data", {});

  useEffect(() => {
    if (tokenId || tokenId === 0) {
      refresh();
    }
  }, [tokenId]);

  return (
    <TailwindWrapper>
      <Layout noFooter>
        <CertificateContext.Provider
          value={{
            info: { ...userInfoWithCourse, courseId, ...courseInfo },
            refreshInfo: refresh,
            requestInfoLoading: loading,
          }}
        >
          <StarknetConfig>
            <Main />
          </StarknetConfig>
        </CertificateContext.Provider>
      </Layout>
    </TailwindWrapper>
  );
};

export default Certificate;
