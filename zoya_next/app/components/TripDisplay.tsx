import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Hotel {
  hotelName: string;
  hotelAddress: string;
  hotelImageUrl: string;
  price: string;
  rating: string;
  description: string;
  accessibilityFeatures: string[];
}

interface Activity {
  time: string;
  placeName: string;
  placeDetails: string;
  ticketPricing: string;
  timeToTravel: string;
  accessibilityNotes: string;
}

interface DayItinerary {
  day: string;
  plan: Activity[];
}

interface TripData {
  hotels: Hotel[];
  itinerary: DayItinerary[];
}

interface TripDisplayProps {
  tripData: TripData;
}

const TripDisplay: React.FC<TripDisplayProps> = ({ tripData }) => {
  if (!tripData) {
    return <div className="text-center text-lg font-semibold">No trip data available.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-8">
      <h1 className="text-4xl font-bold text-teal-600 mb-8 text-center">Your Trip Itinerary</h1>
      
      <Tabs defaultValue="hotels" className="w-full">
        <TabsList className="grid grid-cols-2 gap-2 mb-6 rounded-lg overflow-hidden bg-gray-100 p-1">
          <TabsTrigger value="hotels" className="bg-white text-teal-600 hover:bg-teal-100 focus:bg-teal-200 transition-colors">Hotels</TabsTrigger>
          <TabsTrigger value="itinerary" className="bg-white text-teal-600 hover:bg-teal-100 focus:bg-teal-200 transition-colors">Itinerary</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hotels">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {tripData.hotels && tripData.hotels.length > 0 ? (
              tripData.hotels.map((hotel, index) => (
                <Card key={index} className="shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-lg overflow-hidden">
                  <CardHeader className="p-4 bg-teal-50">
                    <CardTitle className="text-xl font-semibold text-teal-700">{hotel.hotelName}</CardTitle>
                    <CardDescription className="text-gray-600">{hotel.hotelAddress}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <img
                      src={hotel.hotelImageUrl}
                      alt={hotel.hotelName}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <p className="text-gray-800"><strong>Price:</strong> {hotel.price}</p>
                    <p className="text-gray-800"><strong>Rating:</strong> {hotel.rating}</p>
                    <p className="text-gray-800"><strong>Description:</strong> {hotel.description}</p>
                    <p className="text-gray-800"><strong>Accessibility Features:</strong> {hotel.accessibilityFeatures.join(', ')}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center text-gray-500">No hotel data available.</div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="itinerary">
          {tripData.itinerary && tripData.itinerary.length > 0 ? (
            tripData.itinerary.map((day, dayIndex) => (
              <Card key={dayIndex} className="mb-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg">
                <CardHeader className="p-4 bg-teal-50">
                  <CardTitle className="text-2xl font-semibold text-teal-700">{day.day}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {day.plan.map((activity, activityIndex) => (
                    <div key={activityIndex} className="mb-4 p-4 bg-teal-50 rounded-lg shadow-sm">
                      <h3 className="text-xl font-semibold text-teal-600">{activity.time} - {activity.placeName}</h3>
                      <p className="text-gray-700"><strong>Details:</strong> {activity.placeDetails}</p>
                      <p className="text-gray-700"><strong>Ticket Price:</strong> {activity.ticketPricing}</p>
                      <p className="text-gray-700"><strong>Time to Travel:</strong> {activity.timeToTravel}</p>
                      <p className="text-gray-700"><strong>Accessibility Notes:</strong> {activity.accessibilityNotes}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center text-gray-500">No itinerary data available.</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TripDisplay;

