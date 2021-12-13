import { useState, useRef,memo } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';

import FileDownload from 'js-file-download';

import axios from 'axios';

import "react-toastify/dist/ReactToastify.css";
import './fileUploader.css';

const FileUploader = (props) => {

    const [file, setFile] = useState([]);
    const [loadingState, setLoadingState] = useState(false);

    const inputFile = useRef(null);
    
    const successToast=()=>{
        toast("Result Computed Successfully",{
            className:"fp11Toast",
            draggable:true,
            position:toast.POSITION.TOP_CENTER 
         });
    }
    
    const errorToast=(message="Error In File Uploading")=>{
        toast(message,{
            className:"fp11Toast",
            draggable:true,
            position:toast.POSITION.TOP_CENTER 
         });
    }
    
    const onInputChange = (event) => {
        const file = event.target.files[0]; // accesing file
        setFile(file); // 
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        setLoadingState(true);
        const data = new FormData();
        data.append('file', file);

        const config = {
            headers: {
                'content-type':'multipart/form-data'
            }
        }

        let endpoint = props.action.toLowerCase();
        console.log(endpoint);
        let downloadName = endpoint === "speechtotext" ? "transcript" : "summary";

        try {
            const response = await axios.post(`//localhost:5000/${endpoint}`, data, config);
            setLoadingState(false);
            successToast();
            FileDownload(response.data, `${downloadName}.txt`);
        } catch(e) {
            if (e.response && e.response.data) {
                errorToast(e.response.data.message); // some reason error message
            }
            else {
                errorToast();
            }
            setLoadingState(false);
        }
    
    }

    return (
        <div className="fp11UploaderWrapper">
            <form method="post" action="#" id="#" onSubmit={onSubmit}>
                <label className="fp11Label">Upload Your File </label>
                <div className="fp11FileUploader">
                    <div className="fp11formGroup fp01files"> 
                    <ToastContainer 
                    draggable={false}
                    transition={Bounce}
                    autoClose={1000}
                    />
                    <i className="fp11Icon fas fa-cloud-upload-alt"></i>
                    <input
                    type="file" 
                    ref={inputFile}
                    onChange={onInputChange} 
                    className="fp11formControl" 
                    /> 
                    </div>
                </div>     
            </form>
            <div className="fp11upbutton">
                <button onClick={onSubmit}>                   
                    Upload
                </button>
            </div>
            {loadingState?
                <div className="fp11loadmessage">The Result is being computed. Please wait for some time....</div> : null}
        </div>
    )
};

export default memo(FileUploader);