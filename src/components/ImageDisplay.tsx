import React, { FC } from 'react';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';

export type Images = {
  alt: string;
  url: string;
};

type Props = {
  images: Images[];
};

const ImageWindows: FC<Props> = ({ images }) => {
  return (
    <ImageList rowHeight={200} cols={3}>
      {images.map((item: Images, i: number) => (
        <ImageListItem key={item.url} cols={i % 4 === 0 ? 3 : 1}>
          <img src={item.url} alt={item.alt} />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImageWindows;
