import axios from "axios";
export default {
    signUp: async function (userdata) {
        const data = await axios.post("/api/signup", userdata);
        return data;
    },
    logIn: async function (userdata) {
        const { status } = await axios.post("/api/login", userdata);
        return status;
    },
    logOut: async function () {
        await axios.get('api/logout');
        return console.log("Logged Out!");
    },

    checkAuth: async function () {
        const { data } = await axios.get("api/checkAuthentication");
        return data;
    }
};