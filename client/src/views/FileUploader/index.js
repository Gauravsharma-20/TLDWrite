import {useState} from 'react';
import { toast, ToastContainer} from 'react-toastify';
import FileDownload from 'js-file-download';

import axios from 'axios';

import './fileUploader.css';

export const FileUploader = ({onSuccess}) => {
    const [file, setFile] = useState([]);

    const onInputChange = (e) => {
        setFile(e.target.files[0])
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('file', file);

        const config = {
            headers: {
                'content-type':'multipart/form-data'
            }
        }

        try {
            const response = await axios.post('//localhost:5000/speechtotext', data, config)
            alert("Success")
            FileDownload(response.data, 'report.txt');
        }
        catch(e) {
            alert(e);
        }
    };

    return (
        <form method="post" action="#" id="#" onSubmit={onSubmit}>
            <div className="fp11FileUploader">
                <div className="fp11formGroup fp01files">
                    <label className="fp11Label">Upload Your File </label>
                    <input type="file" onChange={onInputChange} className="fp11formControl"/>
                </div>
                <div className="fp11Button">
                <button >Submit</button>
                <ToastContainer />
                </div>
            </div>    
        </form>
    )
};

export default FileUploader;