export async function askCurrentLocation() {
    if ('geolocation' in navigator) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            resolve(userLocation);
          },
          (err) => {
            alert(err.message);
            reject(err);
          }
        );
      });
    } else {
      alert('Geolocation not supported');
      return null;
    }
  }
  