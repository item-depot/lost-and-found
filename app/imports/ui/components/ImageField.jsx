/* import React from 'react';
import { HTMLFieldProps, connectField } from 'uniforms';

const ImageField = ({ onChange, value }) => (
  <div className="ImageField">
    <label htmlFor="file-input">
      <div>Choose your photo</div>
      <img
        alt=""
        style={{ cursor: 'pointer', width: '150px', height: '150px' }}
        src={value || 'https://picsum.photos/150?grayscale'}
      />
    </label>
    <input
      accept="image/*"
      id="file-input"
      onChange={({ target: { files } }) => {
        if (files && files[0]) {
          onChange(URL.createObjectURL(files[0]));
        }
      }}
      style={{ display: 'none' }}
      type="file"
    />
  </div>
);

export type ImageFieldProps = HTMLFieldProps<string, HTMLDivElement>; */


export default connectField<ImageFieldProps>(Image);