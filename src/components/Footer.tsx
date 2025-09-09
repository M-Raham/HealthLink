import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-1">
              <h3 className="text-lg font-semibold mb-4">
                Streamlining hospital operations for better patient care.
              </h3>
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 hover:text-blue-200 cursor-pointer" />
                <Twitter className="w-5 h-5 hover:text-blue-200 cursor-pointer" />
                <Linkedin className="w-5 h-5 hover:text-blue-200 cursor-pointer" />
                <Youtube className="w-5 h-5 hover:text-blue-200 cursor-pointer" />
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-200">About Us</a></li>
                <li><a href="#" className="hover:text-blue-200">Careers</a></li>
                <li><a href="#" className="hover:text-blue-200">Blog</a></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-200">Contact Us</a></li>
                <li><a href="#" className="hover:text-blue-200">FAQ</a></li>
                <li><a href="#" className="hover:text-blue-200">Help Center</a></li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-200">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-200">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer