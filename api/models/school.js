const db = require('../config/database');

class School {
  static async addSchool(schoolData) {
    const { name, address, latitude, longitude } = schoolData;
    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    const [result] = await db.execute(query, [name, address, latitude, longitude]);
    return result.insertId;
  }

  static async listSchools(userLat, userLng) {
    // Using Haversine formula to calculate distance
    const query = `
      SELECT 
        id,
        name,
        address,
        latitude,
        longitude,
        (
          6371 * acos(
            cos(radians(?)) * 
            cos(radians(latitude)) * 
            cos(radians(longitude) - radians(?)) + 
            sin(radians(?)) * 
            sin(radians(latitude))
          )
        ) AS distance
      FROM schools
      HAVING distance IS NOT NULL
      ORDER BY distance
    `;
    
    const [schools] = await db.execute(query, [userLat, userLng, userLat]);
    return schools;
  }
}

module.exports = School; 