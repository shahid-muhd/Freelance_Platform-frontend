import React, { useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

const ProfilePictureChanger: React.FC = () => {
  const cropperRef = useRef<ReactCropperElement>(null);

  const [result, setResult] = useState('');
  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;

    cropper && setResult(cropper.getCroppedCanvas().toDataURL());
  };

  return (
    <div className="flex gap-5 w-full">
      <div className="cropper-wrapper  w-1/2">
        <Cropper
          src="https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg"
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
