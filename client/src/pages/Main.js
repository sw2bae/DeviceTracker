import React, { useEffect, useState } from "react";
import API from "../utils/API";
import Header from "../components/header";
// import { PieChart } from 'react-minimal-pie-chart';
import Chart from "../components/chart";
import Footer from "../components/footer";

function Main() {

    const [model1, setModel1] = useState();
    const [model2, setModel2] = useState();
    const [model3, setModel3] = useState();

    const [model1AgingRoom, setModel1AgingRoom
    ] = useState();
    const [model2AgingRoom, setModel2AgingRoom
    ] = useState();
    const [model3AgingRoom, setModel3AgingRoom] = useState();

    const fetchData = async () => {
        const Model1 = await API.locationRead("O1");
        const Model2 = await API.locationRead("T2");
        const Model3 = await API.locationRead("P3");

        let model1count = (Object.values(Model1));
        let model1AgingRoomCount = Model1["Aging Room"];
        let model1sum = model1count.reduce((pre, value) => {
            return pre + value;
        });
        let model2count = (Object.values(Model2));
        let model2AgingRoomCount = Model2["Aging Room"];
        let model2sum = model2count.reduce((pre, value) => {
            return pre + value;
        });
        let model3count = (Object.values(Model3));
        let model3AgingRoomCount = Model3["Aging Room"];
        let model3sum = model3count.reduce((pre, value) => {
            return pre + value;
        });

        const countModel1 = model1sum
        const countModel2 = model2sum
        const countModel3 = model3sum

        setModel1AgingRoom(model1AgingRoomCount);
        setModel2AgingRoom(model2AgingRoomCount);
        setModel3AgingRoom(model3AgingRoomCount);

        setModel1(countModel1);
        setModel2(countModel2);
        setModel3(countModel3);
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Header />
            <main>
                <div className="container">
                    <div className="row">
                        <Chart model1={model1} model2={model2} model3={model3} model1AgingRoom={model1AgingRoom} model2AgingRoom={model2AgingRoom} model3AgingRoom={model3AgingRoom} />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Main;

