import { useState, useEffect } from 'react';

const useCurrentLocation = async () => {
  const [location, setLocation] = useState({});

  const handleSuccess = async (pos) => {
    if (pos != null) {
      const latitude = pos.coords.latitude;
      const longitude = pos.coords.longitude;
      setLocation({
        latitude,
        longitude,
      });
    }
    // const latitude = pos.coords.latitude;
    // const longitude = pos.coords.longitude;

    // setLocation({
    //   latitude,
    //   longitude,
    // });
  };

  const handleError = () => {
    alert('Error!');
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported.');
      return;
    }

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return location;
};

export default useCurrentLocation;
