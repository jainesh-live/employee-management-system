import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchDepartmentById } from "../services/DepartmentService";
import DepartmentCard from "../components/DepartmentCard";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import PageState from "../components/common/PageState";
import { useToast } from "../context/ToastProvider";

function DepartmentDetails() {
  const { id } = useParams();
  const { addToast } = useToast();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState(null);

  const getDepartment = async () => {
    setLoading(true);
    setErrorState(null);

    try {
      const dept = await fetchDepartmentById(id);

      if (!dept) {
        setErrorState({
          title: "Not Found",
          message: "Department not found",
        });
        return;
      }

      setDepartment(dept);
    } catch (err) {
      console.error("Error fetching department:", err);
      addToast("Error fetching department details", "error");
      setErrorState({
        title: "Error",
        message: "Failed to load department details",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDepartment();
  }, [id]);

  return (
    <PageState loading={loading} onRetry={getDepartment} errorState={errorState}>
      {department && (
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
      )}
    </PageState>
  );
}

export default DepartmentDetails;
