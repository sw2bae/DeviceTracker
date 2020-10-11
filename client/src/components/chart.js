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
            <div className="card mt-5 mb-sm-5 col-sm-4">
                <h1 className="font-weight-bold text-center mt-3">TOTAL : </h1>
                <h1 className="font-weight-bold text-center mt-3 mb-5"> {sum} EA.</h1>
                <Link type="button" className="btn btn-info mb-3" to='/O1'>O1 : {model1} ea. </Link>
                <p className="font-weight-bold">↳ [AgingRoom : {model1AgingRoom} ea.] + [OutBound : {model1 - model1AgingRoom} ea.]</p>
                <Link type="button" className="btn btn-info mb-3" to='/T2'>T2 : {model2} ea.</Link>
                <p className="font-weight-bold">↳ [AgingRoom : {model2AgingRoom} ea.] + [OutBound : {model2 - model2AgingRoom} ea.]</p>
                <Link type="button" className="btn btn-info mb-3" to='/P3'>P3 : {model3} ea.</Link>
                <p className="font-weight-bold">↳ [AgingRoom : {model3AgingRoom} ea.] + [OutBound : {model3 - model3AgingRoom} ea.]</p>
            </div>
            <div className="col-1"></div>
            <div className="card mt-5 mb-5 col-sm">
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





