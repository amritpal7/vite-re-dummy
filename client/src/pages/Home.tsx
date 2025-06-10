import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const Home = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex items-center justify-center text-center mt-30">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center border-2 border-[#264143] rounded-2xl shadow-[6px_6px_0px_#e99f4c] p-12 max-w-2xl bg-white bg-opacity-90 backdrop-blur-lg mt-24">
        <h1 className="text-[#264143] font-black text-4xl sm:text-5xl drop-shadow-md">
          Store, Hire & Buy Products!
        </h1>
        <p className="text-[#264143] text-lg mt-3 px-6 leading-relaxed">
          A platform where you can store products on your daily need basis,
          display them out, or purchase at great prices.
        </p>
        <Link to={user ? "/create-product" : "/login"}>
          <button className="mt-6 p-4 w-[290px] text-[15px] font-extrabold bg-[#de5499] rounded-xl shadow-[3px_3px_0px_0px_#e99f4c] hover:opacity-90">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
