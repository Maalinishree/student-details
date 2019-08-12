import { getStudentDetails } from "../dataFile";

export const studentRecords = studentValue => {
    return { type: "STUDENT_DETAILS", studentData: studentValue };
  };
  export const studentActionFunction = () => studentDetailsDispatch => {
    return getStudentDetails().then(response => {
      studentDetailsDispatch(studentRecords(response.data));
    });
  };