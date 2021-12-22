import { School } from "./school.js";

export class Student extends School {
  constructor(firstname, lastname, datecreated, studentid, email) {
    super(licence, model, latLong, "Student");
    this.studentid = studentid;
    this.email = email;
  }
}