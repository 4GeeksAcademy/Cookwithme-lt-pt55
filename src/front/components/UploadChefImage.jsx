import React, { useEffect, useRef } from "react";

const UploadChefImage = () => {

    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        console.log(cloudinaryRef.current)
    }, [])

    return (
        <>
            <h1>Upload your image</h1>
            <button onClick={() => widgetRef.current.open()}>
                Upload
            </button>

        </>
    )
}

export default UploadChefImage;