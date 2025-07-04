export interface JwtPayloadMain {
  jti: string;
  sub: string;
  UserId: string;
  EmployeeCode: string;
  EmployeeName: string;
  CompanyId: string;
  BranchId: string;
  DepartmentId: string;
  PositionId: string;
  UserGroupId: string;
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
}
