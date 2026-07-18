import API_BASE_URL from "./config";

const BASE_API_URL = `${API_BASE_URL}/employee`;

export const fetchEmployees = async () => {
  const response = await fetch(`${BASE_API_URL}`);

  if(!response.ok) {
    console.error("Error getting employeeList. Response:", response)
    throw new Error("Failed to create employee")
  }

  const employees = await response.json();
  return employees;
};

export const fetchEmployeeById = async (id) => {
  const response = await fetch(`${BASE_API_URL}/${id}`);
  const employee = await response.json();
  return employee;
}

export const addEmployee = async (employee) => {
  const response = await fetch(`${BASE_API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(employee)
  })

  if(!response.ok) {
    console.error("Error creating employee. Response:", response)
    throw new Error("Failed to create employee")
  }

  return response.json()
}

export const deleteEmployee = async (id) => {
  const response = await fetch(`${BASE_API_URL}/${id}`, {
    method: "DELETE"
  })

  if(!response.ok) {
    console.error("Error deleting employee. Response:", response)
    throw new Error("Failed to delete employee")
  }

  return response;
}