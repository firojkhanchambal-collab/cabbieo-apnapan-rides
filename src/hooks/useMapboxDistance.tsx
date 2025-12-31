import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface DistanceResult {
  distance: number; // in km
  duration: number; // in minutes
  status: 'idle' | 'loading' | 'success' | 'error';
}

interface GeocodeResult {
  center: [number, number];
  place_name: string;
}

export const useMapboxDistance = (accessToken: string) => {
  const [result, setResult] = useState<DistanceResult>({
    distance: 0,
    duration: 0,
    status: 'idle',
  });
  const [suggestions, setSuggestions] = useState<{ pickup: GeocodeResult[]; drop: GeocodeResult[] }>({
    pickup: [],
    drop: [],
  });

  // Geocode an address to coordinates
  const geocodeAddress = useCallback(async (address: string): Promise<GeocodeResult | null> => {
    if (!accessToken || !address || address.length < 3) return null;

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${accessToken}&country=IN&limit=1`
      );
      
      if (!response.ok) throw new Error('Geocoding failed');
      
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        return {
          center: data.features[0].center,
          place_name: data.features[0].place_name,
        };
      }
      return null;
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  }, [accessToken]);

  // Get address suggestions for autocomplete
  const getAddressSuggestions = useCallback(async (
    query: string, 
    type: 'pickup' | 'drop'
  ): Promise<void> => {
    if (!accessToken || !query || query.length < 3) {
      setSuggestions(prev => ({ ...prev, [type]: [] }));
      return;
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${accessToken}&country=IN&limit=5&types=address,place,locality,neighborhood`
      );
      
      if (!response.ok) throw new Error('Geocoding failed');
      
      const data = await response.json();
      
      if (data.features) {
        const results: GeocodeResult[] = data.features.map((feature: any) => ({
          center: feature.center,
          place_name: feature.place_name,
        }));
        setSuggestions(prev => ({ ...prev, [type]: results }));
      }
    } catch (error) {
      console.error('Suggestions error:', error);
      setSuggestions(prev => ({ ...prev, [type]: [] }));
    }
  }, [accessToken]);

  // Calculate distance between two addresses
  const calculateDistance = useCallback(async (
    pickupAddress: string,
    dropAddress: string
  ): Promise<{ distance: number; duration: number } | null> => {
    if (!accessToken) {
      toast.error('Mapbox access token not configured');
      return null;
    }

    if (!pickupAddress || !dropAddress) {
      return null;
    }

    setResult(prev => ({ ...prev, status: 'loading' }));

    try {
      // Geocode both addresses
      const [pickupResult, dropResult] = await Promise.all([
        geocodeAddress(pickupAddress),
        geocodeAddress(dropAddress),
      ]);

      if (!pickupResult || !dropResult) {
        setResult(prev => ({ ...prev, status: 'error' }));
        toast.error('Could not find one or both locations');
        return null;
      }

      // Get driving directions
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupResult.center[0]},${pickupResult.center[1]};${dropResult.center[0]},${dropResult.center[1]}?access_token=${accessToken}&overview=false`
      );

      if (!response.ok) throw new Error('Directions API failed');

      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const distanceKm = parseFloat((route.distance / 1000).toFixed(1)); // Convert meters to km
        const durationMins = Math.ceil(route.duration / 60); // Convert seconds to minutes

        setResult({
          distance: distanceKm,
          duration: durationMins,
          status: 'success',
        });

        return { distance: distanceKm, duration: durationMins };
      }

      setResult(prev => ({ ...prev, status: 'error' }));
      toast.error('Could not calculate route');
      return null;
    } catch (error) {
      console.error('Distance calculation error:', error);
      setResult(prev => ({ ...prev, status: 'error' }));
      toast.error('Error calculating distance. Please enter manually.');
      return null;
    }
  }, [accessToken, geocodeAddress]);

  const clearSuggestions = useCallback((type: 'pickup' | 'drop') => {
    setSuggestions(prev => ({ ...prev, [type]: [] }));
  }, []);

  return {
    result,
    suggestions,
    calculateDistance,
    getAddressSuggestions,
    clearSuggestions,
    geocodeAddress,
  };
};
