import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddStamp: React.FC = () => {
  const [form, setForm] = useState<StampForm>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    images: [],
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      
      // Validate file types and size
      const validFiles = files.filter(file => {
        if (!file.type.startsWith('image/')) {
          alert(`File ${file.name} is not an image`);
          return false;
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          alert(`File ${file.name} is too large (max 5MB)`);
          return false;
        }
        return true;
      });

      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...validFiles],
      }));

      // Create previews
      const newPreviews = validFiles.map(file => URL.createObjectURL(file));
      setPreviewImages(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (form.price <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }
    
    if (form.stock < 0) {
      toast.error("Stock cannot be negative");
      return;
    }
    
    if (form.images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price.toString());
      formData.append("stock", form.stock.toString());
      form.images.forEach((file) => formData.append("images", file));

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/addStamp`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      console.log(res)

      toast.success("Stamp added successfully!");
      setForm({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        images: [],
      });
      setPreviewImages([]);
    } catch (error: any) {
      console.log(error)
      toast.error(error.response?.data?.message || "Failed to add stamp");
    }
  }
  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add New Stamp</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Stamp Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="e.g. Rare Vintage Stamp"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe the stamp details..."
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price ($)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              value={form.price == 0 ? "" : form.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
              Stock Quantity
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              min="0"
              placeholder="0"
              value={form.stock == 0 ? "" : form.stock}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
          <input
            id="file-upload"
            name="images"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            multiple
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
        </div>

        {previewImages.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Preview Images</h3>
            <div className="flex flex-wrap gap-4">
              {previewImages.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="h-24 w-24 object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Submit Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStamp;