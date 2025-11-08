
// MOBILE MENU TOGGLE
const menuButton = document.getElementById('menuButton');
const navMenu = document.getElementById('navMenu');

menuButton.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});


// FOOTER INFO

document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent =
  'Last Modified: ' + document.lastModified;


// COURSE DATA

const courses = [
  { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
  { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
  { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true },
  { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: true },
  { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true },
  { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, completed: false }
];


// DISPLAY COURSES

const courseContainer = document.getElementById('courseContainer');
const totalCreditsElement = document.getElementById('totalCredits');

function displayCourses(list) {
  courseContainer.innerHTML = ''; 

  list.forEach(course => {
    const courseDiv = document.createElement('div');
    courseDiv.classList.add('course');
    if (course.completed) courseDiv.classList.add('completed');

    courseDiv.innerHTML = `
      <h3>${course.subject} ${course.number}</h3>
      <p>${course.title}</p>
      <p>${course.credits} credits</p>
    `;
    courseContainer.appendChild(courseDiv);
  });

  // Update total credits
  const total = list.reduce((sum, course) => sum + course.credits, 0);
  totalCreditsElement.textContent = total;
}


// FILTER BUTTONS

document.getElementById('all').addEventListener('click', () => displayCourses(courses));

document.getElementById('wdd').addEventListener('click', () => {
  const wddCourses = courses.filter(course => course.subject === 'WDD');
  displayCourses(wddCourses);
});

document.getElementById('cse').addEventListener('click', () => {
  const cseCourses = courses.filter(course => course.subject === 'CSE');
  displayCourses(cseCourses);
});


// INITIAL DISPLAY

displayCourses(courses);



