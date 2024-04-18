import React, {useEffect, useState} from 'react';
import {useForm} from '../hooks/formHooks';
import {useNavigate} from 'react-router-dom';
import {useUserContext} from '../hooks/ContextHooks';
import {useFile, useMedia} from '../hooks/apiHooks';

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const {handleAutoLogin} = useUserContext();
  const {postMedia} = useMedia();
  const {postFile} = useFile();

  const navigate = useNavigate();

  const initValues = {
    title: '',
    description: '',
  };

  const doSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token || !file) {
        return;
      }
      const fileResult = await postFile(file, token);
      console.log('fileresult', fileResult);
      const mediaResult = await postMedia(fileResult, inputs, token);
      console.log(mediaResult);
      navigate('/');
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doSubmit,
    initValues,
  );

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <>
      <div className="upload-container">
        <form className="upload-form" onSubmit={handleSubmit}>
          <div className="upload-title">
            <label className="" htmlFor="title">
              Title
            </label>
            <input
              className=""
              name="title"
              type="text"
              id="title"
              value={inputs.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="upload-des">
            <label className="" htmlFor="description">
              Description
            </label>
            <textarea
              className=""
              name="description"
              rows={5}
              id="description"
              value={inputs.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="">
            <label className="" htmlFor="file">
              File
            </label>
            <input
              className=""
              name="file"
              type="file"
              id="file"
              accept="image/*, video/*"
              onChange={handleFileChange}
            />
          </div>
          {file && (
            <div className="">
              {file && file.type.includes('video') ? (
                <video
                  className=""
                  src={file ? URL.createObjectURL(file) : '../200.png'}
                  width="200"
                  controls // Added controls attribute for video playback controls
                />
              ) : (
                <img
                  className=""
                  src={file ? URL.createObjectURL(file) : '../200.png'}
                  alt="preview"
                  width="200"
                />
              )}
            </div>
          )}
          <div className="">
            <button
              className=""
              type="submit"
              disabled={!file || inputs.title.length < 3}
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Upload;
