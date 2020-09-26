import axios from "axios";
import { use } from "passport";
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
    },
    locationAdd: async function (userdata) {
        const data = await axios.post("/api/locationadd", userdata);
        return data.config.data;
    },
    locationRead: async function () {
        const { data } = await axios.get('api/locationread');
        if (data.length === 0) {
            return "none";
        } else {
            let inventory = {};

            for (let i = 0; i < data.length; i++) {
                let key = data[i].location;
                let value = data[i].qty;
                inventory[key] = value;
            }
            return inventory;
        }
    },
    locationUpdate: async function (userdata) {
        const data = await axios.put("api/locationupdate", userdata);
        return data;
    },
    locationDelete: async function (location) {
        const data = await axios.delete(`api/locationdelete/${location}`);
        return data;
    },
    logCreate: async function (userdata) {
        const { data } = await axios.post("api/logcreate", userdata);
        console.log(data);
        return data;
    },
    logRead: async function () {
        const { data } = await axios.get("api/logread");
        return data;
    }

};
