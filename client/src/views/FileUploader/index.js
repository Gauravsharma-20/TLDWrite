import {useState} from 'react';
import { toast, ToastContainer} from 'react-toastify';

import axios from 'axios';

import './fileUploader.css';

export const FileUploader = ({onSuccess}) => {
    const [file, setFile] = useState([]);

    const onInputChange = (e) => {
        setFile(e.target.files[0])
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('file', file);

        const config = {
            headers: {
                'content-type':'multipart/form-data'
            }
        }

        axios.post('//localhost:5000/speechtotext', data, config)
            .then((response) => {
                console.log(response.data.text)
                toast.success(response.data);
            })
            .catch((e) => {
                toast.error('Upload Error')
            })
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