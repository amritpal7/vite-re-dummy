import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, login } from "../features/auth/authSlice";
import { RootState } from "../app/store";
import { AppDispatch } from "../app/store";
import toast from "react-hot-toast";

const SignIn = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const { user, status } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        navigate("/profile");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setForm(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(login(form)).unwrap(); // wait for login thunk to succeed
      await dispatch(currentUser());

      setForm({ username: "", password: "" });
      toast.success("Logged in successfully");
    } catch (error: any) {
      setForm({ username: "", password: "" });
      toast.error(error.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-center">
      <div className="flex flex-col items-center justify-center border-2 border-[#264143] rounded-2xl shadow-[3px_4px_0px_1px_#e99f4c] p-6">
        <p className="text-[#264143] font-black text-xl mt-5">SIGN IN</p>
        <form action="" className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-col items-start my-2">
            <label className="font-semibold mb-1" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              placeholder="Enter your username"
              className="outline-none border-2 border-[#264143] shadow-[3px_4px_0px_1px_#e99f4c] w-[290px] p-3 rounded-md text-[15px] focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#e99f4c]"
              type="text"
              name="username"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col items-start my-2">
            <label className="font-semibold mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              placeholder="Enter your password"
              className="outline-none border-2 border-[#264143] shadow-[3px_4px_0px_1px_#e99f4c] w-[290px] p-3 rounded-md text-[15px] focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#e99f4c]"
              type="password"
              name="password"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col items-center mt-4">
            <button
              className="p-4 w-[290px] text-[15px] font-extrabold bg-[#de5499] rounded-xl shadow-[3px_3px_0px_0px_#e99f4c] hover:opacity-90 focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#e99f4c]"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? "SIGNING IN..." : "SIGN IN"}
            </button>
            <p className="mt-3">
              Don't Have an Account?{" "}
              <Link
                className="font-extrabold text-[#264143] p-1"
                to="/register"
              >
                Register Here!
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
