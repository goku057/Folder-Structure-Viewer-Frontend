import React, { useEffect, useState } from 'react';
import Folder from './Folder';
import { backendURL } from "../helpers";
import "../App.css";
import Modal from './Modal';
import Confirm from './Confirm';

const FolderList = () => {
    const [folders, setFolders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [focusedFolder, setFocusedFolder] = useState(undefined);
    const [refresh, setRefresh] = useState(false);
    const [showListInfo, setShowListInfo] = useState([]);

    let myToggle = () => {
        
    }

    useEffect(() => {
        console.log(backendURL);
        fetch(backendURL + "/")
            .then(res => res.json())
            .then(res => {
                // console.log(res);
                setFolders(res);
            })
    }, [refresh]);

    const handleAdd = (e: any) => {
        setShowModal(true); 
        setFocusedFolder(e);
        
    }
    
    const handleDelete = (e : any) => {
        let a  = window.confirm("Delete `" + e.folder_name + "`?");
        // console.log(a);
        // console.log("Delete button pressed");
        let data = {
            folderID : e.id
        }
        if(a){
            fetch(backendURL + "/remove", {
                method : "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => {
                // alert("Removed successfully");
                console.log(res);
                setRefresh(!refresh);
            })
            .catch(e => {
                console.log("error in handle delete of folderList.tsx")
                console.log(e);
            });
        }
        
    }
    const closeModal = () => {
        setShowModal(false);
    }

    const submitModal = (parentID : string , folderName : string) => {
        let data = {
            folderParentID : parentID,
            name : folderName
        }
        // console.log(data);
        fetch(backendURL + "/create", {
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            setRefresh(!refresh);
            setShowModal(false);
            console.log(res)}
            )
        .catch(e => {
            console.error("error in submitModal")
            // console.log(e);
        });
    }

    let printTree = (node : any) : any => { 
        return (
            <ul key={node.id}>
                {node.descendents.length === 0 ? <li>No folder here</li> : null}
                {node.descendents ?  node.descendents.map( (n: any) => {
                    return(
                        <ul key={n.id}>
                            <li>{<Folder folderInfo = {n} handleAdd = {handleAdd} handleDelete = {handleDelete}/>} 
                            </li> 
                            {printTree(n)}
                        </ul>
                    );
                }) : "No folders here"}
            </ul>
        );
    }

    return (
        <div>
            {/* <Confirm /> */}

            {showModal && <Modal closeModal = {closeModal} focusedFolder = {focusedFolder} submitModal = {submitModal}/>}
            <ul >
                <li>root <button className='btn' onClick={() => handleAdd(folders[0])}><span><img src={"https://cdn-icons-png.flaticon.com/512/1828/1828925.png"} style={{ width: "15px", height: "15px"}} alt="" /> New</span></button></li>
                {!folders.length && "-No Folders"}
                {folders.length && printTree(folders[0])}
            </ul>
        </div>
    );
};

export default FolderList;