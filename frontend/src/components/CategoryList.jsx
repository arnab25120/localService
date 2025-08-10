import { useNavigate } from "react-router-dom";

// Updated categories to match backend
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

const CategoryList = () => {
  const navigate = useNavigate();

  return (
    <section className="py-10 px-6 bg-gray-200">
      <h2 className="text-2xl font-bold text-center mb-6">
        Browse by Categories
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() =>
              navigate(`/services?category=${encodeURIComponent(cat)}`)
            }
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm hover:bg-blue-200 transition"
          >
            {cat}
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryList;