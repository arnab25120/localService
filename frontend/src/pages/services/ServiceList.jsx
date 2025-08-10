import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllServices } from "../../services/serviceApi.js";
import ServiceCard from "../../components/ServiceCard.jsx";
import { toast } from "react-toastify";

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");
  const search = searchParams.get("search");

  const fetchServices = async () => {
    try {
      const params = {};
      if (category) params.category = category;
      if (search) params.search = search;

      const res = await getAllServices(params);
      setServices(res.data?.data?.services || []);
    } catch (error) {
      console.error("Error fetching services", error);
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [category, search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            {category ? `${category} Services` : "All Services"}
          </h1>
          {search && (
            <p className="text-gray-600">
              Search results for: <span className="font-semibold">"{search}"</span>
            </p>
          )}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading services...</p>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl text-gray-400 mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Services Found</h2>
            <p className="text-gray-600">
              {category || search 
                ? "Try adjusting your search criteria" 
                : "No services are available at the moment"
              }
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {services.length} service{services.length !== 1 ? 's' : ''} found
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {services.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ServiceList;