import React, { useEffect, useState } from 'react';
import Folder from './Folder';
import { backendURL } from "../helpers";
import "../App.css";
import Modal from './Modal';


const FolderList = ({folderList, refreshTheApp} : any) => {
    const [folders, setFolders] : any = useState(folderList);
    const [showModal, setShowModal] = useState(false);
    const [focusedFolder, setFocusedFolder] = useState(undefined);
    const [refresh, setRefresh] = useState(false);
    const downURL = "https://cdn-icons-png.flaticon.com/512/57/57055.png";
    const rightURL = "https://cdn-icons-png.flaticon.com/512/59/59385.png";
    
    useEffect(() => {
        setFolders(folders);
    }, [folders]);

    const handleAdd = (e: any) => {
        setShowModal(true);
        setFocusedFolder(e);
    }

    const handleDelete = (e: any) => {
        let a = window.confirm("Delete `" + e.folder_name + "`?");
        // console.log(a);
        // console.log("Delete button pressed");
        let data = {
            folderID: e.id
        }
        if (a) {
            fetch(backendURL + "/remove", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(res => {
                    // alert("Removed successfully");
                    console.log(res);
                    setRefresh(!refresh);
                    refreshTheApp();
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

    const submitModal = (parentID: string, folderName: string) => {
        let data = {
            folderParentID: parentID,
            name: folderName
        }
        // console.log(data);
        fetch(backendURL + "/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                setRefresh(!refresh);
                setShowModal(false);
                refreshTheApp();
                console.log(res)
            }
            )
            .catch(e => {
                console.error("error in submitModal")
                // console.log(e);
            });
    }

    const setShowStatus  = (node : any, id : string) => {
        console.log("setShow called")
        if(node.id === id){
            node.isVisited = !node.isVisited;
        }
        if(node.descendents.length <= 0){
            return;
        }
            
        for (let i = 0; i < node.descendents.length; i++) {
            setShowStatus(node.descendents[i], id);    
        }

        
        return ;
    }

    const handleView = (e: any, id: string) => {
        console.log(id);
        setShowStatus(folders[0], id);
        setRefresh(!refresh);
    }
    let printTree = (node: any): any => {
        // console.log(node);
        // console.log("ez");
        // console.log("Node name is " + node.folder_name + " visited = " + node.isVisited);
        return (
            <ul key={node.id} id = {node.id} >
                <img src={node.isVisited ? downURL : rightURL} className='arrow-img' alt="" data-fid = {node.id} onClick = {(e) => handleView(e, node.id)}/>
                <div style={{display : "inline", width : "100%"}}>{<Folder folderInfo={node} handleAdd={handleAdd} handleDelete={handleDelete} />}</div>
                {(node.descendents.length && node.isVisited) ? node.descendents.map((n: any) => {
                            
                                return printTree(n);
                            
                    }) : null }
                {(node.descendents.length || !node.isVisited) ? null : <div style={{marginLeft : "15px"}}>{"-No folders "}</div> }
            </ul>
        );
    }






    return (
        <div>
            {/* <Confirm /> */}
            
            {showModal && <Modal closeModal={closeModal} focusedFolder={focusedFolder} submitModal={submitModal} />}
            {folders.length && printTree(folders[0])}
            
        </div>
    );
};

export default FolderList;