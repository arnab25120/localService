import { useEffect, useState } from "react";
import { getPendingServices, approveService, rejectService } from "../../services/serviceApi.js";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const res = await getPendingServices();
      setServices(res.data?.data?.services || []);
    } catch (err) {
      toast.error("Failed to load pending services");
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (id, approve = true) => {
    try {
      if (approve) {
        await approveService(id);
        toast.success("Service approved successfully");
      } else {
        await rejectService(id);
        toast.success("Service rejected");
      }
      fetchServices(); // refresh list
    } catch (err) {
      toast.error("Failed to update service status");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Manage pending service approvals</p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading pending services...</p>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl text-gray-400 mb-4">📋</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Pending Services</h2>
            <p className="text-gray-600">All services have been reviewed</p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {services.length} service{services.length !== 1 ? 's' : ''} pending approval
              </div>
            </div>

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200"
                >
                  {/* Service Image */}
                  <div className="relative">
                    <img
                      src={service?.imageUrl}
                      alt={service.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        ⏳ Pending
                      </div>
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {service.title}
                    </h2>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {service.description}
                    </p>

                    {/* Service Info Grid */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 font-medium">Category:</span>
                        <span className="font-semibold text-gray-900">{service.category}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 font-medium">Location:</span>
                        <span className="font-semibold text-gray-900">{service.location}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 font-medium">Price:</span>
                        <span className="font-semibold text-green-600">₹{service.price}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 font-medium">Created:</span>
                        <span className="font-medium text-gray-700">
                          {new Date(service.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Provider Contact Information */}
                    {service.providerContact && (
                      <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Provider Details
                        </h4>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Name:</span>
                            <span className="font-medium text-gray-900">{service.providerContact.name}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Email:</span>
                            <span className="font-medium text-blue-600 text-xs">{service.providerContact.email}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Contact:</span>
                            <span className="font-medium text-gray-900">{service.providerContact.contactNumber}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Provider Info (from User model) */}
                    {service.provider && (
                      <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Account Info
                        </h4>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">User:</span>
                            <span className="font-medium text-gray-900">{service.provider.name}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Email:</span>
                            <span className="font-medium text-gray-700 text-xs">{service.provider.email}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleApproval(service._id, false)}
                        className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:from-red-600 hover:to-red-700 hover:shadow-lg transform hover:scale-[1.02]"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Reject
                        </span>
                      </button>
                      
                      <button
                        onClick={() => handleApproval(service._id, true)}
                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:from-green-600 hover:to-green-700 hover:shadow-lg transform hover:scale-[1.02]"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Approve
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;