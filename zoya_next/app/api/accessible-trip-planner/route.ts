// import { createOpenAI } from "@ai-sdk/openai";
// import { generateObject } from "ai";
// import { NextRequest, NextResponse } from "next/server";
// import z from "zod";

// const apiKey = process.env.OPENAI_API_KEY;

// if (!apiKey) {
//   throw Error("OPENAI_API_KEY is undefined");
// }

// const openai = createOpenAI({
//   apiKey,
// });

// // Define the schema for the trip plan
// const tripSchema = z.object({
//   hotels: z.array(
//     z.object({
//       hotelName: z.string(),
//       hotelAddress: z.string(),
//       price: z.string(),
//       hotelImageUrl: z.string(),
//       geoCoordinates: z.string(),
//       rating: z.string(),
//       description: z.string(),
//       accessibilityFeatures: z.array(z.string()),
//     })
//   ),
//   itinerary: z.array(
//     z.object({
//       day: z.string(),
//       plan: z.array(
//         z.object({
//           time: z.string(),
//           placeName: z.string(),
//           placeDetails: z.string(),
//           placeImageUrl: z.string(),
//           geoCoordinates: z.string(),
//           ticketPricing: z.string(),
//           timeToTravel: z.string(),
//           accessibilityNotes: z.string(),
//         })
//       ),
//     })
//   ),
// });

// export async function POST(req: NextRequest) {
//   try {
//     console.log("Received request");
//     // Extract the trip details from the request body
//     const body = await req.json();
//     console.log("Request body:", body);

//     // Validate input data
//     const parsedData = z.object({
//       destination: z.string().min(1),
//       days: z.number().int().positive(),
//       budget: z.string().min(1),
//       wheelchair: z.boolean(),
//       hearingImpaired: z.boolean(),
//       visuallyImpaired: z.boolean(),
//     }).parse(body);
//     console.log("Parsed data:", parsedData);

//     // Generate trip data using OpenAI
//     console.log("Generating trip data...");
//     const { object: tripData } = await generateObject({
//       model: openai("gpt-4"),  // Changed from "gpt-4o-mini" to "gpt-4"
//       schema: tripSchema,
//       prompt: tripPrompt(parsedData),
//     });
//     console.log("Generated trip data:", tripData);

//     return NextResponse.json({
//       success: true,
//       trip: tripData,
//     });
//   } catch (error) {
//     console.error("Error generating trip plan:", error);
//     return NextResponse.json(
//       {
//         message: "Error generating trip plan",
//         error: JSON.stringify(error, Object.getOwnPropertyNames(error))
//       },
//       { status: 400 }
//     );
//   }
// }

// // Prompt for generating the travel plan
// const tripPrompt = (
//   { destination, days, budget, wheelchair, hearingImpaired, visuallyImpaired }:
//   { destination: string; days: number; budget: string; wheelchair: boolean; hearingImpaired: boolean; visuallyImpaired: boolean }
// ) => {
//   let accessibilityRequirements = [];
//   if (wheelchair) accessibilityRequirements.push("wheelchair accessibility");
//   if (hearingImpaired) accessibilityRequirements.push("facilities for hearing impaired");
//   if (visuallyImpaired) accessibilityRequirements.push("facilities for visually impaired");

//   const accessibilityString = accessibilityRequirements.length > 0
//     ? `The trip should accommodate the following accessibility needs: ${accessibilityRequirements.join(", ")}.`
//     : "";

//   return `
//     Generate a Travel Plan for Location: ${destination}, for ${days} Days with a ${budget} budget. ${accessibilityString}
//     Provide a list of hotel options with Hotel Name, Address, Price, Image URL, Geo Coordinates, Rating, Description, and Accessibility Features.

//     Suggest an itinerary with Place Name, Place Details, Image URL, Geo Coordinates, Ticket Pricing, Time to Visit, and Accessibility Notes for each day, including times (e.g., 10 AM to 5 PM) in JSON format.
//     Ensure all suggested locations and activities are suitable for the specified accessibility needs.
//   `;
// };
// // import { NextRequest, NextResponse } from 'next/server';
// // import { createGoogleGenerativeAI } from '@ai-sdk/google';
// // import { z } from 'zod'; // Ensure you have zod imported for schema validation

