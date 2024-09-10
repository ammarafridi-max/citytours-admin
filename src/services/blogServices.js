const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;
const CLOUDINARY_PRESET = process.env.REACT_APP_CLOUDINARY_BLOG_PRESET;

export function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_PRESET);

  return fetch(CLOUDINARY_URL, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.secure_url) {
        throw new Error(data.error.message || "Upload failed");
      }
      console.log("File uploaded to Cloudinary:", data);
      return data.secure_url;
    })
    .catch((error) => {
      alert("Error uploading image to Cloudinary: " + error);
      console.error("Error uploading file to Cloudinary:", error);
      throw error;
    });
}
