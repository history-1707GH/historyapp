const calculations = {};

calculations.degTorad = (deg)=> {
  return deg * (Math.PI / 180)
}

calculations.getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371 * 1000 // Radius of the earth in m
  const dLat = calculations.degTorad(lat2 - lat1)
  const dLon = calculations.degTorad(lon2 - lon1)
  const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(calculations.degTorad(lat1)) * Math.cos(calculations.degTorad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c // Distance in m
  return d
}



// this returns the relative direction of the POI - for example, if user is facing south
// but the attraction is due north, then this will return 180

calculations.getDirection = (lat1, lon1, lat2, lon2) => {
    
    let alpha = Math.atan2(lat2 - lat1, lon2 - lon1); // alpha in radian
    if (alpha < 0){
        alpha += (2 * (Math.PI))
    }
    alpha =  alpha * (180 / Math.PI);
    return alpha;
}
//this converts the direction alpha into a number between -180 and 180
// such that an object at 0 is directly in front of the user, 90 to the right, etc.
calculations.convertToOrientation = (userDirection, alphaDirection) => {
  let relDiff;
  const absDiff = Math.max((alphaDirection - userDirection), (userDirection - alphaDirection));
  switch (true) {
    case (userDirection > alphaDirection) && (absDiff > 180):
      relDiff = 360 - absDiff;
    break;
    case (userDirection > alphaDirection) && (absDiff < 180):
      relDiff = -(absDiff % 360);
    break;
    case (alphaDirection > userDirection) && (absDiff > 180):
      relDiff = absDiff - 360;
    break;
    case (alphaDirection > userDirection) && (absDiff < 180):
      relDiff = absDiff % 360;
    break;
    default:
      relDiff = absDiff;
    }
  return relDiff;
};

calculations.getRelativePos = (poi, heading, coords) => {
    return {
        poi,
        distance: calculations.getDistanceInMeters(poi, coords),
        dir: calculations.convertToOrientation(heading, calculations.getDirection(poi, coords))
    };
}

export default calculations;