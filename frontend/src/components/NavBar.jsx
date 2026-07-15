import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm fixed-top">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary fs-4" to="/">
          EmployeeHub
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/">
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/departments">
                Departments
              </Link>
            </li>

            <li className="nav-item ms-3">
              <Link
                className="btn btn-primary rounded-pill px-4"
                to="/employees/add"
              >
                + Add Employee
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
