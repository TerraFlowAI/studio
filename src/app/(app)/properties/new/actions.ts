
'use server';

import { z } from 'zod';
import { auth } from '@/lib/firebase-admin'; // Use Admin SDK on the server
import { firestore } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';


const propertySchema = z.object({
  propertyType: z.string().min(1),
  listingFor: z.enum(["Sale", "Rent"]),
  addressBuilding: z.string().min(1),
  addressStreet: z.string().min(1),
  addressLocality: z.string().min(1),
  addressCity: z.string().min(1),
  bedrooms: z.number().min(0),
  bathrooms: z.number().min(0),
  areaSqft: z.number().min(1),
  furnishingStatus: z.enum(["Unfurnished", "Semi-Furnished", "Fully Furnished"]),
  expectedPrice: z.number().min(1),
  keyHighlights: z.string().min(1),
  aiGeneratedHeadline: z.string(),
  aiGeneratedDescription: z.string(),
  imageUrls: z.array(z.string().url()).optional(),
  vrTourUrl: z.string().url().optional().or(z.literal('')),
});

export async function saveNewProperty(
  values: z.infer<typeof propertySchema>,
  status: 'Active' | 'Draft'
) {
  const headersList = headers();
  const idToken = headersList.get('Authorization')?.split('Bearer ')[1];
  
  if (!idToken) {
    throw new Error('Authentication token is missing. User must be logged in.');
  }

  let decodedToken;
  try {
      decodedToken = await auth.verifyIdToken(idToken);
  } catch (error) {
      console.error("Error verifying ID token:", error);
      throw new Error('Authentication token is invalid.');
  }

  const ownerId = decodedToken.uid;
  
  const validatedData = propertySchema.safeParse(values);
  
  if (!validatedData.success) {
    console.error("Validation failed", validatedData.error.flatten().fieldErrors);
    throw new Error('Invalid form data submitted.');
  }

  const {
    aiGeneratedHeadline,
    aiGeneratedDescription,
    addressLocality,
    addressBuilding,
    addressStreet,
    addressCity,
    expectedPrice,
    ...restOfData
  } = validatedData.data;

  try {
    const propertiesCollection = firestore.collection('properties');
    await propertiesCollection.add({
      ownerId: ownerId,
      status: status,
      title: aiGeneratedHeadline || `${restOfData.propertyType} in ${addressLocality}`,
      description: aiGeneratedDescription,
      address: `${addressBuilding}, ${addressStreet}`,
      locality: addressLocality,
      city: addressCity,
      price: `₹${expectedPrice.toLocaleString()}`,
      ...restOfData,
      // Default placeholder image if none are provided
      imageUrl: values.imageUrls?.[0] || 'https://placehold.co/600x400.png',
      aiHint: 'property exterior', // Default AI hint
      views: 0,
      leadsGenerated: 0,
      dateAdded: FieldValue.serverTimestamp(),
    });

    // Revalidate the properties page path to show the new data
    revalidatePath('/(app)/properties', 'page');
  } catch (error) {
    console.error('Error saving property to Firestore:', error);
    throw new Error('Could not save property to the database.');
  }
}
