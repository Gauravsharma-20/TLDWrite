import { useState, useRef, memo } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import DragBrowseUploader from './DragBrowseUploader';

import FileDownload from 'js-file-download';

import axios from 'axios';

import "react-toastify/dist/ReactToastify.css";
import './fileUploader.css';

const FileUploader = () => {

    const [file, setFile] = useState([]);
    const [uploadPercentage, setUploadPercentage]=useState(0);

    const inputFile = useRef(null);

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
        setUploadPercentage(0);
        const file = event.target.files[0]; // accesing file
        console.log(file);
        setFile(file); // 
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData();
        data.append('file', file);

        // const options = {
        //     onUploadProgress: (progressEvent) => {
        //       const {loaded, total} = progressEvent;
        //       let percent = Math.floor( (loaded * 100) / total )
        //       console.log( `${loaded}kb of ${total}kb | ${percent}%` );
      
        //       if( percent < 100 ){
        //         setUploadPercentage(percent);
        //       }

        //     }
        //   }

        const config = {
            headers: {
                'content-type':'multipart/form-data'
            }
        }

        try {
            const response = await axios.post('//localhost:5000/speechtotext', data, config)

            successToast();
            FileDownload(response.data, 'report.txt');
        }catch(event) {
            // alert(e);
            errorToast();
        }
    
    }

    return (
        <div className="fp11UploaderWrapper">
        {/* <form method="post" action="#" id="#" onSubmit={onSubmit}>
            <label className="fp11Label">Upload Your File </label>
            <div className="fp11FileUploader">
                <div className="fp11formGroup fp01files"> 
                <ToastContainer 
                draggable={false}
                transition={Bounce}
                autoClose={1000}
                />
                <i class="fp11Icon fas fa-cloud-upload-alt"></i>
                <header>Drag and Drop Files</header>
                    <span>OR</span>
                <input
                type="file" 
                ref={inputFile}
                onChange={onInputChange} 
                className="fp11formControl" 
                /> */}
                {/* { uploadPercentage > 0 ? <ProgressBar now={uploadPercentage} active label={`${uploadPercentage}%`} />:null } */}
                {/* </div>
            </div>     
            </form>  */}
            {/* // <div className="fp11upbutton">
            //     <button onClick={onSubmit}>                   
            //         Upload
            //     </button>
            // </div> */}
            <DragBrowseUploader />
        </div>
    )
};

export default memo(FileUploader);