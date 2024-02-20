import React, { useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export default function FnToastMessageComp({ message, duration,Header,apiStatus  }) {
    const [showToast, setShowToast] = useState([])

    setTimeout(() => {
        setShowToast(false)
    }, duration)

    const bgColorFromapiStatus = ()=>{
        if ((apiStatus === 201) || (apiStatus ===200)){
            return '#2cb978'
        }else{
            return '#d72323'
        }
    }

    return (
        <ToastContainer
            className="position-static"
        >
            <Toast
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={duration}
                autohide

                style={{ position: 'fixed', right: '7px', bottom: '7px',zIndex:'1000'}}
            >
                <Toast.Header closeButton={false} style={{backgroundColor:bgColorFromapiStatus(),color:"#FFF"}}>
                    <strong>{Header}</strong>
                </Toast.Header>
                <Toast.Body>
                    {message}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    )
}