import React, { useEffect, useState } from "react";
import API from "../utils/API";
import Header from "../components/header";
import In from "../components/in";
import Out from "../components/out";
import { LocationProvider } from "../utils/LocationContext";
import Footer from "../components/footer";

function Main1() {

    var para = document.location.href.split("/");
    const currentModel = para[3];

    const [inventory, setInventory] = useState("none");
    const [currentUser, setCurrentUser] = useState({});
    const [dailyLogData, setDailyLogData] = useState([{}]);


    var firstLocation;
    var secondLocation;

    const fetchData = async () => {
        const { user } = await API.checkAuth();
        const count = await API.locationRead(currentModel);
        const data = await API.dailyLog(currentModel);
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
        const count = await API.locationRead(currentModel);
        const addQty = prompt("(+) Please Enter Qty : ");

        if (count[location] === undefined) {
            await API.locationAdd({
                location: location,
                qty: addQty,
                model: currentModel
            });
            API.logCreate({
                logInId: currentUser.userId,
                location_1: "+",
                location_2: location,
                qty: addQty,
                model: currentModel
            });
        } else if (addQty <= 0) {
            alert("QTY Input Error");
        } else {
            await API.locationUpdate({
                location: location,
                qty: parseInt(count[location]) + parseInt(addQty)
            }, currentModel);
            API.logCreate({
                logInId: currentUser.userId,
                location_1: "+",
                location_2: location,
                qty: addQty,
                model: currentModel
            });
        };
        fetchData();
    };

    async function minusBtn(e) {
        e.preventDefault();
        const location = e.target.value;
        const count = await API.locationRead(currentModel);
        const subtractQty = prompt("(-) Please Enter Qty : ");
        if (count[location] === undefined || count[location] === 0) {
            alert("No Stock")
        } else if (parseInt(count[location]) - parseInt(subtractQty) < 0 || subtractQty <= 0) {
            alert("QTY Input Error");
        } else {
            await API.locationUpdate({
                location: location,
                qty: parseInt(count[location]) - parseInt(subtractQty)
            }, currentModel);
            API.logCreate({
                logInId: currentUser.userId,
                location_1: "-",
                location_2: location,
                qty: subtractQty,
                model: currentModel
            });
        }
        fetchData();
    };

    async function dragStart(e) {
        firstLocation = e.target.id;
        e.target.className += " bg-dark text-white";
    };
    function dragEnd(e) {
        e.preventDefault();
        if (e.target.id === "OutBound") {
            e.target.className = "card mt-5 mb-5 col-sm";
        } else {
            e.target.className = "font-weight-bold text-center mt-1 mb-1 border rounded";
        }
    };
    function dragOver(e) {
        e.preventDefault();
    };
    function dragEnter(e) {
        e.preventDefault();
        if (e.target.id === "OutBound") {
            e.target.className += " bg-info text-white";
        } else {
            e.target.className += " bg-dark text-white";
        }
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
        // ---------------------------------------------------------------------
        if (secondLocation === "OutBound") {
            const newLocation = prompt("Location : ")
            const addQty = prompt("QTY : ");
            e.target.className = "card mt-5 mb-5 col-sm";

            const count = await API.locationRead(currentModel);
            console.log("COUNT=====>", count[firstLocation]);
            console.log("COUNT=====>", count[newLocation]);
            if (count[firstLocation] == undefined || count[firstLocation] == 0) {
                alert("No Stock");
            } else if (count[newLocation] !== undefined || !isNaN(Number(newLocation))) {
                alert("Location Input Error");
            } else if (parseInt(count[firstLocation]) - parseInt(addQty) < 0 || isNaN(Number(addQty)) || addQty <= 0) {
                alert("QTY Input Error");
            } else if (parseInt(count[firstLocation]) - parseInt(addQty) == 0) {
                if (firstLocation === "Aging Room") {
                    await API.locationAdd({
                        location: newLocation,
                        qty: addQty,
                        model: currentModel
                    }).then(() => {
                        API.locationUpdate({
                            location: firstLocation,
                            qty: parseInt(count[firstLocation] - parseInt(addQty))
                        }, currentModel);
                        API.logCreate({
                            logInId: currentUser.userId,
                            location_1: firstLocation,
                            location_2: newLocation,
                            qty: addQty,
                            model: currentModel
                        });
                    })
                } else {
                    await API.locationAdd({
                        location: newLocation,
                        qty: addQty,
                        model: currentModel
                    }).then(() => {
                        API.locationDelete(firstLocation, currentModel);
                        API.logCreate({
                            logInId: currentUser.userId,
                            location_1: firstLocation,
                            location_2: newLocation,
                            qty: addQty,
                            model: currentModel
                        });
                    })
                }
            } else {
                await API.locationAdd({
                    location: newLocation,
                    qty: addQty,
                    model: currentModel
                }).then(() => {
                    API.locationUpdate({
                        location: firstLocation,
                        qty: parseInt(count[firstLocation] - parseInt(addQty))
                    }, currentModel);
                    API.logCreate({
                        logInId: currentUser.userId,
                        location_1: firstLocation,
                        location_2: newLocation,
                        qty: addQty,
                        model: currentModel
                    });
                })
            }
            fetchData();
        }
        // ----------------------------------------------------
        else if (firstLocation == secondLocation) {
            e.target.className = "font-weight-bold text-center mt-1 mb-1 border rounded";
            fetchData();
            return;
        }
        // ----------------------------------------------------------
        else if (secondLocation === "Aging Room") {
            e.target.className = "font-weight-bold text-center mt-1 mb-1 border rounded";
            const count = await API.locationRead(currentModel);
            const moveQty = prompt("QTY : ");

            console.log("FIRST LOCATION===>", count[firstLocation]);
            console.log("SECOND LOCATION===>", count[secondLocation]);

            if (count[firstLocation] == undefined || count[firstLocation] == 0) {
                alert("No Stock");
            } else if (parseInt(count[firstLocation]) - parseInt(moveQty) < 0 || isNaN(Number(moveQty)) || moveQty <= 0) {
                alert("QTY Input Error");
            } else if (parseInt(count[firstLocation]) - parseInt(moveQty) == 0) {
                await API.locationUpdate({
                    location: secondLocation,
                    qty: parseInt(count[secondLocation]) + parseInt(moveQty)
                }, currentModel).then(() => {
                    API.locationDelete(firstLocation, currentModel);
                    API.logCreate({
                        logInId: currentUser.userId,
                        location_1: firstLocation,
                        location_2: secondLocation,
                        qty: moveQty,
                        model: currentModel
                    });
                })
            } else {
                await API.locationUpdate({
                    location: secondLocation,
                    qty: parseInt(count[secondLocation]) + parseInt(moveQty)
                }, currentModel).then(() => {
                    API.locationUpdate({
                        location: firstLocation,
                        qty: parseInt(count[firstLocation]) - parseInt(moveQty)
                    }, currentModel);
                    API.logCreate({
                        logInId: currentUser.userId,
                        location_1: firstLocation,
                        location_2: secondLocation,
                        qty: moveQty,
                        model: currentModel
                    });
                });
            };
            fetchData();
        }
        // ---------------------------------------------------
        else {
            e.target.className = "font-weight-bold text-center mt-1 mb-1 border rounded";
            const moveQty = prompt("QTY : ");
            const count = await API.locationRead(currentModel);

            console.log("FIRST LOCATION===>", count[firstLocation]);
            console.log("SECOND LOCATION===>", count[secondLocation]);

            if (count[firstLocation] == undefined || count[firstLocation] == 0) {
                alert("No Stock");
            } else if (parseInt(count[firstLocation]) - parseInt(moveQty) < 0 || isNaN(Number(moveQty)) || moveQty <= 0) {
                alert("QTY Input Error");
            } else if (count[secondLocation] == undefined) {
                alert(secondLocation + " is not on the list anymore");
            } else if (parseInt(count[firstLocation]) - parseInt(moveQty) == 0) {
                if (firstLocation === "Aging Room") {
                    await API.locationUpdate({
                        location: secondLocation,
                        qty: parseInt(count[secondLocation]) + parseInt(moveQty)
                    }, currentModel).then(() => {
                        API.locationUpdate({
                            location: firstLocation,
                            qty: parseInt(count[firstLocation]) - parseInt(moveQty)
                        }, currentModel);
                        API.logCreate({
                            logInId: currentUser.userId,
                            location_1: firstLocation,
                            location_2: secondLocation,
                            qty: moveQty,
                            model: currentModel
                        })
                    })
                } else {
                    await API.locationUpdate({
                        location: secondLocation,
                        qty: parseInt(count[secondLocation]) + parseInt(moveQty)
                    }, currentModel).then(() => {
                        API.locationDelete(firstLocation, currentModel);
                        API.logCreate({
                            logInId: currentUser.userId,
                            location_1: firstLocation,
                            location_2: secondLocation,
                            qty: moveQty,
                            model: currentModel
                        })
                    })
                }
            } else {
                await API.locationUpdate({
                    location: secondLocation,
                    qty: parseInt(count[secondLocation]) + parseInt(moveQty)
                }, currentModel).then(() => {
                    API.locationUpdate({
                        location: firstLocation,
                        qty: parseInt(count[firstLocation]) - parseInt(moveQty)
                    }, currentModel);
                    API.logCreate({
                        logInId: currentUser.userId,
                        location_1: firstLocation,
                        location_2: secondLocation,
                        qty: moveQty,
                        model: currentModel
                    });
                });
            };
            fetchData();
        };
        fetchData();
    };

    return (
        <>
            <Header />
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
            <Footer />
        </>
    );
}

export default Main1;

