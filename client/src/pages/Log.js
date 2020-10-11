import React, { useState, useEffect } from "react";
import API from "../utils/API";
import Header from "../components/header";
import LogHead from "../components/loghead";
import LogBody from "../components/logbody";
import SearchForm from "../components/searchform";
import Footer from "../components/footer";


// import { Link, useLocation } from "react-router-dom";

function Log() {

    const [logData, setLogData] = useState([{}]);
    const [filteredLog, setFilteredLog] = useState([{}]);

    const [btnStatus, setBtnStatus] = useState({
        nummode: "⬇",
        location1: "⬇",
        location2: "⬇",
        userId: "⬇"
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
                model: data[i].model,
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
        let searchByModel = logData.filter(logdata =>
            new RegExp(value, "i").test(logdata.model)
        );
        console.log(searchByModel);
        setFilteredLog(searchByModel);
        console.log(filteredLog);
    }

    function sortByNum() {
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

    function sortByChar(e) {
        const { id } = e.target;
        if (btnStatus[id] === "⬇") {
            setBtnStatus({ ...btnStatus, [id]: "⬆" });
            let byName = function (a, b) {
                var logA = a[id].replace(/ /gi, "").toUpperCase();
                var logB = b[id].replace(/ /gi, "").toUpperCase();
                if (logA < logB) {
                    return -1;
                }
                if (logA > logB) {
                    return 1;
                }
                return 0;
            }
            const filteredLogCopy = [...filteredLog];
            let sortedbyLocation = filteredLogCopy.sort(byName);
            setFilteredLog(sortedbyLocation);
        } else {
            setBtnStatus({ ...btnStatus, [id]: "⬇" });
            let byName = function (a, b) {
                var logA = a[id].replace(/ /gi, "").toUpperCase();
                var logB = b[id].replace(/ /gi, "").toUpperCase();
                if (logA > logB) {
                    return -1;
                }
                if (logA < logB) {
                    return 1;
                }
                return 0;
            }
            const filteredLogCopy = [...filteredLog];
            let sortedbyLocation = filteredLogCopy.sort(byName);
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
                        <LogHead btnStatus={btnStatus} sortByNum={sortByNum} sortByChar={sortByChar} />
                        <LogBody logData={filteredLog} />
                    </table>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Log;
