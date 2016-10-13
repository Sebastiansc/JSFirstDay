function Student(first, last) {
  this.first = first;
  this.last = last;
  this.courses = [];

}

Student.prototype.name = function() {
  return `${this.first} ${this.last}`;
}

// Student.prototype.courses = function() {
//
// }

Student.prototype.enroll = function(course) {
  if (!this.hasConflict(course)) {
    this.courses.push(course);
    course.students.push(this)
  }
}

Student.prototype.courseLoad = function() {
  let load = {};
  this.courses.forEach(function(course){
    load[course.department] = load[course.department] || 0;
    load[course.department] += course.credits;
    }
  )
  return load;
}

Student.prototype.hasConflict = function(course){
  for (idx = 0; idx < this.courses.length; idx++) {
    if (this.courses[idx].conflictsWith(course)){
      return true
    }
  }
  return false
}

function Course(name, department, credits, days, timeBlock) {
  this.department = department;
  this.name = name;
  this.credits = credits;
  this.students = [];
  this.days = days
  this.timeBlock = timeBlock
}

Course.prototype.addStudent = function (student){

  student.enroll(this)
}

Course.prototype.conflictsWith = function(course){
  if (this.timeBlock !== course.timeBlock) return false;
  console.log(`that.days: ${course.days}`)
  let collision = false
  this.days.forEach(function(day){
    console.log(day)
    if (course.days.indexOf(day) >= 0) collision =  true;
  })
  return collision
}

jay = new Student("jay", "hewit")
math = new Course("math", "science", 15, [0,1,2], 3)
chemistry = new Course("chemistry", "science", 15, [0,5,6], 3)
basketWeaving = new Course("basketWeaving", "sport", 50, [0,4,5], 2)
math.addStudent(jay)
chemistry.addStudent(jay)
basketWeaving.addStudent(jay)
console.log(jay.courseLoad())
console.log(math.conflictsWith(chemistry))
console.log(math.conflictsWith(basketWeaving))
console.log(jay.courses)
console.log(math.students)
