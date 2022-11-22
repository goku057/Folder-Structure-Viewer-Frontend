import React, { useState } from 'react';
import "../App.css";

const Folder = (props: any) => {
    const [showList, setShowList] = useState(true);
    
    return (
        <div id={ props.folderInfo.id} style={{display: "inherit", width : "100%"}}>
                <div style={{display:"inherit"}}>
                    {props.folderInfo.folder_name}
                </div>
                <div style={{display:"inherit"}}>
                    {props.folderInfo.id !== "root" ? <span onClick={() => props.handleDelete(props.folderInfo)}><img src={"https://cdn-icons-png.flaticon.com/512/1828/1828843.png"} className="cross-image" alt=""/>
                    </span> : null}
                    <button className='btn' onClick={() => props.handleAdd(props.folderInfo)}><span><img src={"https://cdn-icons-png.flaticon.com/512/1828/1828925.png"} className="add-image"   alt="" /> New</span></button>
                </div>
        </div>
    );
};

export default Folder;