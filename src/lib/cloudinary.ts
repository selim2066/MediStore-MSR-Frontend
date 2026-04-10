// What: A dedicated function that handles talking to Cloudinary's API.
// Why:  Keeps upload logic out of the form component — single responsibility.
//       If you ever change storage providers, you only change this file.
// How:  Cloudinary's unsigned upload endpoint accepts a FormData POST with
//       the file + your cloud name + preset name. It returns a JSON object
//       containing `secure_url` — a permanent HTTPS CDN URL we store in DB.

export async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!

  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", uploadPreset)
  // Optional: organise uploads into a folder
  formData.append("folder", "medistore/medicines")

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  )

  if (!res.ok) {
    throw new Error("Image upload failed. Please try again.")
  }

  const data = await res.json()
  // secure_url looks like:
  // "https://res.cloudinary.com/your_cloud/image/upload/v123/medistore/medicines/abc.jpg"
  return data.secure_url as string
}