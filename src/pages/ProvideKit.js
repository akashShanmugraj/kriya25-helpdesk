import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Layout from "../components/Layout";
import KriyaInput from "../components/KriyaInput";
import Button from "../components/Button";
import { fetchParticipantDetails, fetchUpdateUser } from "../API/calls";

const ProvideKit = () => {
  const [kriyaId, setKriyaId] = useState("");
  const [userData, setUserData] = useState(null);
  const [payment, setPayment] = useState([]);

  const handleChange = (val) => {
    setKriyaId(val);
    if (val.length >= 4) {
      setTimeout(() => {
        toast.promise(fetchParticipantDetails(`KRIYA${val}`), {
          loading: "Loading...",
          success: (data) => {
            console.log(data);
            setUserData(data.data.user);
            setPayment(data.data.payment);
            return "Success";
          },
          error: (err) => {
            setKriyaId("");
            console.log(err);
            return "Error";
          },
        });
      }, 100);
    }
  };

  const handleApply = (e) => {
    e.preventDefault();
    payment?.length === 0 ?
      toast.error("No Payment Done!") :
      toast.promise(fetchUpdateUser(`KRIYA${kriyaId}`, { kit: true }), {
        loading: "Loading...",
        success: () => {
          setKriyaId("");
          setUserData(null);
          setPayment([]);
          return "Success";
        },
        error: (err) => {
          console.log(err);
          return "Error";
        },
      });
  };

  return (
    <Layout className={"space-y-4 px-4 lg:px-0"} title={"Provide Kit"}>
      <div className="flex flex-col space-y-8 h-fit ">
        <div className="w-full lg:w-fit h-fit">
          <p className="text-lg">Enter Kriya ID</p>
          <KriyaInput value={kriyaId} handleChange={handleChange} />
        </div>
        {userData ? (
          <div className="space-y-4">
            {payment?.length !== 0 ? (
              <div className="text-emerald-600 font-semibold text-3xl">
                Paid!
              </div>
            ) : (
              <div className="text-red-600 font-semibold text-3xl">
                Not Paid!
              </div>
            )}
            {
              payment?.includes("GENERAL") && payment?.includes("WORKSHOP") ? (
                <div className="font-semibold text-3xl">
                  Kit : General + Workshop
                </div>
              ) : payment?.includes("GENERAL") ? (
                <div className="font-semibold text-3xl">
                  Kit : General
                </div>
              ) : payment?.includes("WORKSHOP") ? (
                <div className="font-semibold text-3xl">
                  Kit : Workshop
                </div>
              ) : (
                <div className="font-semibold text-3xl">
                  Kit : None
                </div>
              )
            }
            {
              userData.kit && (
                <div className="text-red-600 font-semibold text-3xl">
                  Kit Already Provided!
                </div>
              )
            }

            <div className="flex items-center pt-8">
              <p className="font-semibold w-[10ch]">Name</p>
              <p className="flex-1 [overflow-wrap:break-word] [inline-size:10ch]">
                {userData.name}
              </p>
            </div>
            <div className="flex items-center">
              <p className="font-semibold w-[10ch]">Email</p>
              <p className="flex-1 [overflow-wrap:break-word] [inline-size:10ch]">
                {userData.email}
              </p>
            </div>
            <div className="flex items-center">
              <p className="font-semibold w-[10ch]">College</p>
              <p className="flex-1 [overflow-wrap:break-word] [inline-size:10ch] lg:[inline-size:30ch]">
                {userData.college}
              </p>
            </div>
            <div className="pt-8 flex items-center space-x-4 w-full lg:w-3/4">
              <Button
                text={"Done"}
                handleClick={handleApply}
              />
              <Button
                handleClick={(e) => {
                  e.preventDefault();
                  setKriyaId("");
                  setUserData(null);
                }}
                outlined
                text="Clear"
              />
            </div>
          </div>
        ) : (
          <div className="w-full bg-gray-200 h-full p-8 flex justify-center items-center mt-4">
            <p className="text-gray-400 text-2xl font-bold">
              No Data Available!
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProvideKit;
