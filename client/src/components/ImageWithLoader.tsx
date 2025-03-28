import { useEffect, useState } from "react";
interface ImageWithLoaderProps {
  src: string;
  alt: string;
  classStyle: string;
}

const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({
  src,
  alt,
  classStyle,
}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
  }, [src]);

  return (
    <div className={classStyle}>
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoading(false)}
        style={{
          display: loading ? "none" : "block",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default ImageWithLoader;