// // // Set up Google API key
// // const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY; // Use your Google API key

// // if (!apiKey) {
// //   throw Error("GOOGLE_GENERATIVE_AI_API_KEY is undefined");
// // }

// // // Create Google Generative AI instance
// // const googleAI = createGoogleGenerativeAI({
// //   apiKey,
// // });

// // // Define the schema for the trip plan
// // const tripSchema = z.object({
// //   hotels: z.array(
// //     z.object({
// //       hotelName: z.string(),
// //       hotelAddress: z.string(),
// //       price: z.string(),
// //       hotelImageUrl: z.string(),
// //       geoCoordinates: z.string(),
// //       rating: z.string(),
// //       description: z.string(),
// //       accessibilityFeatures: z.array(z.string()),
// //     })
// //   ),
// //   itinerary: z.array(
// //     z.object({
// //       day: z.string(),
// //       plan: z.array(
// //         z.object({
// //           time: z.string(),
// //           placeName: z.string(),
// //           placeDetails: z.string(),
// //           placeImageUrl: z.string(),
// //           geoCoordinates: z.string(),
// //           ticketPricing: z.string(),
// //           timeToTravel: z.string(),
// //           accessibilityNotes: z.string(),
// //         })
// //       ),
// //     })
// //   ),
// // });

// // export async function POST(req: NextRequest) {
// //   try {
// //     console.log("Received request");

// //     // Extract the trip details from the request body
// //     const body = await req.json();
// //     console.log("Request body:", body);

// //     // Validate input data
// //     const parsedData = z.object({
// //       destination: z.string().min(1),
// //       days: z.number().int().positive(),
// //       budget: z.string().min(1),
// //       wheelchair: z.boolean(),
// //       hearingImpaired: z.boolean(),
// //       visuallyImpaired: z.boolean(),
// //     }).parse(body);
// //     console.log("Parsed data:", parsedData);

// //     // Generate trip data using Google Generative AI
// //     console.log("Generating trip data...");

// //     // Construct the prompt
// //     const prompt = tripPrompt(parsedData);

// //     // Make the API call to Google Generative AI to generate the response
// //     const response = googleAI.chat({
// //       messages: [{ role: "user", content: prompt }],
// //     });

// //     // Ensure the response contains the generated text in the expected format
// //     const tripData = JSON.parse(response.text);
// //     console.log("Generated trip data:", tripData);

// //     return NextResponse.json({
// //       success: true,
// //       trip: tripData,
// //     });
// //   } catch (error) {
// //     console.error("Error generating trip plan:", error);
// //     return NextResponse.json(
// //       {
// //         message: "Error generating trip plan",
// //         error: JSON.stringify(error, Object.getOwnPropertyNames(error))
// //       },
// //       { status: 400 }
// //     );
// //   }
// // }

// // // Prompt for generating the travel plan
// // const tripPrompt = (
// //   { destination, days, budget, wheelchair, hearingImpaired, visuallyImpaired }:
// //   { destination: string; days: number; budget: string; wheelchair: boolean; hearingImpaired: boolean; visuallyImpaired: boolean }
// // ) => {
// //   let accessibilityRequirements = [];
// //   if (wheelchair) accessibilityRequirements.push("wheelchair accessibility");
// //   if (hearingImpaired) accessibilityRequirements.push("facilities for hearing impaired");
// //   if (visuallyImpaired) accessibilityRequirements.push("facilities for visually impaired");

// //   const accessibilityString = accessibilityRequirements.length > 0
// //     ? `The trip should accommodate the following accessibility needs: ${accessibilityRequirements.join(", ")}.`
// //     : "";

// //   return `
// //     Generate a Travel Plan for Location: ${destination}, for ${days} Days with a ${budget} budget. ${accessibilityString}
// //     Provide a list of hotel options with Hotel Name, Address, Price, Image URL, Geo Coordinates, Rating, Description, and Accessibility Features.

