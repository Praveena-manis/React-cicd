import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';

function Login() {
    const [user, setUser] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handlesubmit =async (e) => {
        const validationErrors = {}
        e.preventDefault();
        if (!user.email) {
            validationErrors.email = "Email cannot be empty"
        }
        if (!user.password) {
            validationErrors.password = "Password cannot be empty"
        }
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return;
        } 
        try {
            const res=await axios.post('http://localhost:5000/api/user/login',user);
            localStorage.setItem('token',res.data.token);
            console.log(res.data.message);
            navigate('/products'); 
        } catch (error) {
          console.log(error.response.data.messsage)
            toast.error(error.response.data.messsage);
        }
        
    }
    return (
        <div className="container">
            <h3 className="text-center p-2 text-bg-warning my-3">Login</h3>
            <form onSubmit={handlesubmit} noValidate>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className={`form-control ${errors.email ? 'is-invalid' : 'is-valid'}`}
                        placeholder="john@gmail.com" required onChange={(e) => setUser({ ...user, email: e.target.value })}
                        value={user.email} />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className={`form-control ${errors.password ? 'is-invalid' : 'is-valid'}`}
                        placeholder="password" required onChange={(e) => setUser({ ...user, password: e.target.value })}
                        value={user.password} />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
                <ToastContainer />
            </form>
        </div>
    )
}
export default Login;