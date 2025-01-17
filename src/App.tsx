import React from 'react';
import { Building2, Search, Gavel, Clock, MapPin, DollarSign, ArrowRight, Filter, Home, List, HelpCircle, Info, Phone, UserPlus } from 'lucide-react';

function App() {
  const featuredProperties = [
    {
      id: 1,
      title: "Luxury Villa in Beverly Hills",
      location: "Beverly Hills, CA",
      basePrice: "2,500,000",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
      endDate: "2024-04-15"
    },
    {
      id: 2,
      title: "Downtown Commercial Complex",
      location: "Manhattan, NY",
      basePrice: "5,800,000",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      endDate: "2024-04-20"
    },
    {
      id: 3,
      title: "Waterfront Residence",
      location: "Miami Beach, FL",
      basePrice: "1,900,000",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      endDate: "2024-04-18"
    }
  ];

  const properties = [
    {
      id: "1708905",
      institution: "Canara Bank",
      type: "Land",
      city: "Mangalore",
      auctionDate: "31-01-2025",
      reservePrice: "540000"
    },
    // Add more properties...
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modified Header/Nav */}
      <header className="bg-gradient-to-r from-[#0466C8] to-[#0353A4] text-white">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Gavel className="h-8 w-8" />
            <span className="text-xl font-bold">myfind.ai</span>
          </div>
          <div className="flex items-center space-x-6">
            <button className="flex items-center hover:text-blue-200">
              <Home className="h-4 w-4 mr-1" /> Home
            </button>
            <button className="flex items-center hover:text-blue-200">
              <List className="h-4 w-4 mr-1" /> Property List
            </button>
            <button className="flex items-center hover:text-blue-200">
              <HelpCircle className="h-4 w-4 mr-1" /> FAQs
            </button>
            <button className="flex items-center hover:text-blue-200">
              <Info className="h-4 w-4 mr-1" /> About Us
            </button>
            <button className="flex items-center hover:text-blue-200">
              <Phone className="h-4 w-4 mr-1" /> Contact Us
            </button>
            <button className="bg-[#023E7D] hover:bg-[#002855] px-4 py-2 rounded-lg flex items-center">
              <UserPlus className="h-4 w-4 mr-1" /> Sign In/Sign Up
            </button>
          </div>
        </nav>
        
        <div className="container mx-auto px-6 py-20">
          <h1 className="text-5xl font-bold mb-6">
            Find Your Dream Property at Bank Auction Prices
          </h1>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl">
            Discover exclusive real estate opportunities at competitive prices through our transparent auction platform.
          </p>
          
          <div className="bg-white rounded-lg p-4 shadow-lg max-w-4xl flex items-center">
            <div className="flex-1 flex items-center">
              <Search className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search by location, property type, or price range..."
                className="w-full outline-none text-gray-700"
              />
            </div>
            <button className="bg-[#023E7D] hover:bg-[#002855] text-white px-6 py-2 rounded-lg">
              Search
            </button>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-3 gap-8">
          <div className="text-center">
            <p className="text-4xl font-bold text-[#0466C8] mb-2">500+</p>
            <p className="text-gray-600">Active Listings</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-[#0466C8] mb-2">₹2.5B+</p>
            <p className="text-gray-600">Property Value</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-[#0466C8] mb-2">10k+</p>
            <p className="text-gray-600">Successful Auctions</p>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{property.title}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  {property.location}
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Ends {new Date(property.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Base Price</p>
                    <p className="text-xl font-bold text-blue-900">
                      <span className="text-sm">$</span>{property.basePrice}
                    </p>
                  </div>
                  <button className="bg-[#023E7D] hover:bg-[#002855] text-white px-4 py-2 rounded-lg flex items-center">
                    View Details
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New Property Listings Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Property Listings</h2>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <Filter className="h-5 w-5 text-gray-400 mr-2" />
                <select className="border rounded-lg px-3 py-2">
                  <option>All Cities</option>
                  <option>Mangalore</option>
                  <option>Mumbai</option>
                  {/* Add more cities */}
                </select>
              </div>
              <div className="flex items-center">
                <select className="border rounded-lg px-3 py-2">
                  <option>All Property Types</option>
                  <option>Land</option>
                  <option>Commercial</option>
                  <option>Residential</option>
                </select>
              </div>
            </div>
          </div>

          {/* Property Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-[#979DAC]">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Listing ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Institution</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Property Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">City</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Auction Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Reserve Price</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#7D8597]">
                {properties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{property.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{property.institution}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{property.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{property.city}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{property.auctionDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">₹{property.reservePrice}</td>
                    <td className="px-6 py-4 text-sm">
                      <button className="text-[#0466C8] hover:text-[#0353A4]">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-600">Showing 1-10 of 100 properties</p>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border rounded hover:bg-gray-100">Previous</button>
              <button className="px-3 py-1 border rounded bg-[#023E7D] text-white hover:bg-[#002855]">1</button>
              <button className="px-3 py-1 border rounded hover:bg-gray-100">2</button>
              <button className="px-3 py-1 border rounded hover:bg-gray-100">3</button>
              <button className="px-3 py-1 border rounded hover:bg-gray-100">Next</button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#979DAC] py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#7D8597] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-[#0466C8]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Browse Properties</h3>
              <p className="text-gray-600">
                Explore our extensive collection of bank-owned properties
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#7D8597] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-[#0466C8]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Place Your Bid</h3>
              <p className="text-gray-600">
                Submit competitive bids on your desired properties
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#7D8597] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-[#0466C8]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Win & Close</h3>
              <p className="text-gray-600">
                Complete the purchase process with our expert support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#001233] text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Gavel className="h-6 w-6" />
                <span className="text-lg font-bold">BankAuctions</span>
              </div>
              <p className="text-[#979DAC]">
                Your trusted platform for bank-owned property auctions
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Properties</a></li>
                <li><a href="#" className="hover:text-white">How It Works</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#" className="hover:text-white">FAQs</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Newsletter</h4>
              <p className="text-blue-200 mb-4">
                Subscribe to get updates on new properties
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-l-lg w-full text-gray-900"
                />
                <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
            <p>&copy; 2024 BankAuctions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;