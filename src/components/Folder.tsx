import React, { useState } from 'react';
import "../App.css";

const Folder = (props: any) => {
    const [showList, setShowList] = useState(true);
    
    return (
        <div id={ props.folderInfo.id} style={{display : "flex", justifyContent : "start", width : "20%", alignItems : "center"}}>
                {showList && <div>
                    {props.folderInfo.folder_name}
                </div>}
                {showList && <div>
                    <span onClick={() => props.handleDelete(props.folderInfo)}><img src={"https://cdn-icons-png.flaticon.com/512/1828/1828843.png"} style = {{width : "20px", height : "20px", marginLeft : "10px", marginRight : "10px"}} alt=""/>
                    </span> 
                    <button className='btn' onClick={() => props.handleAdd(props.folderInfo)}><span><img src={"https://cdn-icons-png.flaticon.com/512/1828/1828925.png"} style = {{width : "15px", height : "15px"}}  alt="" /> New</span></button>
                </div>}
        </div>
    );
};

export default Folder;