'use strict';

export default function() {
  const options = {
    maximumAge: 1800000,
    enableHighAccuracy: true,
  };
  return new Promise((resolve, reject) => {
    window.onload = function() {
      let geoSuccess = function(position) {
        resolve(position.coords);
      };
      let geoError = function() {
        reject(
          'Нет прав доступа к геопозиции, используйте поиск по имени города.',
        );
      };

      navigator.geolocation.getCurrentPosition(geoSuccess, geoError, options);
    };
  });
}
