import {useState} from 'react';
import { toast} from 'react-toastify';

import axios from 'axios';

import './fileUploader.css';

export const FileUploader = ({onSuccess}) => {
    const [files, setFiles] = useState([]);

    const onInputChange = (e) => {
        setFiles(e.target.files)
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();

        for(let i = 0; i < files.length; i++) {
            data.append('file', files[i]);
        }

        axios.post('//localhost:8000/upload', data)
            .then((response) => {
                toast.success('Upload Success');
                onSuccess(response.data)
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
                    <input type="file" onChange={onInputChange} className="fp11formControl" multiple/>
                </div>
                <div className="fp11Button">
                <button >Submit</button>
                </div>
            </div>    
        </form>
    )
};

export default FileUploader;