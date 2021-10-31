import { useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { ToastContainer, toast, Bounce } from 'react-toastify';

import FileDownload from 'js-file-download';

import axios from 'axios';

import "react-toastify/dist/ReactToastify.css";
import './fileUploader.css';

const FileUploader = ({onSuccess}) => {

    const [file, setFile] = useState([]);
    const [uploadPercentage, setUploadPercentage]=useState(0);

    const successToast=()=>{
        toast("File Uploaded Successfully",{
            className:"fp11Toast",
            draggable:true,
            position:toast.POSITION.TOP_CENTER 
         });
    }
    
    const errorToast=()=>{
        toast("Error In File Uploading",{
            className:"fp11Toast",
            draggable:true,
            position:toast.POSITION.TOP_CENTER 
         });
    }
    
    const onInputChange = (event) => {
        setFile(event.target.files[0])
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData();
        data.append('file', file);

        const options = {
            onUploadProgress: (progressEvent) => {
              const {loaded, total} = progressEvent;
              let percent = Math.floor( (loaded * 100) / total )
              console.log( `${loaded}kb of ${total}kb | ${percent}%` );
      
              if( percent < 100 ){
                setUploadPercentage(percent);
              }
            }
          }

        try {
            const response = await axios.post('//localhost:5000/speechtotext', data, options)
            // alert("Success");
            successToast();
            FileDownload(response.data, 'report.txt');
        }
        catch(event) {
            // alert(e);
            errorToast();
        }
    };

    return (
        <div className="fp11UploaderWrapper">
        <form method="post" action="#" id="#" onSubmit={onSubmit}>
            <label className="fp11Label">Upload Your File </label>
            <div className="fp11FileUploader">
                <div className="fp11formGroup fp01files"> 
                <ToastContainer 
                draggable={false}
                transition={Bounce}
                autoClose={5000}
                />
                <i class="fp11Icon fas fa-cloud-upload-alt"></i>
                <header>Drag and Drop Files</header>
                    <span>OR</span>
                <button>Browse</button>
                <input 
                type="file" 
                onDrop={onInputChange}
                onDragOver={(event)=>{
                    event.preventDefault();
                    event.stopPropagation();
                }}
                onChange={onInputChange} 
                className="fp11formControl" 
                hidden
                /> 
                </div>
            </div>     
        </form>
        { uploadPercentage > 0 ? <ProgressBar now={uploadPercentage} active label={`${uploadPercentage}%`} />:null }
        </div>
    )
};

export default FileUploader;