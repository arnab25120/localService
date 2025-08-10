import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createServicesSchema } from "../../schemas/createServicesSchema.js";
import { getServiceById, updateService } from "../../services/serviceApi.js";
import { toast } from "react-toastify";
import { CheckCircle, XCircle } from "lucide-react";

const categories = [
  "Plumber",
  "Electrician",
  "Mechanic", 
  "Tutor",
  "Babysitter",
  "Cleaning",
  "Carpenter",
  "Other"
];

const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createServicesSchema.omit({ image: true }).extend({
      image: createServicesSchema.shape.image.optional()
    })),
  });

  const selectedImage = watch("image");

  // Fetch existing service data to populate the form
  const fetchService = async () => {
    try {
      const res = await getServiceById(id);
      const service = res.data?.data?.service || res.data?.data;
      
      reset({
        title: service.title,
        description: service.description,
        category: service.category,
        location: service.location,
        price: service.price,
        providerName: service.providerContact?.name || "",
        providerEmail: service.providerContact?.email || "",
        providerContact: service.providerContact?.contactNumber || "",
      });
    } catch (err) {
      toast.error("Failed to load service details");
      navigate("/provider/dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchService();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValue("image", file, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("location", data.location);
      formData.append("price", data.price);
      formData.append("providerName", data.providerName);
      formData.append("providerEmail", data.providerEmail);
      formData.append("providerContact", data.providerContact);
      
      if (data.image) {
        formData.append("serviceImage", data.image);
      }

      await updateService(id, formData);
      toast.success("Service updated successfully");
      navigate("/provider/dashboard");
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to update service";
      toast.error(msg);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading service details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Edit Service
          </h2>
          <p className="text-gray-600">Update your service information</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Service Information Section */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Service Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Service Title *</label>
                <input
                  type="text"
                  {...register("title")}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <XCircle className="w-4 h-4" />
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Category *</label>
                <select
                  {...register("category")}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <XCircle className="w-4 h-4" />
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block font-semibold text-gray-700 mb-2">Description *</label>
              <textarea
                {...register("description")}
                rows="4"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <XCircle className="w-4 h-4" />
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Price (₹) *</label>
                <input
                  type="number"
                  {...register("price", { valueAsNumber: true })}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <XCircle className="w-4 h-4" />
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Location *</label>
                <input
                  type="text"
                  {...register("location")}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <XCircle className="w-4 h-4" />
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Provider Contact Information Section */}
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Update Contact Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Your Name *</label>
                <input
                  type="text"
                  {...register("providerName")}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                {errors.providerName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <XCircle className="w-4 h-4" />
                    {errors.providerName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  {...register("providerEmail")}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                {errors.providerEmail && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <XCircle className="w-4 h-4" />
                    {errors.providerEmail.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block font-semibold text-gray-700 mb-2">Contact Number *</label>
              <input
                type="tel"
                {...register("providerContact")}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              {errors.providerContact && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <XCircle className="w-4 h-4" />
                  {errors.providerContact.message}
                </p>
              )}
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Update Service Image
            </h3>
            
            <div>
              <label htmlFor="image" className="block font-semibold text-gray-700 mb-2">
                Upload New Image (Optional)
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer hover:file:bg-blue-700"
                onChange={handleImageChange}
              />
              {selectedImage && !errors.image && (
                <div className="flex items-center gap-2 mt-2 text-green-600 bg-green-50 p-2 rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm">{selectedImage.name}</span>
                </div>
              )}

              {errors.image && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <XCircle className="w-4 h-4" />
                  {errors.image.message}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate("/provider/dashboard")}
              className="flex-1 bg-gray-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-gray-600 transition-colors duration-300"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02]"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </span>
              ) : (
                "Update Service"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditService;