import API_BASE_URL from "./config";

const BASE_API_URL = `${API_BASE_URL}/department`;

export const fetchDepartments = async () => {
  const response = await fetch(`${BASE_API_URL}`);
  const departmentList = await response.json();
  return departmentList;
};

export const fetchDepartmentById = async (id) => {
  console.log(`Fetching department with ID ${id}`);
  const response = await fetch(`${BASE_API_URL}/${id}`);

  if (!response.ok) {
    console.error(`Error fetching department ${id}. Response:`, response);
    throw new Error(`Failed to fetch department with id ${id}`);
  }

  const department = await response.json();
  return department;
};

export const addDepartment = async (department) => {
  const response = await fetch(`${BASE_API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(department)
  })

  if(!response.ok) {
    console.error("Error adding department. Response:", response)
    throw new Error("Failed to add department")
  }

  const addedDep = await response.json()
  return addedDep
}