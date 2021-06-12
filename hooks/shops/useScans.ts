import React from "react";

const useScans = () => {

    const [scans, setScans] = React.useState("");
    return {scans, setScans}

}

export default useScans;
