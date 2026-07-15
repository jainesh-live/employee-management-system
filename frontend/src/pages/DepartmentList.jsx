import { useEffect, useState } from "react";
import { fetchDepartments } from "../services/DepartmentService";
import { Link } from "react-router-dom";

function DepartmentList() {
  const [departmentList, setDepartmentList] = useState([]);

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const fetchedDepartments = await fetchDepartments();
        setDepartmentList(fetchedDepartments);
      } catch (err) {
        console.err("Error fetching departments", err);
      } finally {
      }
    };
    getDepartments();
  }, []);

  return (
    <div className="container mt-5 ">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Departments</h2>
        <Link to="/departments/add" className="btn btn-primary text-white">
          Add Department
        </Link>
      </div>

      <table className="table table-bordered w-80 table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Department Name</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {departmentList.map((dep) => (
            <tr key={dep.id}>
              <td>{dep.id}</td>
              <td>{dep.name}</td>
              <td className="text-nowrap">
                <Link
                  to={`/departments/edit/${dep.id}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </Link>

                <Link
                  to={`/departments/${dep.id}`}
                  className="btn btn-primary btn-sm"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DepartmentList;
