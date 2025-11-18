CREATE TABLE Topics (
    topic_id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    type TEXT,
    public_id TEXT,
    url TEXT,
    chapter_id INTEGER REFERENCES Chapters(chapter_id) ON DELETE CASCADE
);