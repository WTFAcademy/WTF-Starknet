import request from "./request";
import { gql } from "graphql-request";
import gqlClient from "./graph";
import get from "lodash/get";

export const getUserCourseInfo = async (courseId, needClaimId) => {
  const res = await request
    .get(`/user_course/${courseId}`)
    .then((res) => res.data);
  const bindWallet = get(res, "data.user_wallet.wallet");
  if (bindWallet) {
    const tokenInfo = await userTokenInfo(bindWallet);
    const curTokenInfo = get(tokenInfo, "user.created", []).find(
      (item) => item.soulId === needClaimId + ""
    );
    console.log(curTokenInfo);
    const hasClaimed = !!curTokenInfo;
    const donationAmount = get(curTokenInfo, "creator.amount", 0);
    console.log(hasClaimed, donationAmount);
    return {
      ...res,
      data: {
        ...res.data,
        hasClaimed,
        donationAmount: donationAmount / 10 ** 18,
      },
    };
  }

  return res;
};

export const getMintInfoByCourse = (courseId) => {
  return request
    .post(`/user_course/${courseId}/nft_sign`)
    .then((res) => res.data);
};

export const bindWallet = (mesData, signData, wallet) => {
  return request
    .post("/wallet/bind", {
      mesData,
      signData,
      wallet,
    })
    .then((res) => res.data);
};

export const userTokenInfo = async (address) => {
  const query = gql`
    query getTokenInfo($address: String!) {
      user(id: $address) {
        created {
          soulId
          creator {
            amount
          }
        }
        amount
      }
    }
  `;
  return await gqlClient.request(query, { address: address.toLowerCase() });
};
