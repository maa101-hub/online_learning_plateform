

CREATE TABLE Chapters (
    chapter_id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    course_id INTEGER REFERENCES Courses(course_id) ON DELETE CASCADE
);
