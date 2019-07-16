import fetch from "../config/fetch";

// 请求实例  https://elm.cangdu.org/v1/cities?type=guess
// 获取首页默认地址
export const cityGuess = () => fetch("/v1/cities", { type: "guess" });
// 获取首页热门城市
export const hotcity = () => fetch("/v1/cities", { type: "hot" });
// 获取首页所有城市
export const groupcity = () => fetch("/v1/cities", { type: "group" });
//   获取用户信息
export const getUser = () =>
  fetch("/v1/user", { user_id: getStore("user_id") });
// 个人中心里编辑地址
export const getAddressList = user_id =>
  fetch("/v1/users/" + user_id + "/addresses");
