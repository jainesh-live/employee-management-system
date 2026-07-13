const BASE_API_URL = 'http://localhost:8080/department';

export const fetchDepartments = async () => {
  const response = await fetch(`${BASE_API_URL}`);
  const departmentList = await response.json();
  console.log('Fetched department list:', departmentList);
  return departmentList;
};