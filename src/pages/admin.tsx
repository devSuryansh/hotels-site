import { useState } from "react";

export default function Admin() {
  const [formData, setFormData] = useState({
    slug: "",
    name: "",
    location: "",
    rating: "",
    price: "",
    description: "",
    images: "",
    amenities: "",
    phone: "",
    email: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/api/hotels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        images: formData.images.split(","),
        amenities: formData.amenities.split(","),
      }),
    });
    if (response.ok) alert("Hotel added!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Hotel Name"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="slug"
        placeholder="Slug"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="rating"
        placeholder="Rating"
        step="0.1"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        required
      ></textarea>
      <input
        type="text"
        name="images"
        placeholder="Images (comma separated)"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="amenities"
        placeholder="Amenities (comma separated)"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <button type="submit">Add Hotel</button>
    </form>
  );
}
