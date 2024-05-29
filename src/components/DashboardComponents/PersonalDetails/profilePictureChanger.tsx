import React, { useEffect, useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";


type Props = {
  newImage: File | string;
  setNewProfileImage: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
};


const ProfilePictureChanger = (props: Props) => {
  const cropperRef = useRef<ReactCropperElement>(null);

  const [result, setResult] = useState("");
  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      setResult(cropper.getCroppedCanvas().toDataURL());
      props.setNewProfileImage(cropper.getCroppedCanvas().toDataURL());
    }
  };


  return (
    <div className="flex gap-5 w-full">
      <div className="cropper-wrapper  w-1/2">
        <Cropper
          src={props.newImage as string}
          style={{ height: 350, width: "100%" }}
          // Cropper.js options
          initialAspectRatio={4 / 3}
          guides={false}
          crop={onCrop}
          ref={cropperRef}
        />
      </div>
      <div className="result-img-wrapper w-1/2">
        <img src={result} alt="" />
      </div>
    </div>
  );
};

export default ProfilePictureChanger;
