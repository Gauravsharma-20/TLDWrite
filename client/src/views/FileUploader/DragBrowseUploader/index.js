import React from "react";

import Dropzone from "react-dropzone-uploader";

import FileDownload from 'js-file-download';

import axios from 'axios';

import "react-dropzone-uploader/dist/styles.css";

export default function Uploader() {
    const getUploadParams = () => {
        return { url: "//localhost:5000/speechtotext" };
    };

    const handleChangeStatus = ({ meta }, status) => {
        console.log(status, meta);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData();
        const {file}=event;
        data.append('file', file);

        const config = {
            headers: {
                'content-type':'multipart/form-data'
            }
        }

        try {
            const response = await axios.post('//localhost:5000/speechtotext', data, config)

            // successToast();
            FileDownload(response.data, 'report.txt');
        }catch(event) {
            // alert(e);
            // errorToast();
        }

    }
  

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      styles={{ drp: { minHeight: 300, maxHeight: 300} }}
      
      
    />
  );
};