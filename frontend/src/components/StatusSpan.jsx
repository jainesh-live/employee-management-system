function StatusSpan({ status }) {
  const normalizedStatus = status ? status.toLowerCase() : "inactive";

  return (
    <span
      className={`badge ${
        normalizedStatus === "active" ? "text-bg-success" : "text-bg-danger"
      }`}
    >
      {status || "Inactive"}
    </span>
  );
}

export default StatusSpan;