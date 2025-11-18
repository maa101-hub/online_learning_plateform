// const pool = require('./db');

// const createTeacherTable = async () => {
//   const query = `
//     CREATE TABLE IF NOT EXISTS teacher (
//       id SERIAL PRIMARY KEY,
//       name VARCHAR(100),
//       email VARCHAR(100) UNIQUE NOT NULL,
//       mobile VARCHAR(15),
//       password TEXT NOT NULL,
//       image_url TEXT,
//       dob DATE,
//       yoe INTEGER CHECK (yoe >= 0),
//       created_at TIMESTAMP DEFAULT now()
//     );
//   `;

//   try {
//     await pool.query(query);
//     console.log("✅ Teacher table created successfully.");
//   } catch (err) {
//     console.error("❌ Error creating teacher table:", err);
//   } finally {
//     await pool.end();
//   }
// };

// createTeacherTable();


const pool = require('./db');

const createTables = async () => {
  const teacherQuery = `
    CREATE TABLE IF NOT EXISTS teacher (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE NOT NULL,
      phone VARCHAR(15),
      password TEXT,
      image_url TEXT,
      dob DATE,
      yoe INTEGER CHECK (yoe >= 0),
      description TEXT,
      created_at TIMESTAMP DEFAULT now()
    );
  `;

  const educationQuery = `
    CREATE TABLE IF NOT EXISTS teacher_education (
      id SERIAL PRIMARY KEY,
      teacher_id INTEGER REFERENCES teacher(id) ON DELETE CASCADE,
      degree VARCHAR(100),
      year VARCHAR(10),
      institute VARCHAR(150)
    );
  `;

  try {
    await pool.query(teacherQuery);
    await pool.query(educationQuery);
    console.log("✅ Tables 'teacher' and 'education' created successfully.");
  } catch (err) {
    console.error("❌ Error creating tables:", err);
  } finally {
    await pool.end();
  }
};

createTables();
