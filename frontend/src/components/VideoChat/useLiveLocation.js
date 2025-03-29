import { LayoutTemplate } from "lucide-react";
import { useState, useEffect } from "react";

const useLiveLocation = () => {
  const [location, setLocation] = useState(null);

  const [error, setError] = useState(null);
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => setError(err.message),

      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return { location, error };
};

export default useLiveLocation;
