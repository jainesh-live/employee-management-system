import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { fetchDepartmentById } from "../services/DepartmentService";
import DepartmentCard from "../components/DepartmentCard";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";

function DepartmentDetails() {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDepartment = async () => {
      try {
        console.log("Fetching department with ID DET:", id);
        const dept = await fetchDepartmentById(id);
        setDepartment(dept);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getDepartment();
  }, [id]);

  if (loading) {
    return <div className="container mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="container mt-4 alert alert-danger">Error: {error}</div>;
  }

  if (!department) {
    return <div className="container mt-4 alert alert-warning">Department not found</div>;
  }

  return (
    <main className="container mt-4">
      <PageHeader title={`Department Details: ${department.name}`} />
      <div className="row">
        <div className="col-md-6">
          <DepartmentCard department={department} />
        </div>
      </div>

      <div className="card shadow mt-4">
        <div className="card-header">
          <h5 className="mb-0">Department Information</h5>
        </div>

        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="fw-bold">Department Name</label>
              <p>{department.name}</p>
            </div>

            <div className="col-md-6">
              <label className="fw-bold">Department ID</label>
              <p>{department.id}</p>
            </div>
          </div>
        </div>

        <div className="card-footer d-flex justify-content-end gap-2">
          <Link to="/departments" className="btn btn-secondary">
            Back
          </Link>
        </div>
      </div>
    </main>
  );
}

export default DepartmentDetails;
