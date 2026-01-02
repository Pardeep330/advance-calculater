import { Link } from "react-router-dom";
import { GoLock } from "react-icons/go";
import environment from "../../environment";

const AuthLayout = ({ children, role = null }: any) => {
  return (
    <>
      <div className="">

        <div className="w-full mx-auto h-screen">
          <div className="flex h-full">
            {/* Left side - Image */}
            <div className="h-full 2xl:w-8/12 xl:w-7/12 lg:w-6/12 md:w-6/12 w-full md:block hidden">
              <div className="bg-img h-full"></div>
            </div>

            {/* Right side - Content with scroll */}
            <div className={`${role === environment.contractorRoleId ? "justify-start" : "justify-center"} flex flex-col items-center 2xl:w-4/12 xl:5/12 lg:w-6/12 md:w-6/12 w-full bg-[#f9f9f9] z-20 py-10 px-8 overflow-auto h-full`}>
              {children}
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default AuthLayout;
