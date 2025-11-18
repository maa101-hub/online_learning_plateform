CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    teacher_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) DEFAULT 0,
    duration VARCHAR(100),
    stream VARCHAR(100),
    thumbnail_url TEXT,
    public_id TEXT,
    created_on TIMESTAMP DEFAULT NOW(),
    nums_of_students INTEGER DEFAULT 0,
    offer NUMERIC(5, 2) DEFAULT 0,
    is_public BOOLEAN DEFAULT FALSE
);


ALTER TABLE courses
ADD CONSTRAINT fk_teacher
FOREIGN KEY (teacher_id) REFERENCES teachers(id);
