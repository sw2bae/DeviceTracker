import React from "react";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function LogHead() {

    return (
        <thead>
            <tr>
                <th scope="col">Log #</th>
                <th scope="col">Time</th>
                <th scope="col">User ID</th>
                <th scope="col">Location From</th>
                <th scope="col">Location To</th>
                <th scope="col">QTY</th>
            </tr>
        </thead>
    );
}

export default LogHead;
