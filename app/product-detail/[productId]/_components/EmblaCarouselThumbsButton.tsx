import React from 'react';

type PropType = {
  selected: boolean;
  index: number;
  onClick: () => void;
  imageUrl: string; // Add an imageUrl prop to display the thumbnail
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, index, onClick, imageUrl } = props;

  return (
    <div
      className={`embla-thumbs__slide${selected ? ' embla-thumbs__slide--selected' : ''}`}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__button"
      >
        <img
          src={imageUrl}
          alt={`Thumbnail ${index + 1}`}
          className="embla-thumbs__image h-[90px] w-[90px] object-cover object-center"
        />
      </button>
    </div>
  );
};
