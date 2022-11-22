import React, {useState} from 'react';

const Modal = (props : any) => {
    const [value, setValue] = useState("");
    const [delTask, setDelTask] = useState(false)
    const [myStyle, setMyStyle] = useState({display : "block"})

    const handleInput = (e : any) => {
        setValue(e.target.value);
    }
    const handleSubmit = (e : any) => {
        e.preventDefault();
        props.submitModal(props.focusedFolder.id, value, value);
        setValue("");
    }

    const handleDeleteTask = () => {
        setMyStyle({display : "none"});
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
        <div >
            <div className="container" style={myStyle}>
                    <div className="confirmation-text">
                        Add folder in `{props.focusedFolder.folder_name}` 
                    </div>
                    <form action="" id='form' onSubmit={handleSubmit}>
                        <input value={value} onChange={handleInput} placeholder='Enter folder name' required/>
                    </form>
                    <div className="button-container">
                    <button className="cancel-button" onClick={props.closeModal}>Cancel</button>
                    <button form='form' type='submit' className="confirmation-button">Create</button>
                        {/* <button
                            className="cancel-button"
                            onClick={() => handleConfirmationBox()}>
                            Cancel
                        </button>
                        <button
                            className="confirmation-button"
                            onClick={handleDeleteTask}>
                            Delete
                        </button> */}
                    </div>
                </div>
                <div
                    className="confirm-bg"
                    onClick={() => handleConfirmationBox()}>
                        asfasf
                </div>
           
        </div>
    );
};

export default Modal;