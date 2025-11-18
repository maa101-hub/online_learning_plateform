-- teacher table
CREATE TABLE teacher (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  mobile VARCHAR(15),
  password TEXT NOT NULL,                 -- store hashed password only
  image_url TEXT,
  dob DATE,
  yoe INTEGER CHECK (yoe >= 0),           -- years of experience
  created_at TIMESTAMP DEFAULT now(),
  
);


-- course table
CREATE TABLE course (
  id SERIAL PRIMARY KEY,
  teacher_id INTEGER REFERENCES teacher(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  image_url TEXT,
  description TEXT,
  price DECIMAL(10, 2) DEFAULT 0.00,      -- supports free and paid
  duration VARCHAR(50),                   -- e.g., "6 weeks", "10 hours"
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);


-- chapter table
CREATE TABLE chapter (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES course(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  seq_no INTEGER NOT NULL,                -- for ordering
  image_url TEXT,
  description TEXT,
  is_free BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT now()
);


-- topic

CREATE TABLE topic (
  id SERIAL PRIMARY KEY,
  chapter_id INTEGER REFERENCES chapter(id) ON DELETE CASCADE,
  seq_no INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL, 
  type VARCHAR(20) CHECK (type IN ('file', 'video', 'other')),
  image_url TEXT,
  description TEXT,
  content_url TEXT,                       -- Cloudinary link
  is_preview BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT now()
);
