import "../css/EmployeeCard.css";
import { Link } from "react-router-dom";
import StatusSpan from "./StatusSpan";

function EmployeeCard({ employee }) {
  const { name, emailId, department, status } = employee || {};
  const normalizedStatus = status ? status.toLowerCase() : "inactive";

  return (
    <article className="col-md-4 mb-4">
  <div className="card h-100 shadow-sm">
    <div className="card-body text-center">
      <img
        src={`https://i.pravatar.cc/150?img=${employee.id}`}
        alt={name}
        className="rounded-circle img-thumbnail mb-3"
        width="120"
        height="120"
      />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="card-title mb-0">{name || "Employee Name"}</h5>

        <StatusSpan status={status}></StatusSpan>
      </div>

      <p className="card-text mb-2">
        <strong>Email:</strong><br />
        {emailId || "email@example.com"}
      </p>

      <p className="card-text mb-2">
        <strong>Department:</strong><br />
        {department?.name || "Unknown"}
      </p>

      <p className="card-text">
        <strong>Status:</strong><br />
        {status || "Active"}
      </p>
    </div>

    <div className="card-footer bg-transparent border-0">
      <Link
        to={`/employees/${employee.id}`}
        className="btn btn-primary w-100"
      >
        View Details
      </Link>
    </div>
  </div>
</article>
  );
}

export default EmployeeCard;
