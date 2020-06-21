import React, { useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import Card from './Card';

import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [response, setResponse] = useState("");
    const [values, setValues] = useState("")

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
        const filePath = URL.createObjectURL(e.target.files[0])
        setUploadedFile({ filePath });

    };

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        console.log("formdata " + file.type)



        // https://cal-track-api.herokuapp.com/predict
        try {
            const res = await axios.post('https://cal-track-api.herokuapp.com/predict ', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );

                    // Clear percentage
                    setTimeout(() => setUploadPercentage(0), 10000);
                }
            });

            console.log(res)
            JSON.stringify(res)
            console.log(res.data)
            setResponse(res.data.predictions)
            setValues(res.data.values)
            setMessage('File Uploaded');





        } catch (err) {
            console.log(err)
            // if (err.response.status === 500) {
            //     setMessage('There was a problem with the server');
            // } else {
            // setMessage(err);
            // }
        }
    };





    return (
        <div className="container col-md-8">
            {message ? <Message msg={message} /> : null}
            <form onSubmit={onSubmit}>
                <div className='custom-file mb-4'>
                    <input
                        type='file'
                        className='custom-file-input'
                        id='customFile'
                        onChange={onChange}
                    />
                    <label className='custom-file-label' htmlFor='customFile'>
                        {filename}
                    </label>

                </div>

                {uploadPercentage ? <Progress percentage={uploadPercentage} /> : null}


                <div className="container col-md-6">


                    <input
                        type='submit'
                        value='Upload'
                        className='btn btn-primary btn-block mt-4'
                    />
                </div>


            </form>


            {uploadedFile ? (
                <div className='row mt-5'>
                    <div className='col-md-6 m-auto'>

                        <Card imgSrc={uploadedFile.filePath} body={response.toUpperCase()} val={values} />

                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default FileUpload;