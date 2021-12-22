import { Student } from "../classes/student.js";
import { DataError } from "./data-error.js";

export class FleetDataService {
  constructor() {
    this.students = [];
    this.errors = [];
  }

  loadData(fleet) {
    for (let data of fleet) {
      switch (data.type) {
        case "Student":
          if (this.validateStudentData(data)) {
            let student = this.loadStudent(data);
            if (student) this.students.push(student);
          } else {
            let e = new DataError("Invalid data type", data);
            this.errors.push(e);
          }
          break;
        default:
          let e = new DataError("Invalid data type", data);
          this.errors.push(e);
          break;
      }
    }
  }

  loadStudent(data) {
    try {
      let student = new Student(data.firstname, data.lastname, data.datecreated);
      student.studentid = data.studentid;
      student.email = data.email;
      return student;
    } catch (e) {
      this.errors.push(new DataError("error loading student", data));
    }
    return null;
  }

  validateStudentData(data) {
    let requiredProps = "firstname lastname studentid datecreated email".split(" ");
    let hasErrors = false;
    for (let field of requiredProps) {
      if (!data[field]) {
        this.errors.push(new DataError(`Invalid field ${field}`, data));
        hasErrors = true;
      }
    }
    if (this.stringNullOrEmpty(data.firstname)) {
      this.errors.push(new DataError(`Invalid First Name`, data));
      hasErrors = true;
    }
    if (this.stringNullOrEmpty(data.lastname)) {
      this.errors.push(new DataError(`Invalid Last Name`, data));
      hasErrors = true;
    }
    return !hasErrors;
  }

  stringNullOrEmpty(str) {
    return (
      typeof str == "undefined" ||
      !str ||
      str.length === 0 ||
      str === "" ||
      !/[^\s]/.test(str) ||
      /^\s*$/.test(str) ||
      str.replace(/\s/g, "") === ""
    );
  }

  getStudentByFirstname(firstname) {
    return this.students.find((student) => student.firstname === firstname);
  }

  getStudentsSortedByFirstname() {
    return this.students.sort((a, b) => {
      if (a.firstname < b.firstname) return -1;
      if (a.firstname > b.firstname) return 1;
      else 0;
    });
  }

  filterStudentsByStudentID(filter) {
    return this.students.filter((student) => student.studentid.indexOf(filter) >= 0);
  }
}