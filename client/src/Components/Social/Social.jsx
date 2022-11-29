import React from "react";
import { useParams } from "react-router-dom";

const Social = () => {
    const {url} = useParams();

    window.location.replace('https://google.com')

    return null
}

export default Social;