import React, {useEffect, useState} from 'react';
import FolderList from './components/FolderList';
import { backendURL } from "./helpers";

function App() {
    const [refresh, setRefresh] = useState(false);
    const [folders, setFolders] : any = useState([]);
    const[renderList, setRenderList] = useState(false);
    const[backendMsg, setBackendMsg] = useState("");

    useEffect(() => {
      // console.log("app effect")
      // console.log(backendURL);
      fetch(backendURL + "/")
          .then(res => res.json())
          .then(res => {
              // console.log(res);
              setFolders(res);
              setRenderList(true);
          })
          .catch( e => {
            console.log(e)
            setBackendMsg("Could Not connect to server probably railway app monthly 20days trial expired");
          })
  }, [refresh]);

  const refreshTheApp = () => {
    setRenderList(false);
    setRefresh(!refresh);
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Folder Structure Viewer!</h1>
          {renderList && <FolderList folderList = {folders} refreshTheApp = {refreshTheApp}/>}
      </header>
      <div>{backendMsg}</div>
    </div>
  );
}

export default App;
