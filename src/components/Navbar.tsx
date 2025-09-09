

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-blue-600 text-2xl font-bold">
                ✱ HealthLinkDMS
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">About</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Services</a>
            </nav>
            
            {/* Auth Buttons */}
            <div className="flex space-x-3">
              <button className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium">
                Login
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>
  )
}

export default Navbar