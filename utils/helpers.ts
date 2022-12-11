interface CalculateDistance {
  currentLocation: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
}

export const calculateDistance = ({
  currentLocation,
  destination,
}: CalculateDistance) => {
  const EARTH_RADIUS = 6371;

  const getRadians = (degrees: number) => (degrees * Math.PI) / 180;
  const applyHaversineFormula = () => {
    let value = Math.cos(lat1);
    value = value * Math.cos(lat2);
    value = value * Math.pow(Math.sin((long2 - long1) / 2), 2);
    value = value + Math.pow(Math.sin((lat2 - lat1) / 2), 2);
    return 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
  };

  const lat1 = getRadians(currentLocation.latitude);
  const long1 = getRadians(currentLocation.longitude);

  const lat2 = getRadians(destination.latitude);
  const long2 = getRadians(destination.longitude);

  return applyHaversineFormula() * EARTH_RADIUS;
};
