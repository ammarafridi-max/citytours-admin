const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export async function fetchAllDestinations() {
  const res = await fetch(`${BACKEND_URL}/destinations`);
  if (!res.ok) return alert("Could not fetch destionations");
  return res.json();
}

export async function fetchDestination(url) {
  const res = await fetch(`${BACKEND_URL}/destinations/${url}`);
  if (!res.ok) return alert("Could not fetch destination");
  return res.json();
}

export async function deleteDestination(url) {
  const res = await fetch(`${BACKEND_URL}/destinations/delete/${url}`, {
    method: "delete",
  });
  if (!res.ok) return alert("Could not delete destination");
  return res.json();
}

export async function getDestinationOptions() {
  const res = await fetch(`${BACKEND_URL}/destinations/options`);
  if (!res.ok) return alert("Could not find options");
  return res.json();
}

export function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.REACT_APP_CLOUDINARY_DESTINATION_PRESET
  );

  return fetch(
    `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  )
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
