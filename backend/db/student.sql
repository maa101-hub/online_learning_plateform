CREATE TABLE student (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    registered_at TIMESTAMP DEFAULT NOW(),
    phone VARCHAR(15),
    date_of_birth DATE,
    gender VARCHAR(10) CHECK (gender IN ('Male', 'Female', 'Other')),
    profile_url TEXT,  -- can store URL or path
    public_id TEXT
);
