import { useEffect, useState } from "react";
import { fetchDepartments } from "../services/DepartmentService";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { useNavigate } from "react-router-dom";
import PageState from "../components/common/PageState";
import { useToast } from "../context/ToastProvider";

function DepartmentList() {
  const { addToast } = useToast();
  const [departmentList, setDepartmentList] = useState([]);
  const [originalDepartmentList, setOriginalDepartmentList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState(null);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filteredDepartments = originalDepartmentList.filter((dep) =>
      dep.name.toLowerCase().includes(value.toLowerCase()),
    );

    setDepartmentList(filteredDepartments);
  };

  const loadDepartments = async () => {
    setLoading(true);
    setErrorState(null);

    try {
      const fetchedDepartments = await fetchDepartments();
      fetchedDepartments.sort((a, b) => a.id - b.id);
      setDepartmentList(fetchedDepartments);
      setOriginalDepartmentList(fetchedDepartments);
    } catch (err) {
      console.error("Error fetching departments", err);
      addToast("Error fetching departments", "error");
      setErrorState({
        title: "Error",
        message: "Failed to load departments",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  return (
    <PageState loading={loading} onRetry={loadDepartments} errorState={errorState}>
      <main className="container mt-4">
        <PageHeader title="Departments" />
        <div className="d-flex justify-content-between align-items-center mb-3 gap-3">
          <input
            className="form-control w-50"
            type="search"
            placeholder="Search by department name..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Link to="/departments/add" className="btn btn-primary text-white">
            Add Department
          </Link>
        </div>

        <table className="table table-bordered w-80 table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Department Name</th>
            </tr>
          </thead>

          <tbody>
            {departmentList.map((dep) => (
              <tr
                className="clickable-row"
                key={dep.id}
                onClick={() => navigate(`/departments/${dep.id}`)}
              >
                <td>{dep.id}</td>
                <td>{dep.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </PageState>
  );
}

export default DepartmentList;
