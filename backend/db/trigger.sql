CREATE OR REPLACE FUNCTION increment_enrolled_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE courses
  SET nums_of_students = nums_of_students + 1
  WHERE course_id = NEW.course_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_increment_enrolled_count
AFTER INSERT ON enrolledcourse
FOR EACH ROW
EXECUTE FUNCTION increment_enrolled_count();
