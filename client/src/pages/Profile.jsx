//eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"
import { app } from '../firebase'

const Profile = () => {
  const {currentUser}  = useSelector((store) => store.user);
  const [file, setFile] = useState(undefined);
  const [uploadPercentage , setUploadPercentage] = useState(0);
  const [fileUploadError , setFileUploadError] = useState(false)
  const fileRef = useRef(null);
  const [formData ,setFormData] = useState({})

  
  
  const handleImageClick = () => {
    fileRef.current.click()
  };

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageReference = ref(storage , fileName);
    const uploadTask = uploadBytesResumable(storageReference , file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100 ;
        setUploadPercentage(Math.round(progress));

      },
      (error) => {
        setFileUploadError(true);
      },
      () =>{
        getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => {
          setFormData({...formData , avatar: downloadURL});
        })
      }
    );
  };

  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file])

  return (
    
    <div className='p-3 max-w-lg mx-auto'>            
      <h1 className='text-3xl font-semibold text-center my-7 '>Profile</h1>        
      <form className='flex flex-col gap-4'>
        <input 
          onChange={(event) => {
            setFile(event.target.files[0])
          }}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
        <img 
          onClick={handleImageClick}
          src={formData.avatar || currentUser.avatar} alt='Profile' 
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center'
        />
        <p className='text-sm self-center'>
          {
            fileUploadError ? 
              (<span className='text-red-700'>Error Uploading the Image (Image must be less tha 2MB) </span>) :
                uploadPercentage > 0 && uploadPercentage < 100 ? (<span className='text-gray-700'>{`Uploading ${uploadPercentage}`}</span>) :
                uploadPercentage === 100 && fileUploadError === false ? (<span className = "text-green-700"> Image successfully Uploaded </span>) :
                ("")
          }
        </p>
        <input
          type='text'
          id='username'
          placeholder='Username'
          className='border p-3 rounded-lg '
        />
        <input
          type='email'
          id='email'
          placeholder='Email'
          className='border p-3 rounded-lg '
        />
        <input
          type='text'
          id='password'
          placeholder='password'
          className='border p-3 rounded-lg '
        />
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer '> Delete Account </span>
        <span className='text-red-700 cursor-pointer '> Sign Out </span>
      </div>
    </div>
  )
}

export default Profile