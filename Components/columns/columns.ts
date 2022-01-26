export const memberCols = [
  { Header: "Staff ID", Footer: "Staff ID", accessor: "staff_id" },
  { Header: "First Name", Footer: "First Name", accessor: "f_name" },
  { Header: "Surname", Footer: "Surname", accessor: "surname" },
  { Header: "Other Name", Footer: "Other Name", accessor: "other_name" },
  { Header: "Date of Birth", Footer: "Date of Birth", accessor: "dob" },
  { Header: "Gender", Footer: "Gender", accessor: "gender" },
  { Header: "Phone 1", Footer: "Phone 1", accessor: "phone_1" },
  { Header: "Phone 2", Footer: "Phone 2", accessor: "phone_2" },
  { Header: "Email", Footer: "Email", accessor: "email" },
];

export const groupedMemberCols = [
  { Header: "Staff ID", Footer: "Staff ID", accessor: "staff_id" },
  {
    Header: "Name",
    Footer: "Name",
    columns: [
      { Header: "First Name", Footer: "First Name", accessor: "f_name" },
      { Header: "Surname", Footer: "Surname", accessor: "surname" },
      { Header: "Other Name", Footer: "Other Name", accessor: "other_name" },
    ],
  },
  {
    Header: "Info",
    Footer: "Info",
    columns: [
      { Header: "Date of Birth", Footer: "Date of Birth", accessor: "dob" },
      { Header: "Gender", Footer: "Gender", accessor: "gender" },
      { Header: "Phone 1", Footer: "Phone 1", accessor: "phone_1" },
      { Header: "Phone 2", Footer: "Phone 2", accessor: "phone_2" },
      { Header: "Email", Footer: "Email", accessor: "email" },
    ],
  },
];
