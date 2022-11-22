import React, { useEffect, useRef, useState } from 'react';
import "../App.css"

const Confirm = () => {

    const [delTask, setDelTask] = useState(false)

    const handleDeleteTask = () => {

    }
    

    const myStyle = {
        display : "none"
    }
    const handleConfirmationBox = () => {
        if (!delTask) {
            // document.querySelector<HTMLElement>(".confirm-bg").style.display = "flex"
            // document.querySelector<HTMLElement>(".container").style.display = "flex"
            
            setDelTask(true)
        } else {
            // document.querySelector<HTMLElement>(".confirm-bg").style.display = "none";
            // document.querySelector<HTMLElement>(".container").style.display = "none";
            setDelTask(false);
        }
    }
        return (
            <div>
                <div className="container" style={myStyle}>
                    <div className="confirmation-text">
                        Do you really want to delete this task?
                    </div>
                    <div className="button-container">
                        <button
                            className="cancel-button"
                            onClick={() => handleConfirmationBox()}>
                            Cancel
                        </button>
                        <button
                            className="confirmation-button"
                            onClick={handleDeleteTask}>
                            Delete
                        </button>
                    </div>
                </div>
                <div
                    className="confirm-bg"
                    onClick={() => handleConfirmationBox()}>
                </div>
            </div>
        );
};

    export default Confirm;