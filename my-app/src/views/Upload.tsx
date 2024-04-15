import {useState} from 'react';
import {useForm} from '../hooks/formHooks';
// import {useFile, useMedia} from '../hooks/apiHooks';
import {useNavigate} from 'react-router-dom';

// Upload.tsx
const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  {/*
  const {postFile} = useFile();
  const {postMedia} = useMedia();
*/}
  const navigate = useNavigate();

  const initValues = {
    title: '',
    description: '',
  };

  const doUpload = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token || !file) {
        return;
      }
      // TODO: call postFile function (see below)
      //const fileResult = await postFile(file, token);
      // TODO: call postMedia function (see below)
      //const mediaResult = await postMedia(fileResult, inputs, token);
      //alert(mediaResult.message);
      // TODO: redirect to Home
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
    doUpload,
    initValues,
  );

  return (
    <>
      <h1 className="text-3xl">Upload</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex w-4/5">
          <label className="w-1/3 p-6 text-end" htmlFor="title">
            Title
          </label>
          <input
            className="m-3 w-2/3 rounded-md border border-slate-200 p-3 text-slate-950 bg-slate-300"
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex w-4/5">
          <label className="w-1/3 p-6 text-end" htmlFor="description">
            Description
          </label>
          <textarea
            className="m-3 w-2/3  rounded-md border border-slate-200 p-3 text-slate-950 bg-slate-300"
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="flex w-4/5">
          <label className="w-1/3 p-6 text-end" htmlFor="file">
            File
          </label>
          <input
            className="m-3 w-2/3 rounded-md border border-slate-500 p-3 text-slate-950"
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex w-4/5 justify-end">
          <img
            className="w-2/3 p-6"
            src={
              file
                ? URL.createObjectURL(file)
                : 'https://via.placeholder.com/200?text=Choose+image'
            }
            alt="preview"
            width="200"
          />
        </div>
        <div className="flex w-4/5 justify-end">
          <button
            className="m-3 w-1/3 rounded-md bg-yellow-300 p-3 disabled:text-slate-950"
            type="submit"
            disabled={file && inputs.title.length > 3 ? false : true}
          >
            Upload
          </button>
        </div>
      </form>
    </>
  );
};

export default Upload;
