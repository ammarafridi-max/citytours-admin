const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;
const CLOUDINARY_PRESET = process.env.REACT_APP_CLOUDINARY_TOUR_PRESET;

export async function fetchAllTours() {
  const res = await fetch(`${BASE_URL}/tours`);
  if (!res.ok) throw new Error("Tours could not be fetched");
  return res.json();
}

export async function fetchTour(url) {
  const res = await fetch(`${BASE_URL}/tours/${url}`);
  if (!res.ok) throw new Error("Tour not found");
  return res.json();
}

export async function createTour(tourData) {
  const res = await fetch(`${BASE_URL}/tours/create`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tourData),
  });
  if (!res.ok) throw new Error("Could not add tour");
  return res.json();
}

export async function updateTour(url, tourData) {
  const res = await fetch(`${BASE_URL}/tours/update/${url}`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tourData),
  });
  if (!res.ok) throw new Error("Tour could not be updated");
  return res.json();
}

export async function deleteTour(url) {
  const res = await fetch(`${BASE_URL}/tours/delete/${url}`, {
    method: "delete",
  });
  if (!res.ok) throw new Error("Tour could not be deleted");
  return res.json();
}

export async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_PRESET);

  const response = await fetch(CLOUDINARY_URL, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Image upload failed");
  }
  const data = await response.json();
  return data.secure_url;
}
