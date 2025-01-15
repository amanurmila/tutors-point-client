import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { toast } from "react-toastify";
import { GrGoogle } from "react-icons/gr";

const Register = () => {
  const navigate = useNavigate();
  const { createNewUser, setUser, updateUser, signInWithGoogle } =
    useContext(AuthContext);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("student");
  const [googleUser, setGoogleUser] = useState(null);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  // Handle registration with email and password
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoURL = e.target.photo.value;
    const role = e.target.role.value;

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters long and include an uppercase and a lowercase letter."
      );
      return;
    }

    setError("");

    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);

        // Save user to database
        const userData = { name, email, photoURL, role };
        saveUserToDatabase(userData);

        toast.success("Successfully created a new account");
        updateUser({ displayName: name, photoURL })
          .then(() => navigate("/"))
          .catch((err) => console.error(err));
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to create account. Please try again.");
      });
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setGoogleUser({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
        setShowRoleModal(true);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to sign in with Google.");
      });
  };

  // Save user to the database (shared function for both cases)
  const saveUserToDatabase = (userData) => {
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("User saved successfully");
          setShowRoleModal(false); // Close the modal after success
          setUser(userData);
          navigate("/");
        } else {
          setError("Failed to save user. Please try again.");
          setShowRoleModal(false); // Close the modal on error
        }
      })
      .catch((err) => {
        console.error(err);
        setError("An error occurred. Please try again.");
        setShowRoleModal(false); // Close the modal on error
      });
  };

  // Save Google user with selected role
  const saveGoogleUserToDatabase = () => {
    const userData = {
      ...googleUser,
      role: selectedRole,
    };
    saveUserToDatabase(userData);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="card border bg-base-100 w-full max-w-lg shrink-0 shadow-lg p-10">
        <h2 className="text-2xl font-semibold text-center">
          Register your account
        </h2>
        <form onSubmit={handleSubmit} className="card-body pb-3">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="name"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="photo-url"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="relative">
              <input
                name="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="password"
                className="input input-bordered w-full"
                required
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
              >
                {passwordVisible ? (
                  <IoIosEye size={24} />
                ) : (
                  <IoIosEyeOff size={24} />
                )}
              </button>
            </div>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Select Your Role</span>
            </label>
            <select
              name="role"
              defaultValue="student"
              className="select select-bordered w-full"
            >
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="form-control mt-6">
            <button className="btn btn-neutral">Register</button>
          </div>
        </form>

        <div
          onClick={handleGoogleSignIn}
          className="flex items-center gap-3 btn btn-neutral mx-8 mb-5 cursor-pointer"
        >
          <GrGoogle />
          <span>Login with Google</span>
        </div>

        <p className="text-center font-semibold">
          Already Have An Account?{" "}
          <Link className="text-red-500" to="/login">
            Login
          </Link>
        </p>
      </div>

      {showRoleModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Select Your Role</h3>
            <select
              className="select select-bordered w-full mt-4"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
              <option value="admin">Admin</option>
            </select>
            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={saveGoogleUserToDatabase}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
