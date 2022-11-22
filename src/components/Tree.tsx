import React from 'react';
import Folder from './Folder';

const Tree = ({node, downURL, rightURL, handleView, handleAdd, handleDelete}: any) => {
    console.log("gg");
    return (
        <ul key={node.id} id = {node.id} >
            {node.isVisited && "asdasd"}
            <img src={node.isVisited ? downURL : rightURL} className='arrow-img' alt="" data-fid = {node.id} onClick = {(e) => handleView(e, node.id)}/>
            <div style={{display : "inline", width : "100%"}}>{<Folder folderInfo={node} handleAdd={handleAdd} handleDelete={handleDelete} />}</div>
            {node.descendents.length && node.isVisited ? node.descendents.map((n: any) => {
                        
                            return (<Tree node={node} downURL = {downURL} rightURL = {rightURL} handleView = {handleView} handleAdd = {handleAdd} handleDelete={handleDelete} />);
                        
                }) : <ul>No folders here</ul>}
        </ul>
    );
};

export default Tree;