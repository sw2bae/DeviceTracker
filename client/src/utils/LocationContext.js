import React, { createContext, useContext } from "react";

const LocationContext = createContext();

export function LocationProvider({ children, value }) {
    return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
};
export function useLocationContext() {
    return useContext(LocationContext);
};

