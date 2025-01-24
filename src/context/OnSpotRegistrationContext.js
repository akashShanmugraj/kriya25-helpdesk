import { createContext, useContext, useState } from "react";

const OnSpotRegistrationContext = createContext();

const OnSpotRegistrationContextProvider = ({ children }) => {

    const [url, setUrl] = useState("");
    const [status, setStatus] = useState(null);
    const [details, setDetails] = useState({
        name: "",
        kriyaId: ""
    });

    return <OnSpotRegistrationContext.Provider value={
        { urlState: [url, setUrl], detailsState: [details, setDetails], statusState: [status, setStatus] }
    }>
        {children}
    </OnSpotRegistrationContext.Provider>
}

export const useOnSpotRegistration = () => useContext(OnSpotRegistrationContext);
export default OnSpotRegistrationContextProvider;