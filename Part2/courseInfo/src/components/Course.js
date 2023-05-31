const Part = ({ course }) => {
  return (
    <>
      <ul style={{ padding: 0 }}>
        {course.parts.map((course) => (
          <li key={course.id} style={{ listStyle: "none", padding: "10px 0" }}>
            {course.name} {course.exercises}
          </li>
        ))}
      </ul>
      <h4 style={{ margin: 0 }}>
        total of{" "}
        {course.parts
          .map((course) => course.exercises)
          .reduce((acc, currentVal) => acc + currentVal, 0)}{" "}
        exercises
      </h4>
    </>
  );
};

const Content = ({ course }) => {
  return (
    <>
      <Part course={course} />
    </>
  );
};

const Header = ({ course }) => (
  <>
    <h3>{course.name}</h3>
  </>
);

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
    </>
  );
};

export default Course;
