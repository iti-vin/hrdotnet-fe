import { LookUpResponse } from "@shared/assets/types/Global";

export interface EmployeeInformation {
  id: number;
  code: string;
  guid: string;
  personalInformation: PersonalInformation;
  address: Address;
  identification: Identification;
  contact: Contact;
}

interface PersonalInformation {
  nationality: LookUpResponse;
  citizenship: LookUpResponse;
  bloodType: LookUpResponse;
  civilStatus: LookUpResponse;
  religion: LookUpResponse;
  gender: LookUpResponse;
  weight: number;
  height: number;
  familyInformation: FamilyInfo;
  name: Name;
  birthDate: string;
  birthPlace: string;
  emailAddress: string;
  photo: string;
}

interface FamilyInfo {
  spouseName: string;
  spouseBirthDate: string;
  spouseOccupation: string;
  spouseEmployer: string;
  fatherName: string;
  fatherBirthDate: string;
  fatherOccupation: string;
  motherName: string;
  motherBirthDate: string;
  motherOccupation: string;
}

interface Name {
  lastName: string;
  firstName: string;
  middleName: string;
  suffix: string;
  formalName: string;
  normalName: string;
}

interface Address {
  home: string;
  homeZipCode: string;
  provincial: string;
  provincialZipCode: string;
}

interface Identification {
  sssNo: string;
  hdmfNo: string;
  phicNo: string;
  tinNo: string;
  driversLicenseNo: string;
  gsisNo: string;
  passportNo: string;
}

interface Contact {
  telephoneNo: string;
  contactNo: string;
  mobileNo: string;
  homePhoneNo: string;
  provincialPhoneNo: string;
}
