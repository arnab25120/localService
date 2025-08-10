import { useNavigate } from "react-router-dom"; 
import useAuthStore from "../store/useAuthStore.js"; 
import CategoryList from "../components/CategoryList.jsx"; 
import { ArrowRightIcon, PlusCircleIcon } from "@heroicons/react/24/solid"; 
import image from "../assets/hzlimg01.jpg"

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleFindServices = () => navigate("/services");
  const handleCreateService = () => navigate("/services/create");

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-white via-blue-50/30 to-indigo-100/50 py-20 shadow-xl">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-green-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-purple-400/10 to-pink-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="md:w-1/2 text-center md:text-left animate-fadeInUp">
           

            <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 leading-tight mb-6">
              Discover Trusted
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Local Services
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mt-6 leading-relaxed max-w-lg">
              From electricians to painters — everything you need, 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold"> right at your doorstep</span>.
            </p>

            <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-4">
              <button
                onClick={handleFindServices}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                <ArrowRightIcon className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform duration-300" />
                <span className="relative z-10 font-semibold">Find Services</span>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
              
              {user?.role === "provider" && (
                <button
                  onClick={handleCreateService}
                  className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                  <PlusCircleIcon className="w-5 h-5 relative z-10 transform group-hover:rotate-90 transition-transform duration-300" />
                  <span className="relative z-10 font-semibold">Create Service</span>
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              )}
            </div>

            
          </div>

          {/* Right Image / Illustration */}
          <div className="md:w-1/2 animate-fadeInRight">
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl blur-lg opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full blur-lg opacity-40 animate-pulse delay-300"></div>
              
              {/* Main Image Container */}
              <div className="relative bg-gradient-to-br from-white to-gray-50 p-4 rounded-3xl shadow-2xl border border-white/50 backdrop-blur-sm">
                <img
                  src={image}
                  alt="Local Services"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-500"
                />
                
                
               
                
                
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <div className="relative py-20 bg-gradient-to-br from-gray-50 to-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(15 23 42) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-200/50 rounded-full text-sm font-medium text-indigo-700 mb-6">
              <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2 animate-pulse"></div>
              Popular Categories
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-indigo-900 mb-6">
              Explore Categories
            </h2>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse through our wide range of services and find exactly what you need for your home or business.
            </p>
          </div>

          {/* Enhanced CategoryList Container */}
          <div className="relative">
            {/* Decorative Elements */}
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-gradient-to-br from-green-400/20 to-blue-500/20 rounded-full blur-xl"></div>
            
            {/* Category List with enhanced styling */}
            <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
              <CategoryList />
            </div>
          </div>
        </div>
      </div>

      {/* FIXED: Changed jsx={true} to jsx="true" */}
      <style jsx="true">{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out 0.2s both;
        }
      `}</style>
    </div>
  );
};

export default Home;