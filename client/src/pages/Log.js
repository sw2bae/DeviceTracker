import React, { useState, useEffect } from "react";
import API from "../utils/API";
import Header from "../components/header";
import LogHead from "../components/loghead";
import LogBody from "../components/logbody";
import SearchForm from "../components/searchform";


// import { Link, useLocation } from "react-router-dom";

function Log() {

    const [logData, setLogData] = useState([{}]);
    const [filteredLog, setFilteredLog] = useState([{}]);

    const [btnStatus, setBtnStatus] = useState({
        nummode: "⬇",
        charmode1: "⬇",
        charmode2: "⬇"
    }
    );

    const fetchData = async () => {
        let logs = [];
        const data = await API.logRead();
        for (let i = 0; i < data.length; i++) {
            let log = {
                id: data[i].id,
                data: data[i].date,
                time: data[i].time,
                userId: data[i].logInId,
                location1: data[i].location_1,
                location2: data[i].location_2,
                qty: data[i].qty
            };
            logs.push(log);
        };
        setLogData(logs);
        setFilteredLog(logs.reverse());
    };

    useEffect(() => {
        fetchData();
    }, []);

    function handleSearch(e) {
        const { value } = e.target;
        let searchByUserId = logData.filter(logdata =>
            new RegExp(value, "i").test(logdata.userId)
        );
        console.log(searchByUserId);
        setFilteredLog(searchByUserId);
        console.log(filteredLog);
    }

    function sortByNum() {
        console.log(btnStatus.nummode);
        if (btnStatus.nummode === "⬇") {
            setBtnStatus({ ...btnStatus, nummode: "⬆" });
            setFilteredLog(filteredLog.reverse());
        } else {
            setBtnStatus({ ...btnStatus, nummode: "⬇" });
            setFilteredLog(filteredLog.reverse());
        };
    };

    // function sortByChar(e) {
    //     if (btnStatus.charmode === "⬇") {
    //         setBtnStatus({ ...btnStatus, charmode: "⬆" });
    //         let byName = function (a, b) {
    //             var nameA = a.name.replace(/ /gi, "").toUpperCase();
    //             var nameB = b.name.replace(/ /gi, "").toUpperCase();
    //             if (nameA < nameB) {
    //                 return -1;
    //             }
    //             if (nameA > nameB) {
    //                 return 1;
    //             }
    //             return 0;
    //         }
    //         const filteredUsersCopy0 = [...filteredUsers];
    //         let sortedbyName = filteredUsersCopy0.sort(byName);
    //         setFilteredUsers(sortedbyName);
    //     } else {
    //         setBtnStatus({ ...btnStatus, charmode: "⬇" });
    //         let byName = function (a, b) {
    //             var nameA = a.name.replace(/ /gi, "").toUpperCase();
    //             var nameB = b.name.replace(/ /gi, "").toUpperCase();
    //             if (nameA > nameB) {
    //                 return -1;
    //             }
    //             if (nameA < nameB) {
    //                 return 1;
    //             }
    //             return 0;
    //         }
    //         const filteredUsersCopy1 = [...filteredUsers];
    //         let sortedbyName = filteredUsersCopy1.sort(byName);
    //         setFilteredUsers(sortedbyName);
    //     }
    // }

    return (
        <>
            <Header />
            <main className="card mt-3">
                <div className="container card mt-5 mb-5">
                    <SearchForm handleSearch={handleSearch} />
                    <table className="table table-striped mb-3">
                        <LogHead btnStatus={btnStatus} sortByNum={sortByNum} />
                        <LogBody logData={filteredLog} />
                    </table>
                </div>
            </main>
        </>
    );
}

export default Log;
