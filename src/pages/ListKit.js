import React, { useEffect, useState } from "react";
import {
  fetchCountWise,
  fetchKit,
} from "../API/calls";
import { toast } from "react-hot-toast";

const ListKit = () => {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(null)

  useEffect(() => {
    toast.promise(fetchKit(), {
      loading: "Loading...",
      success: (data) => {
        console.log(data.data.users);
        setData(data.data.users);
        return "Success";
      },
      error: (err) => {
        console.log(err);
        return "Error";
      },
    });
  }, []);

  useEffect(() => {
    toast.promise(fetchCountWise(), {
      loading: "Loading...",
      success: (data) => {
        console.log(data.data.users);
        setCount(data.data);
        return "Success";
      },
      error: (err) => {
        console.log(err);
        return "Error";
      }
    })
  }, [])

  return (
    <div className="h-full w-full overflow-hidden font-poppins p-8">
      <h1 className="text-4xl font-semibold text-violet-900 mb-8">
        Kit Provided List
      </h1>
      <div className="my-4 flex justify-between">
        <div className="w-1/3">
          <p className="text-sm font-semibold">Workshop and General</p>
          <p className="text-3xl font-semibold text-purple-800">
            {count?.wng}
          </p>
        </div>
        <div className="w-1/3">
          <p className="text-sm font-semibold">Workshop </p>
          <p className="text-3xl font-semibold text-purple-800">
            {count?.w}
          </p>
        </div>
        <div className="w-1/3">
          <p className="text-sm font-semibold">General</p>
          <p className="text-3xl font-semibold text-purple-800">
            {count?.g}
          </p>
        </div>
      </div>
      {!data ? (
        <h1 className="text-3xl font-semibold">Loading...</h1>
      ) : (
        <React.Fragment>
          <div className="grid grid-cols-[0.25fr_1fr_1fr] lg:grid-cols-[0.25fr_0.5fr_1fr_1fr] h-[calc(100vh-)]">
          <h1 className="text-lg font-semibold">No. </h1>
            <h1 className="text-lg font-semibold">Kriya ID</h1>
            <h1 className="text-lg font-semibold">Name</h1>
            <h1 className="hidden lg:block text-lg font-semibold">College</h1>
          </div>
          <div className="mt-2 gap-1 grid grid-cols-[0.25fr_1fr_1fr] lg:grid-cols-[0.25fr_0.5fr_1fr_1fr] max-h-[calc(100vh-20rem)] overflow-y-auto">
            {data.map((item, index) => (
              <React.Fragment>
                <p className="h-fit ">{index + 1}</p>
                <p className="h-fit ">{item.kriyaId}</p>
                <p className="h-fit ">{item.name}</p>
                <p className="h-fit hidden lg:block">{item.college}</p>
              </React.Fragment>
            ))}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default ListKit;
