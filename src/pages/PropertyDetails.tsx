import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  Info,
  Bank,
  Home,
  Clock,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { useProperties } from '../hooks/useSupabase';
import { formatCurrency } from '../utils/format';

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const { properties: [property], loading, error } = useProperties({ id });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Property</h2>
          <p className="text-gray-600">{error || 'Property not found'}</p>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === (property.property_images?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? (property.property_images?.length || 1) - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Property Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{property.title}</h1>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Property ID:</span>
              <span className="font-semibold">{property.property_id}</span>
            </div>
          </div>
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{`${property.address}, ${property.city}, ${property.state}, ${property.postal_code}`}</span>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="relative h-[400px] mb-4">
            <img
              src={property.property_images?.[currentImageIndex]?.url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80'}
              alt={property.title}
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {property.property_images?.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative h-20 ${
                  currentImageIndex === index ? 'ring-2 ring-blue-600' : ''
                }`}
              >
                <img
                  src={image.url}
                  alt={`${property.title} - ${index + 1}`}
                  className="w-full h-full object-cover rounded"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Property Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Property Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Property Type</p>
                    <p className="font-medium">{property.property_type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Home className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Built Area</p>
                    <p className="font-medium">{property.built_area} sq.ft</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Info className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Possession Status</p>
                    <p className="font-medium">{property.possession_status}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Bank className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Seller Bank</p>
                    <p className="font-medium">{property.seller_bank}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-600 whitespace-pre-line">{property.description}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Documents</h2>
              <div className="space-y-3">
                {property.property_docs?.map((doc: any) => (
                  <a
                    key={doc.url}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <FileText className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="flex-1">{doc.name}</span>
                    <ExternalLink className="h-5 w-5 text-gray-400" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Auction Details */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Auction Details</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Reserve Price</span>
                  <span className="font-semibold">{formatCurrency(property.reserve_price || 0)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">EMD Amount</span>
                  <span className="font-semibold">{formatCurrency(property.earnest_money || 0)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Bid Increment</span>
                  <span className="font-semibold">{formatCurrency(property.auctions?.[0]?.bid_increment || 0)}</span>
                </div>
                <hr />
                <div>
                  <div className="flex items-center mb-2">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">Auction Timeline</span>
                  </div>
                  <div className="ml-7 space-y-2">
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p className="font-medium">
                        {new Date(property.auctions?.[0]?.start_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">End Date</p>
                      <p className="font-medium">
                        {new Date(property.auctions?.[0]?.end_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Place Bid
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Inspection Details</h2>
              <div className="space-y-3">
                {property.inspection_dates?.map((date) => (
                  <div key={date} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">
                        {new Date(date).toLocaleDateString(undefined, {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(date).toLocaleTimeString(undefined, {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}