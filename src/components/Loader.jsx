import React from 'react'
import { RotatingLines } from 'react-loader-spinner';

const Loader = ({ height = "100", width = "100", color = "#0077ff" }) => {
    return (
        <RotatingLines
            visible={true}
            height={height}
            width={width}
            strokeColor={color}
            strokeWidth="5"
            animationDuration="1"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    )
}

export default Loader
