import React, { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebase";
import { toast } from "react-toastify";

const ProductImageUpload = ({ onImageUpload, existingImages }) => {
  const [files, setFiles] = useState("");
  const [previewUrls, setPreviewUrls] = useState("");

  useEffect(() => {
    if (existingImages !== "") {
      setPreviewUrls(existingImages);
    }
  }, [existingImages]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    let imageFiles = [];
    let urls = "";
    let isImage = true;

    if (selectedFiles.length > 0) {
      selectedFiles.forEach((file) => {
        const fileExtension = file.name.split(".").pop();
        const allowedExtensions = ["jpg", "jpeg", "png", "gif"];

        if (allowedExtensions.includes(fileExtension.toLowerCase())) {
          imageFiles = file;
          urls=URL.createObjectURL(file);
        } else {
          isImage = false;
          toast.warning("Please only upload image");
        }
      });
      if (isImage) {
        setFiles(imageFiles);
        setPreviewUrls(urls);
      }
    } 
  };

  const handleUpload = async () => {
    try {
      const folderRef = ref(storage, "image");
      console.log(files);
      if (files !== "") {
        const timestamp = Date.now();
        const fileName = `${timestamp}_${files.name}`;
        const fileRef = ref(folderRef, fileName);
        await uploadBytes(fileRef, files);
        const downloadURL = await getDownloadURL(fileRef);
        console.log("Download URL:", downloadURL);
        onImageUpload(downloadURL);
        toast.success("Upload successful!");
      }else {
        toast.warning("Please choose image to upload");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.warning("Upload failed!");
    }
  };

  return (
    <div>
      <div>
        <input
          type="file"
          className="form-control"
          multiple
          onChange={handleFileChange}
          accept="image/jpeg, image/png, image/jpg"
        />
        <div>
          {previewUrls && <img
            key={previewUrls}
            src={previewUrls}
            alt="Preview"
            style={{
              width: "auto",
              height: "150px",
              margin: "5px",
            }}
          />}
        </div>
        <button
          type="button"
          className="btn btn-outline-dark mt-3 mb-3"
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default ProductImageUpload;
