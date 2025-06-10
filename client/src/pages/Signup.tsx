import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen text-center">
      <div className="flex flex-col items-center justify-center border-2 border-[#264143] rounded-2xl shadow-[3px_4px_0px_1px_#e99f4c] p-6">
        <p className="text-[#264143] font-black text-xl mt-5">SIGN UP</p>
        <form action="" className="flex flex-col">
          <div className="flex flex-col items-start my-2">
            <label className="font-semibold mb-1" htmlFor="name">
              Name
            </label>
            <input
              placeholder="Enter your full name"
              className="outline-none border-2 border-[#264143] shadow-[3px_4px_0px_1px_#e99f4c] w-[290px] p-3 rounded-md text-[15px] focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#e99f4c]"
              type="text"
            />
          </div>
          <div className="flex flex-col items-start my-2">
            <label className="font-semibold mb-1" htmlFor="email">
              Email
            </label>
            <input
              placeholder="Enter your email"
              id="email"
              className="outline-none border-2 border-[#264143] shadow-[3px_4px_0px_1px_#e99f4c] w-[290px] p-3 rounded-md text-[15px] focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#e99f4c]"
              type="email"
            />
          </div>
          <div className="flex flex-col items-start my-2">
            <label className="font-semibold mb-1" htmlFor="password">
              Password
            </label>
            <input
              placeholder="Enter your password"
              id="password"
              className="outline-none border-2 border-[#264143] shadow-[3px_4px_0px_1px_#e99f4c] w-[290px] p-3 rounded-md text-[15px] focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#e99f4c]"
              type="password"
            />
          </div>
          <div className="flex flex-col items-center mt-4">
            <button className="p-4 w-[290px] text-[15px] font-extrabold bg-[#de5499] rounded-xl shadow-[3px_3px_0px_0px_#e99f4c] hover:opacity-90 focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#e99f4c]">
              SIGN UP
            </button>
            <p className="mt-3">
              Have an Account?{" "}
              <Link className="font-extrabold text-[#264143] p-1" to="/login">
                Login Here!
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
