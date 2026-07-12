const BASE_API_URL = 'http://localhost:8080/employee';

export const fetchEmployees = async () => {
  const response = await fetch(`${BASE_API_URL}`);
  const employees = await response.json();
  console.log('Fetched Employees:', employees);
  return employees;
};

export const fetchEmployeeById = async (id) => {
  const response = await fetch(`${BASE_API_URL}/${id}`);
  const employee = await response.json();
  console.log(`Fetched Employee with ID ${id}:`, employee);
  return employee;
}