'use client';

import { useState, useEffect } from 'react';
import { doc, onSnapshot, DocumentData, Timestamp } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import type { Property } from '@/types/property';

// The return type of the hook
interface UsePropertyReturn {
  property: Property | null;
  loading: boolean;
  error: string | null;
}

export function useProperty(propertyId: string): UsePropertyReturn {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!propertyId) {
      setError("No property ID provided.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const propertyDocRef = doc(firestore, 'properties', propertyId);

    const unsubscribe = onSnapshot(
      propertyDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as DocumentData;
          
          const dateAdded = data.dateAdded instanceof Timestamp 
            ? data.dateAdded.toDate().toISOString() 
            : typeof data.dateAdded === 'string' ? data.dateAdded : new Date().toISOString();
            
          const dateSold = data.dateSold instanceof Timestamp
            ? data.dateSold.toDate().toISOString()
            : typeof data.dateSold === 'string' ? data.dateSold : undefined;

          // Map the Firestore data to our Property type for consistency
          const fetchedProperty: Property = {
            id: docSnap.id,
            title: data.title || 'Untitled Property',
            address: data.address || 'No Address Provided',
            locality: data.locality || '',
            city: data.city || '',
            status: data.status || 'Draft',
            listingFor: data.listingFor || 'Sale',
            propertyType: data.propertyType || 'Other',
            price: data.price || 'N/A',
            beds: data.bedrooms || 0,
            baths: data.bathrooms || 0,
            sqft: data.areaSqft || 0,
            furnishingStatus: data.furnishingStatus,
            imageUrl: data.imageUrl || 'https://placehold.co/600x400.png',
            aiHint: data.aiHint || 'property exterior',
            hasVrTour: data.hasVrTour || false,
            vrTourUrl: data.vrTourUrl,
            views: data.views || 0,
            leadsGenerated: data.leadsGenerated || 0,
            dateAdded: dateAdded,
            description: data.description,
            ownerId: data.ownerId,
            imageUrls: data.imageUrls || [],
            dateSold: dateSold,
          };
          setProperty(fetchedProperty);
        } else {
          setError("Property not found.");
          setProperty(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching property:", err);
        setError("Permission denied or error fetching data.");
        setLoading(false);
      }
    );

    // Cleanup function to unsubscribe from the listener when the component unmounts
    // or when propertyId changes.
    return () => unsubscribe();
  }, [propertyId]);

  return { property, loading, error };
}
