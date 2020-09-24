import { getUser, getAddressList } from "../service/getData";
import { GET_USERINFO } from "./mutation-types.js";
export default {
    async GET_USERINFO({commit,state}){
        let res=await getUser()
        commit(GET_USERINFO,res)
    }
};
