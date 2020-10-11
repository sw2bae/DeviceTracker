import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Link } from 'react-router-dom';


function Chart({ model1, model2, model3, model1AgingRoom, model2AgingRoom, model3AgingRoom }) {

    var sum = parseInt(model1 + model2 + model3);

    const state = {
        labels: ['O1', 'T2', 'P3',
        ],
        datasets: [
            {
                label: 'Palette',
                backgroundColor: [
                    '#B21F00',
                    '#C9DE00',
                    '#2FDE00',
                ],
                hoverBackgroundColor: [
                    '#501800',
                    '#4B5000',
                    '#175000'
                ],
                data: [model1, model2, model3]
            }
        ]
    }
    return (
        <>
            <div className="mt-5 mb-sm-5 col-sm-6">
                <h1 className="font-weight-bold text-center mt-3 mb-5">TOTAL : {sum} EA. </h1>
                <table className="table table-striped mb-3 container text-center ">
                    <thead>
                        <tr className="align-middle bg-secondary">
                            <th scope="col" >Model</th>
                            <th scope="col" >Aging Room</th>
                            <th scope="col" >Out Bound</th>
                            <th scope="col" >Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="font-weight-bold">O1</td>
                            <td>{model1AgingRoom} ea.</td>
                            <td>{model1 - model1AgingRoom} ea.</td>
                            <td>{model1} ea.</td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">T2</td>
                            <td>{model2AgingRoom} ea.</td>
                            <td>{model2 - model2AgingRoom} ea.</td>
                            <td>{model2} ea.</td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">P3</td>
                            <td>{model3AgingRoom} ea.</td>
                            <td>{model3 - model3AgingRoom} ea.</td>
                            <td>{model3} ea.</td>
                        </tr>
                        <tr className="font-weight-bold bg-danger">
                            <td>Total</td>
                            <td>{model1AgingRoom + model2AgingRoom + model3AgingRoom} ea.</td>
                            <td>{model1 - model1AgingRoom + model2 - model2AgingRoom + model3 - model3AgingRoom} ea.</td>
                            <td>{model1 + model2 + model3} ea.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="col-sm-1"></div>
            <div className=" mt-5 mb-5 col-sm card">
                <div className="mt-3">
                </div>
                <Pie
                    data={state}
                    options={{
                        title: {
                            display: true,
                            text: 'Palette',
                            fontSize: 25,
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                />
                <div className="mt-5">
                </div>
            </div>

        </>


    );

};

export default Chart;





