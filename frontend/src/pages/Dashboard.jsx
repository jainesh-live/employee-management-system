import EmployeeCard from "../components/EmployeeCard";
import { fetchEmployees } from "../services/EmployeeService";
import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import PageState from "../components/common/PageState";
import { useToast } from "../context/ToastProvider";

function Dashboard() {
  const { addToast } = useToast();
  const [employeeList, setEmployeeList] = useState([]);
  const [originalEmployeeList, setOriginalEmployeeList] = useState([]);
  const [search, setSearch] = useState({
    searchTerm: "",
    status: "",
  });
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState(null);

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

  const loadEmployees = async () => {
    setLoading(true);
    setErrorState(null);

    try {
      const employeeList = await fetchEmployees();
      setEmployeeList(employeeList);
      setOriginalEmployeeList(employeeList);
    } catch (error) {
      console.error("Error fetching employee list:", error);
      addToast("Error fetching employee list", "error");
      setErrorState({
        title: "Error",
        message: "Failed to load employees",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <PageState
      loading={loading}
      onRetry={loadEmployees}
      errorState={errorState}
    >
      {Array.isArray(employeeList) && 
      <main className="container mt-4">
        <PageHeader title="Dashboard" />
        <div className="row">
          <div className="col-md-6 mb-2">
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
      </main> }
    </PageState>
  );
}

export default Dashboard;
