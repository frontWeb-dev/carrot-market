import React, { useEffect, useState } from 'react';

interface UseCoordsState {
  latitude: number | null;
  longitude: number | null;
}
const useCoords = () => {
  const [coords, setCoords] = useState<UseCoordsState>({ latitude: null, longitude: null });

  const onSuccess = ({ coords: { latitude, longitude } }: GeolocationPosition) => {
    setCoords({ latitude, longitude });
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);

  return coords;
};

export default useCoords;
