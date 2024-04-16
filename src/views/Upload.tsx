import React, { useState } from 'react';
import { useForm } from '../hooks/formHooks';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);

  const navigate = useNavigate();

  const initValues = {
    title: '',
    description: '',
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      // Simulate API call to post the file with title and description
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', inputs.title);
      formData.append('description', inputs.description);

      // Example of a fetch call to the API endpoint
      // Replace the URL with your actual endpoint
      const response = await fetch('api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Handle successful upload
        alert('File uploaded successfully!');
        navigate('/');
      } else {
        // Handle error
        alert('Failed to upload file.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const { handleSubmit: handleFormSubmit, handleInputChange, inputs } = useForm(
    handleSubmit,
    initValues
  );

  return (
    <>
    <div className="upload-container">
      <form className='upload-form' onSubmit={handleFormSubmit}>
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
        <div className="">
          <img
            className=""
            src={
              file
                ? URL.createObjectURL(file)
                : '../200.png'
            }
            alt="preview"
            width="200"
          />
        </div>
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
