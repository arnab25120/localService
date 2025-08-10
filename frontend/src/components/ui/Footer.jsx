import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">About LocalService</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            LocalService helps you find trusted local professionals like electricians, plumbers, and tutors in your area. Simplify your life by booking verified services online.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/services" className="hover:text-white">Browse Services</Link></li>
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
            <li><Link to="/register" className="hover:text-white">Register</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Contact Us</h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>Email: support@localservice.com</li>
            <li>Phone: +91-9876543210</li>
            <li>Location: Kolkata, India</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} LocalService. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
