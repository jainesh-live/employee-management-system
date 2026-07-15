import "../css/EmployeeCard.css";

function DepartmentCard({ department }) {
  const { id, name } = department || {};

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{department.name}</h5>

        <p className="card-text mb-1">
          <strong>ID:</strong> {department.id}
        </p>
      </div>
    </div>
  );
}

export default DepartmentCard;
