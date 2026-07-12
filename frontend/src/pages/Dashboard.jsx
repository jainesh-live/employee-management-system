import EmployeeCard from "../components/EmployeeCard";
import { fetchEmployees } from "../services/EmployeeService";
import { useState, useEffect } from "react";

function Dashboard() {
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    console.log("Dashboard mounted");
    const fetchEmployeeList = async () => {
      try {
        const employeeList = await fetchEmployees();
        setEmployeeList(employeeList);
      } catch (error) {
        console.error("Error fetching employee list:", error);
      } finally {
      }
    };

    fetchEmployeeList();
  }, []);

  return (
    <>
      <div className="row mb-5 mt-2">
        <h1> Employee Dashboard</h1>
      </div>
      <div className="row">
        {employeeList.map((employee) => (
          <EmployeeCard employee={employee} key={employee.id} />
        ))}
      </div>
    </>
  );
}

export default Dashboard;
