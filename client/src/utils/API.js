import axios from "axios";
// import { use } from "passport";
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
        const data = await axios.post("/api/inventoryadd", userdata);
        return data.config.data;
    },
    locationRead: async function (model) {
        const { data } = await axios.get(`api/inventoryread/${model}`);
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
    locationUpdate: async function (userdata, model) {
        const data = await axios.put(`api/inventoryupdate/${model}`, userdata);
        return data;
    },
    locationDelete: async function (location, model) {
        const data = await axios.delete(`api/inventorydelete/${model}/${location}`,);
        return data;
    },
    logCreate: async function (userdata) {
        const { data } = await axios.post("api/logcreate", userdata);
        return data;
    },
    logRead: async function () {
        const { data } = await axios.get("api/logread");
        return data;
    },
    dailyLog: async function (model) {
        const { data } = await axios.get(`api/dailyLog/${model}`);
        return data;
    }

};
