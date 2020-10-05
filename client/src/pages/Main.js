import React, { useEffect, useState } from "react";
import API from "../utils/API";
import Header from "../components/header";
// import { PieChart } from 'react-minimal-pie-chart';
import Chart from "../components/chart";

function Main() {

    const [model1, setModel1] = useState();
    const [model2, setModel2] = useState();
    const [model3, setModel3] = useState();

    const fetchData = async () => {
        const Model1 = await API.locationRead("O1");
        const Model2 = await API.locationRead("T2");
        const Model3 = await API.locationRead("P3");

        let model1count = (Object.values(Model1));
        let model1sum = model1count.reduce((pre, value) => {
            return pre + value;
        });
        let model2count = (Object.values(Model2));
        let model2sum = model2count.reduce((pre, value) => {
            return pre + value;
        });
        let model3count = (Object.values(Model3));
        let model3sum = model3count.reduce((pre, value) => {
            return pre + value;
        });

        const countModel1 = model1sum
        const countModel2 = model2sum
        const countModel3 = model3sum

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
            <main className="card mt-3">
                <div className="container">
                    <div className="row">
                        <Chart model1={model1} model2={model2} model3={model3} />
                    </div>
                </div>
            </main>
        </>
    );
}

export default Main;

