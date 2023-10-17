import React from 'react'
import { FileUpload } from '../FileUpload/FileUpload';
import { ModalComponent } from '../ModalComopnent/ModalComp';
import { useState ,useEffect } from 'react';

export const FileUploadModal = () => {
    const [fileUpload , setFileUpload ] = useState(false);
    
    const disableBodyScroll = () => {
      const [body] = document.getElementsByTagName("body");
      body.style.overflow = "hidden";
    }
    const enableBodyScroll = () => {
      const [body] = document.getElementsByTagName("body");
      body.style.overflow = "auto";
    }
    useEffect (()=> {
      window.scrollTo(0 , 0)
      fileUpload ? disableBodyScroll() : enableBodyScroll()
    },[fileUpload])
    return(
      <>
      <button onClick={()=> setFileUpload(true)}>Upload image</button>
      {
        fileUpload && (
         <div className="displayBlur">
           <ModalComponent setModalOpen={setFileUpload}>
            <FileUpload/>
          </ModalComponent>
         </div>
        )
      }
      </>
    )
  }