// //     Suggest an itinerary with Place Name, Place Details, Image URL, Geo Coordinates, Ticket Pricing, Time to Visit, and Accessibility Notes for each day, including times (e.g., 10 AM to 5 PM) in JSON format.
// //     Ensure all suggested locations and activities are suitable for the specified accessibility needs.
// //   `;
// // };

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
  throw Error("GOOGLE_GENERATIVE_AI_API_KEY is undefined");
}

const googleAI = createGoogleGenerativeAI({
  apiKey,
});

// Define the schema for the trip plan
const tripSchema = z.object({
  hotels: z.array(
    z.object({
      hotelName: z.string(),
      hotelAddress: z.string(),
      price: z.string(),
      hotelImageUrl: z.string(),
      geoCoordinates: z.string(),
      rating: z.string(),
      description: z.string(),
      accessibilityFeatures: z.array(z.string()),
    })
  ),
  itinerary: z.array(
    z.object({
      day: z.string(),
      plan: z.array(
        z.object({
          time: z.string(),
          placeName: z.string(),
          placeDetails: z.string(),
          placeImageUrl: z.string(),
          geoCoordinates: z.string(),
          ticketPricing: z.string(),
          timeToTravel: z.string(),
          accessibilityNotes: z.string(),
        })
      ),
    })
  ),
});

export async function POST(req: NextRequest) {
  try {
    console.log("Received request");
    // Extract the trip details from the request body
    const body = await req.json();
    console.log("Request body:", body);

    // Validate input data
    const parsedData = z
      .object({
        destination: z.string().min(1),
        days: z.number().int().positive(),
        budget: z.string().min(1),
        wheelchair: z.boolean(),
        hearingImpaired: z.boolean(),
        visuallyImpaired: z.boolean(),
      })
      .parse(body);
    console.log("Parsed data:", parsedData);

    // Generate trip data using Google Generative AI (Gemini)
    console.log("Generating trip data...");
    const { object: tripData } = await generateObject({
      model: googleAI("gemini"), // Changed to use the Google Gemini model
      schema: tripSchema,
      prompt: tripPrompt(parsedData),
    });
    console.log("Generated trip data:", tripData);

    return NextResponse.json({
      success: true,
      trip: tripData,
    });
  } catch (error) {
    console.error("Error generating trip plan:", error);
    return NextResponse.json(
      {
        message: "Error generating trip plan",
        error: JSON.stringify(error, Object.getOwnPropertyNames(error)),
      },
      { status: 400 }
    );
  }
}

// Prompt for generating the travel plan
const tripPrompt = ({
  destination,
  days,
  budget,
  wheelchair,
  hearingImpaired,
  visuallyImpaired,
}: {
  destination: string;
  days: number;
  budget: string;
  wheelchair: boolean;
  hearingImpaired: boolean;
  visuallyImpaired: boolean;
}) => {
  let accessibilityRequirements = [];
  if (wheelchair) accessibilityRequirements.push("wheelchair accessibility");
  if (hearingImpaired)
    accessibilityRequirements.push("facilities for hearing impaired");
  if (visuallyImpaired)
    accessibilityRequirements.push("facilities for visually impaired");

  const accessibilityString =
    accessibilityRequirements.length > 0
      ? `The trip should accommodate the following accessibility needs: ${accessibilityRequirements.join(
          ", "
        )}.`
      : "";

  return `
    Generate a Travel Plan for Location: ${destination}, for ${days} Days with a ${budget} budget. ${accessibilityString}
    Provide a list of hotel options with Hotel Name, Address, Price, Image URL, Geo Coordinates, Rating, Description, and Accessibility Features.
    
    Suggest an itinerary with Place Name, Place Details, Image URL, Geo Coordinates, Ticket Pricing, Time to Visit, and Accessibility Notes for each day, including times (e.g., 10 AM to 5 PM) in JSON format.
    Ensure all suggested locations and activities are suitable for the specified accessibility needs.
  `;
};
