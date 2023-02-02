import React, { useContext, useMemo } from "react";
import { LookSvg } from "../../svg";
import { CertificateContext } from "../certificate";
import get from "lodash/get";
import { OS_LINK } from "../../constants/nft";
import {
  CourseIdAndNameMap,
  CourseIdAndSuffixLinkMap,
} from "../../constants/course";

const StepEnd = (props) => {
  const { txInfo } = props;
  const { info } = useContext(CertificateContext);

  const donationAmount =
    Number(get(txInfo, "amount")) || Number(get(info, "donationAmount", 0));
  const title = get(info, "course_info.course_title");
  const courseId = get(info, "courseId");

  const twLink = useMemo(() => {
    const text = `I completed the ${CourseIdAndNameMap[courseId]} course at WTF Academy and claimed an on-chain certificate (SBT)! @WTFAcademy_

Join us at https://wtf.academy/${CourseIdAndSuffixLinkMap[courseId]}`;

    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  }, [courseId, title]);

  return (
    <div className="flex flex-col mb-20">
      <p className="text-[20px]">恭喜你在{title}课程中毕业。</p>
      {!!donationAmount && (
        <p className="mt-3 mb-2 text-[20px]">
          感谢您为WTF团队捐赠的
          <span className="mx-3 font-bold text-[#5CB173]">
            {donationAmount}
          </span>
          ETH！
        </p>
      )}
      <p className="text-[18px] font-medium my-4">
        <a
          className="inline-flex text-[#5CB173] cursor-pointer no-underline items-center"
          target="_blank"
          href={OS_LINK}
        >
          <LookSvg className="mr-2" />
          查看你的NFT
        </a>
      </p>
      <div className="relative w-3/4 h-16 bg-[#5CB173] text-center overflow-hidden rounded-lg mb-2 mt-8">
        <a
          className="flex item-center justify-center w-full h-full leading-[64px] text-2xl cursor-pointer no-underline"
          target="_blank"
          href={twLink}
        >
          <span className="font-bold text-white text-[18px]">
            点击分享至Twitter
          </span>
          <i className="relative inline-flex items-center h-16 my-auto ml-2">
            <svg
              className="h-6"
              clipRule="evenodd"
              fillRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit="2"
              viewBox="-89.00934757 -46.8841404 643.93723344 446.8841404"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m154.729 400c185.669 0 287.205-153.876 287.205-287.312 0-4.37-.089-8.72-.286-13.052a205.304 205.304 0 0 0 50.352-52.29c-18.087 8.044-37.55 13.458-57.968 15.899 20.841-12.501 36.84-32.278 44.389-55.852a202.42 202.42 0 0 1 -64.098 24.511c-18.42-19.628-44.644-31.904-73.682-31.904-55.744 0-100.948 45.222-100.948 100.965 0 7.925.887 15.631 2.619 23.025-83.895-4.223-158.287-44.405-208.074-105.504a100.739 100.739 0 0 0 -13.668 50.754c0 35.034 17.82 65.961 44.92 84.055a100.172 100.172 0 0 1 -45.716-12.63c-.015.424-.015.837-.015 1.29 0 48.903 34.794 89.734 80.982 98.986a101.036 101.036 0 0 1 -26.617 3.553c-6.493 0-12.821-.639-18.971-1.82 12.851 40.122 50.115 69.319 94.296 70.135-34.549 27.089-78.07 43.224-125.371 43.224a204.9 204.9 0 0 1 -24.078-1.399c44.674 28.645 97.72 45.359 154.734 45.359"
                fill="#fff"
                fillRule="nonzero"
              />
            </svg>
          </i>
        </a>
      </div>
      <div className="flex items-center mt-2">
        <span className="text-[18px]">其他分享：</span>
        <div className="inline-flex text-[18px]">
          <a
            className="inline-flex justify-center no-underline cursor-pointer item-center"
            target="_blank"
            href="https://www.instagram.com/"
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 106 106"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M80.7754 2.72461H25.0262C12.7105 2.72461 2.72656 12.7085 2.72656 25.0243V80.7735C2.72656 93.0893 12.7105 103.073 25.0262 103.073H80.7754C93.0913 103.073 103.075 93.0893 103.075 80.7735V25.0243C103.075 12.7085 93.0913 2.72461 80.7754 2.72461Z"
                fill="#333333"
                stroke="#333333"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path
                d="M52.8973 75.199C65.2132 75.199 75.197 65.2151 75.197 52.8993C75.197 40.5835 65.2132 30.5996 52.8973 30.5996C40.5815 30.5996 30.5977 40.5835 30.5977 52.8993C30.5977 65.2151 40.5815 75.199 52.8973 75.199Z"
                fill="white"
                stroke="white"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path
                d="M83.5593 27.8119C86.6383 27.8119 89.1342 25.3161 89.1342 22.237C89.1342 19.158 86.6383 16.6621 83.5593 16.6621C80.4803 16.6621 77.9844 19.158 77.9844 22.237C77.9844 25.3161 80.4803 27.8119 83.5593 27.8119Z"
                fill="white"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default StepEnd;
