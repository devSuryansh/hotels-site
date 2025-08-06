import ImageKit from "imagekit";

// Validate environment variables
const validateConfig = () => {
  const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

  if (!publicKey || !privateKey || !urlEndpoint) {
    console.warn(
      "ImageKit configuration incomplete. Please check your environment variables."
    );
  }

  return { publicKey, privateKey, urlEndpoint };
};

const config = validateConfig();

// Server-side ImageKit instance
export const imagekit = new ImageKit({
  publicKey: config.publicKey || "",
  privateKey: config.privateKey || "",
  urlEndpoint: config.urlEndpoint || "",
});

// Client-side configuration
export const imagekitConfig = {
  publicKey: config.publicKey || "",
  urlEndpoint: config.urlEndpoint || "",
};
