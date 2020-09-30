import React, { useEffect, useState } from "react";
import API from "../utils/API";
import Header from "../components/header";
import In from "../components/in";
import Out from "../components/out";
import { LocationProvider } from "../utils/LocationContext";

function Main() {

    const [inventory, setInventory] = useState("none");
    const [currentUser, setCurrentUser] = useState({});
    const [dailyLogData, setDailyLogData] = useState([{}]);

    var firstLocation;
    var secondLocation;
    const locationsArray = (Object.keys(inventory));

    // const inventoryCount = async () => {
    //     const count = await API.locationRead();
    //     setInventory(count);
    // };

    // const dailyLogRead = async () => {
    //     const data = await API.dailyLog();
    //     const recentData = data.reverse();
    //     setDailyLogData(recentData);
    // };

    const fetchData = async () => {
        const { user } = await API.checkAuth();
        const count = await API.locationRead();
        const data = await API.dailyLog();
        const recentData = data.reverse();

        setCurrentUser(user);
        setInventory(count);
        setDailyLogData(recentData);
    };
    useEffect(() => {
        fetchData();
    }, []);



    async function plusBtn(e) {
        e.preventDefault();
        const location = e.target.value;
        const count = await API.locationRead();
        // console.log("COUNT==>", count[location]);
        const addQty = prompt("(+) Please Enter Qty : ");
        if (count[location] === undefined) {
            await API.locationAdd({
                location: location,
                qty: addQty
            });
            API.logCreate({
                logInId: currentUser.userId,
                location_1: "+",
                location_2: location,
                qty: addQty
            });
        } else if (addQty <= 0) {
            alert("QTY Input Error");
        } else {
            // --------------
            await API.locationUpdate({
                location: location,
                qty: parseInt(count[location]) + parseInt(addQty)
            });
            API.logCreate({
                logInId: currentUser.userId,
                location_1: "+",
                location_2: location,
                qty: addQty
            });
        };
        fetchData();
    };

    async function minusBtn(e) {
        e.preventDefault();
        const location = e.target.value;
        const count = await API.locationRead();
        // console.log("COUNT==>", count[location]);
        const subtractQty = prompt("(-) Please Enter Qty : ");
        if (count[location] === undefined || count[location] === 0) {
            alert("No Stock")
        } else if (parseInt(count[location]) - parseInt(subtractQty) < 0 || subtractQty <= 0) {
            alert("QTY Input Error");
        } else {
            await API.locationUpdate({
                location: location,
                qty: parseInt(count[location]) - parseInt(subtractQty)
            });
            API.logCreate({
                logInId: currentUser.userId,
                location_1: "-",
                location_2: location,
                qty: subtractQty
            });
        }
        fetchData();
    };


    async function dragStart(e) {
        firstLocation = e.target.id;
        e.target.className += " bg-dark text-white";
        // fetchData();
    };
    function dragEnd(e) {
        e.preventDefault();
        if (e.target.id === "OutBound") {
            e.target.className = "card mt-5 mb-5 col-sm";
        } else {
            e.target.className = "font-weight-bold text-center mt-1 mb-1 border rounded";
        }
        // fetchData();
    };
    function dragOver(e) {
        e.preventDefault();
        // fetchData();
    };
    function dragEnter(e) {
        e.preventDefault();
        if (e.target.id === "OutBound") {
            e.target.className += " bg-info text-white";
        } else {
            e.target.className += " bg-dark text-white";
        }
        // fetchData();
    };
    function dragLeave(e) {
        e.preventDefault();
        if (e.target.id === "OutBound") {
            e.target.className = "card mt-5 mb-5 col-sm";
        } else {
            e.target.className = "font-weight-bold text-center mt-1 mb-1 border rounded";
        }
    };

    async function dragDrop(e) {
        e.preventDefault();
        e.stopPropagation()
        secondLocation = e.target.id;

        if (secondLocation === "OutBound") {
            const newLocation = prompt("Location : ")
            const addQty = prompt("QTY : ");
            e.target.className = "card mt-5 mb-5 col-sm";

            const count = await API.locationRead();
            console.log("COUNT=====>", count[firstLocation]);
            console.log("COUNT=====>", count[newLocation]);
            if (count[newLocation] !== undefined) {
                alert("Duplicated Location Input");
            } else if (count[firstLocation] == undefined || count[firstLocation] === 0) {
                alert("No Stock");
            } else if (!isNaN(Number(newLocation))) {
                alert("Location Input Error");
            } else if (parseInt(count[firstLocation]) - parseInt(addQty) < 0 || addQty <= 0) {
                alert("QTY Input Error");
            } else if (parseInt(count[firstLocation]) - parseInt(addQty) === 0 && firstLocation !== "Aging Room") {
                await API.locationAdd({
                    location: newLocation,
                    qty: addQty
                }).then(() => {
                    API.locationDelete(firstLocation);
                    API.logCreate({
                        logInId: currentUser.userId,
                        location_1: firstLocation,
                        location_2: newLocation,
                        qty: addQty
                    });
                });
            } else {
                await API.locationAdd({
                    location: newLocation,
                    qty: addQty
                }).then(() => {
                    API.locationUpdate({
                        location: firstLocation,
                        qty: parseInt(count[firstLocation]) - parseInt(addQty)
                    });
                    API.logCreate({
                        logInId: currentUser.userId,
                        location_1: firstLocation,
                        location_2: newLocation,
                        qty: addQty
                    });
                });
            }
            fetchData();
        }
        else if (firstLocation === secondLocation) {
            e.target.className = "font-weight-bold text-center mt-1 mb-1 border rounded";
            fetchData();
            return;
        }
        else {
            const moveQty = prompt("QTY : ");
            e.target.className = "font-weight-bold text-center mt-1 mb-1 border rounded";

            const count = await API.locationRead();
            console.log("FIRST LOCATION===>", count[firstLocation]);
            console.log("SECOND LOCATION===>", count[secondLocation]);
            if (parseInt(count[firstLocation]) - parseInt(moveQty) < 0 || moveQty <= 0) {
                alert("QTY Input Error");
            } else if (count[firstLocation] == undefined || count[firstLocation] === 0) {
                alert("No Stock");
            } else if (parseInt(count[firstLocation]) - parseInt(moveQty) === 0) {

                if (firstLocation === "Aging Room") {
                    await API.locationUpdate({
                        location: secondLocation,
                        qty: parseInt(count[secondLocation]) + parseInt(moveQty)
                    }).then(() => {
                        API.locationUpdate({
                            location: firstLocation,
                            qty: parseInt(count[firstLocation]) - parseInt(moveQty)
                        });
                        API.logCreate({
                            logInId: currentUser.userId,
                            location_1: firstLocation,
                            location_2: secondLocation,
                            qty: moveQty
                        });
                    })
                } else {
                    await API.locationUpdate({
                        location: secondLocation,
                        qty: parseInt(count[secondLocation]) + parseInt(moveQty)
                    }).then(() => {
                        API.locationDelete(firstLocation);
                        API.logCreate({
                            logInId: currentUser.userId,
                            location_1: firstLocation,
                            location_2: secondLocation,
                            qty: moveQty
                        });
                    })
                };
            } else {
                await API.locationUpdate({
                    location: secondLocation,
                    qty: parseInt(count[secondLocation]) + parseInt(moveQty)
                }).then(() => {
                    API.locationUpdate({
                        location: firstLocation,
                        qty: parseInt(count[firstLocation]) - parseInt(moveQty)
                    });
                    API.logCreate({
                        logInId: currentUser.userId,
                        location_1: firstLocation,
                        location_2: secondLocation,
                        qty: moveQty
                    });
                });
            };
            fetchData();
        }
        fetchData();
    };

    return (
        <>
            <Header userId={currentUser.userId} />
            <main className="card mt-3">
                <div className=" container">
                    <LocationProvider value={inventory}>
                        <div className="row">
                            <In onDragStart={dragStart} onDragEnd={dragEnd} onDragOver={dragOver} onDragEnter={dragEnter} onDragLeave={dragLeave} onDragDrop={dragDrop} plusBtn={plusBtn} minusBtn={minusBtn} />
                            <div className="mr-3">
                            </div>
                            <Out onDragStart={dragStart} onDragEnd={dragEnd} onDragOver={dragOver} onDragEnter={dragEnter} onDragLeave={dragLeave} onDragDrop={dragDrop} dailyLogData={dailyLogData} />
                        </div>
                    </ LocationProvider>
                </div>
            </main>
        </>
    );
}

export default Main;

