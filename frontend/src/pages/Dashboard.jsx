import EmployeeCard from "../components/EmployeeCard";
import { fetchEmployees } from "../services/EmployeeService";
import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";

function Dashboard() {
  const [employeeList, setEmployeeList] = useState([]);
  const [originalEmployeeList, setOriginalEmployeeList] = useState([]);
  const [search, setSearch] = useState({
    searchTerm: "",
    status: "",
  });

  const onSearchChange = (event) => {
    const updatedSearch = {
      ...search,
      [event.target.name]: event.target.value,
    };
    setSearch(updatedSearch);

    const searchTerm = updatedSearch.searchTerm;
    const searchStatus = updatedSearch.status;

    const filteredEmps = originalEmployeeList.filter(
      (emp) =>
        (searchTerm === "" ||
          emp.name.toLowerCase().startsWith(searchTerm.toLowerCase())) &&
        (searchStatus === "" || emp.status.toLowerCase() === searchStatus),
    );
    setEmployeeList(filteredEmps);
  };

  useEffect(() => {
    const fetchEmployeeList = async () => {
      try {
        const employeeList = await fetchEmployees();
        setEmployeeList(employeeList);
        setOriginalEmployeeList(employeeList);
      } catch (error) {
        console.error("Error fetching employee list:", error);
      } finally {
      }
    };

    fetchEmployeeList();
  }, []);

  return (
    <>
      <PageHeader title="Dashboard"/>
      <div className="row mb-3">
        <div className="col-md-6">
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search by name..."
              onChange={onSearchChange}
              value={search.searchTerm}
              name="searchTerm"
            />
            <select
              className="form-select"
              aria-label="Sort employees"
              onChange={onSearchChange}
              value={search.status}
              name="status"
            >
              <option value="">Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </form>
        </div>
        <div className="col-md-6 text-end">
          <span className="badge bg-secondary fs-6 px-3 py-2">
            Total Employees: {originalEmployeeList.length}
          </span>
        </div>
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
