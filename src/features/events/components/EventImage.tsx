import { useEffect, useState } from "react";
import Image, { ImageProps } from "next/image";

const EventImage: React.FC<ImageProps> = ({ src, alt, ...props }) => {
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  return (
    <Image
      alt={alt}
      src={error ? "/assets/images/events/fallbackImage.webp" : src}
      onError={() => setError(true)}
      {...props}
    />
  );
};

export default EventImage;
