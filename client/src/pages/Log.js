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
            let byNum = function (a, b) {
                var logA = a.id;
                var logB = b.id;
                if (logA < logB) {
                    return -1;
                }
                if (logA > logB) {
                    return 1;
                }
                return 0;
            }
            const filteredLogCopy_0 = [...filteredLog];
            let sortedbyNum = filteredLogCopy_0.sort(byNum);
            setFilteredLog(sortedbyNum);
        } else {
            setBtnStatus({ ...btnStatus, nummode: "⬇" });
            let byNum = function (a, b) {
                var logA = a.id;
                var logB = b.id;
                if (logA > logB) {
                    return -1;
                }
                if (logA < logB) {
                    return 1;
                }
                return 0;
            }
            const filteredLogCopy_1 = [...filteredLog];
            let sortedbyNum = filteredLogCopy_1.sort(byNum);
            setFilteredLog(sortedbyNum);
        };
    };


    function sortByCharLocation1(e) {
        if (btnStatus.charmode1 === "⬇") {
            setBtnStatus({ ...btnStatus, charmode1: "⬆" });
            let byName = function (a, b) {
                var logA = a.location1.replace(/ /gi, "").toUpperCase();
                var logB = b.location1.replace(/ /gi, "").toUpperCase();
                if (logA < logB) {
                    return -1;
                }
                if (logA > logB) {
                    return 1;
                }
                return 0;
            }
            const filteredLogCopy_2 = [...filteredLog];
            let sortedbyLocation = filteredLogCopy_2.sort(byName);
            setFilteredLog(sortedbyLocation);
        } else {
            setBtnStatus({ ...btnStatus, charmode1: "⬇" });
            let byName = function (a, b) {
                var logA = a.location1.replace(/ /gi, "").toUpperCase();
                var logB = b.location1.replace(/ /gi, "").toUpperCase();
                if (logA > logB) {
                    return -1;
                }
                if (logA < logB) {
                    return 1;
                }
                return 0;
            }
            const filteredLogCopy_3 = [...filteredLog];
            let sortedbyLocation = filteredLogCopy_3.sort(byName);
            setFilteredLog(sortedbyLocation);
        };
    };
    function sortByCharLocation2(e) {
        if (btnStatus.charmode2 === "⬇") {
            setBtnStatus({ ...btnStatus, charmode2: "⬆" });
            let byName = function (a, b) {
                var logA = a.location2.replace(/ /gi, "").toUpperCase();
                var logB = b.location2.replace(/ /gi, "").toUpperCase();
                if (logA < logB) {
                    return -1;
                }
                if (logA > logB) {
                    return 1;
                }
                return 0;
            }
            const filteredLogCopy_4 = [...filteredLog];
            let sortedbyLocation = filteredLogCopy_4.sort(byName);
            setFilteredLog(sortedbyLocation);
        } else {
            setBtnStatus({ ...btnStatus, charmode2: "⬇" });
            let byName = function (a, b) {
                var logA = a.location2.replace(/ /gi, "").toUpperCase();
                var logB = b.location2.replace(/ /gi, "").toUpperCase();
                if (logA > logB) {
                    return -1;
                }
                if (logA < logB) {
                    return 1;
                }
                return 0;
            }
            const filteredLogCopy_5 = [...filteredLog];
            let sortedbyLocation = filteredLogCopy_5.sort(byName);
            setFilteredLog(sortedbyLocation);
        }
    }



    return (
        <>
            <Header />
            <main className="card mt-3">
                <div className="container card mt-5 mb-5">
                    <SearchForm handleSearch={handleSearch} />
                    <table className="table table-striped mb-3">
                        <LogHead btnStatus={btnStatus} sortByNum={sortByNum} sortByCharLocation1={sortByCharLocation1} sortByCharLocation2={sortByCharLocation2} />
                        <LogBody logData={filteredLog} />
                    </table>
                </div>
            </main>
        </>
    );
}

export default Log;
