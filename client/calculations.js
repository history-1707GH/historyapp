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



// calculating angle between two points


calculations.getAngle = (lat1, lon1, lat2, lon2) => {
    
    let alpha = Math.atan2(lat2 - lat1, lon2 - lon1); // alpha in radian
    if (alpha < 0){
        alpha = alpha + 2*(Math.PI)
    }
    alpha =  alpha * (180 / Math.PI); //alpha in degree
    return alpha;
}





export default calculations;