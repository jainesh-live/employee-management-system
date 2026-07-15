import { useEffect, useState } from "react";
import { addDepartment } from '../services/DepartmentService'
import { useNavigate } from "react-router-dom";

function DepartmentForm() {

    const navigate = useNavigate()

    const[depForm, setDepForm] = useState({
        name: ""
    });

    const handleChange = (e) => {
        setDepForm((values) => ({ ...values, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const addedDepartment = await addDepartment(depForm)
            navigate(`/departments/${addedDepartment.id}`)
        } catch (err) {
            console.error("Error adding department", err)

        } finally {

        }

    }

    useEffect(()=>{

    }, [])

    return (
    <form className="container mt-4">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Department Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          placeholder="Enter name"
          required
          value={depForm.name}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Save Department
      </button>
    </form>
  );
}

export default DepartmentForm;