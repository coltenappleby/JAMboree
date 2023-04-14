import React, { useState } from 'react';
import { Button, Input, TextField } from '@mui/material';
// import UploadFileIcon from "@mui/icons-material/UploadFile";
import { ListenHistory } from '../types';


interface FileUploadProps {
    addData: (params: any) => any;
}

function FileUpload( {addData}: FileUploadProps ) {

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
          const newData: ListenHistory[] = [];
          Array.from(files).forEach((file) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              try {
                const jsonData = event.target?.result as string;
                const parsedData = JSON.parse(jsonData) as ListenHistory[];
                newData.push(...parsedData);
                addData(newData);
              } catch (error) {
                console.error('Error parsing JSON data:', error);
                addData([]);
              }
            };
            reader.readAsText(file);
          });
        }
      };
   
    return (
        <div className="file-upload-container">
            <TextField
                type="file"
                onChange={handleFileChange}
                variant="outlined"
                fullWidth
                inputProps={{ multiple: true }}
            />

        </div>
    );
}

export default FileUpload;
