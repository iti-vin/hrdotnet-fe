import { LookUpResponse } from "@shared/assets/types/Global";

export interface EmployeeWorkProfiles {
  id: number;
  code: string;
  guid: string;
  personalInformation: PersonalInformation;
  contact: Contact;
  workInformation: WorkInformation;
}

interface PersonalInformation {
  name: Name;
  birthDate: string;
  birthPlace: string;
  emailAddress: string;
  photo: string;
}

interface Name {
  lastName: string;
  firstName: string;
  middleName: string;
  suffix: string;
  formalName: string;
  normalName: string;
}

interface Contact {
  telephoneNo: string;
  contactNo: string;
  mobileNo: string;
  homePhoneNo: string;
  provincialPhoneNo: string;
}

interface WorkInformation {
  accessNo: string;
  dateRegularize: string;
  dateStart: string;
  dateEnd: string;
  notRequiredToLog: true;
  company: LookUpResponse & { email: string };
  branch: LookUpResponse;
  section: LookUpResponse;
  department: LookUpResponse;
  division: LookUpResponse;
  position: LookUpResponse;
  designation: LookUpResponse;
  employmentStatus: LookUpResponse;
  payrollGroup: LookUpResponse;
  union: LookUpResponse;
  timeOption: LookUpResponse & { minutes: number };
}
