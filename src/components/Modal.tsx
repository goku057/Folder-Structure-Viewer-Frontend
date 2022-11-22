import React, {useState} from 'react';

const Modal = (props : any) => {
    const [value, setValue] = useState("");

    const handleInput = (e : any) => {
        setValue(e.target.value);
    }
    const handleSubmit = (e : any) => {
        e.preventDefault();
        props.submitModal(props.focusedFolder.id, value, value);
        setValue("");
    }

    
    return (
        <div>
            <h3>Add folder in `{props.focusedFolder.folder_name}` </h3>
            <form action="" id='form' onSubmit={handleSubmit}>
                <input value={value} onChange={handleInput} placeholder='Enter folder name' required/>
            </form>
            <button onClick={props.closeModal}>Cancel</button><button form='form' type='submit'>Create</button>
        </div>
    );
};

export default Modal;