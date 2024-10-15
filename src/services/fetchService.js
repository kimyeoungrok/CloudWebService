// src/services/fetchService.js
const fetch = require('node-fetch');
const csv = require('csv-parser');
const haversine = require('haversine-distance');
const stream = require('stream');

// 두 좌표 간 거리를 계산하는 함수
const calculateDistance = (loc1, loc2) => {
    const point1 = { lat: loc1.lat, lon: loc1.lon };
    const point2 = { lat: loc2.lat, lon: loc2.lon };
    return haversine(point1, point2); // 미터 단위 거리 반환
};

// S3에서 CSV 파일을 가져와 서울 중심과 가장 가까운 충전소를 찾는 함수
const findNearestStation = async (fileUrl, myLocation) => {
    const response = await fetch(fileUrl);
    
    if (!response.ok) {
        throw new Error('Failed to fetch file from URL');
    }

    const dataStream = stream.Readable.from(response.body);
    let nearestStation = null;
    let minDistance = Infinity;

    return new Promise((resolve, reject) => {
        dataStream
            .pipe(csv())
            .on('data', (row) => {
                const [latitude, longitude] = row['위도경도'].split(',').map(Number);
                const stationLocation = { lat: latitude, lon: longitude };

                const distance = calculateDistance(myLocation, stationLocation);

                if (distance < minDistance) {
                    minDistance = distance;
                    nearestStation = {
                        address: row['주소'],
                        latitude: latitude,
                        longitude: longitude,
                        distance: distance / 1000, // km 단위로 변환
                    };
                }
            })
            .on('end', () => resolve(nearestStation))
            .on('error', (error) => reject(error));
    });
};

module.exports = {
    findNearestStation,
};
