function PageHeader({ title }) {
  return (
    <div className="text-center bg-light rounded py-3 mb-4 shadow-sm">
      <h3 className="mb-0 text-primary fw-bold">{title}</h3>
    </div>
  );
}

export default PageHeader;
