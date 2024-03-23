import { Link } from "react-router-dom";
import { Button } from "primereact/button";

export const NotFoundPage = () => {
  return <div className="h-screen w-full flex gap-4 flex-col justify-center items-center">
    <span className="font-bold text-5xl text-violet-600">
      404
    </span>

    <span className="text-center font-extrabold text-5xl text-black">
      Page Not Found
    </span>

    <span className="text-center text-xl text-gray-500">
      Sorry,we couldn't find the page.
    </span>

    <Link to="/">
      <Button icon="pi pi-arrow-left" label="Back to Home"
              className="w-[200px] btn text-center h-10 flex items-center justify-center cursor-pointer
                              bg-violet-500 hover:bg-violet-600 rounded-md text-white ra mt-5"
      />

    </Link>
  </div>;
};