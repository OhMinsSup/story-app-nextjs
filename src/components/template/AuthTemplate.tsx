import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { AiOutlineClose } from "react-icons/ai";
import { PAGE_ENDPOINTS } from "@constants/constant";

interface AuthTemplateProps {}
const AuthTemplate: React.FC<AuthTemplateProps> = ({ children }) => {
  const router = useRouter();

  // redirect to the Main
  const onPageMove = useCallback(() => {
    router.push(PAGE_ENDPOINTS.INDEX);
  }, [router]);

  return (
    <div
      className="z-50 flex flex-row items-start justify-center h-screen md:pt-20 lg:pt-0 md:items-center"
    >
      <button
        type="button"
        className="absolute top-0 right-0 mt-2 ml-10 button-transparent lg:right-auto lg:left-0 lg:mt-10"
        onClick={onPageMove}
      >
        <AiOutlineClose className="w-8 h-8 fill-current" />
      </button>
      <div
        className="w-full overflow-hidden bg-white border rounded-lg shadow-2xl md:mx-20 lg:w-2/3"
      >
        <div
          className="px-4 py-8 leading-snug lg:w-3/4 lg:mx-auto lg:px-12 lg:py-12"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthTemplate;
