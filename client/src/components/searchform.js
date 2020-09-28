import React from "react";
// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function SearchForm({ handleSearch }) {
    return (

        <div className="form-group container col-4 mt-3">
            <input
                onChange={handleSearch}
                name="term"
                type="text"
                className="form-control"
                placeholder="Search by User ID"
            />
        </div>

    );
}
export default SearchForm;
