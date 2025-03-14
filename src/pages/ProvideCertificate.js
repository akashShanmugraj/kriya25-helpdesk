import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Layout from "../components/Layout";
import KriyaInput from "../components/KriyaInput";
import Button from "../components/Button";
import axios from "axios";

const ProvideCertificate = () => {
    const [kriyaId, setKriyaId] = useState("");
    const [workshopId, setWorkshopId] = useState("");
    const [userData, setUserData] = useState(null);

    // Function to fetch certificate details
    const fetchCertificateDetails = async (id, wkspId) => {
        try {
            const response = await axios.post("https://kriyaconvenordb.psgtech.ac.in/issue-certificate", {
                kriyaId: id,
                eventId: wkspId // Adding workshop ID to the request
            });
            return response;
        } catch (error) {
            console.error("Error fetching certificate details:", error);
            throw error;
        }
    };

    // Function to update certificate status
    const updateCertificateStatus = async (id, wkspId) => {
        try {
            const response = await axios.post("https://kriyaconvenordb.psgtech.ac.in/issue-certificate-true", {
                kriyaId: id,
                eventId: wkspId,
                providedCertificate: true
            });
            return response;
        } catch (error) {
            console.error("Error updating certificate status:", error);
            throw error;
        }
    };

    const handleChange = (val) => {
        setKriyaId(val);
    };

    const handleWorkshopChange = (e) => {
        setWorkshopId(e.target.value);
    };

    const handleSearch = () => {
        if (kriyaId.length < 4) {
            toast.error("Please enter a valid Kriya ID");
            return;
        }

        if (!workshopId) {
            toast.error("Please enter a Workshop ID");
            return;
        }

        toast.promise(fetchCertificateDetails(`KRIYA${kriyaId}`, workshopId), {
            loading: "Loading certificate details...",
            success: (data) => {
                console.log("Certificate details:", data);
                setUserData(data.data);
                return "Certificate details loaded successfully";
            },
            error: (err) => {
                console.log("Error fetching certificate details:", err);
                return "Error fetching certificate details";
            },
        });
    };

    const handleIssueCertificate = (e) => {
        e.preventDefault();
        if (!userData) {
            toast.error("No user data available");
            return;
        }

        if (!userData.attended) {
            toast.error("User has not attended the event");
            return;
        }

        if (userData.providedCertificate) {
            toast.error("Certificate already issued");
            return;
        }

        toast.promise(updateCertificateStatus(userData.kriyaId, workshopId), {
            loading: "Issuing certificate...",
            success: () => {
                setKriyaId("");
                setWorkshopId("");
                setUserData(null);
                return "Certificate issued successfully";
            },
            error: (err) => {
                console.log("Error issuing certificate:", err);
                return "Error issuing certificate";
            },
        });
    };

    return (
        <Layout className={"space-y-4 px-4 lg:px-0"} title={"Issue Certificate"}>
            <div className="flex flex-col space-y-8 h-fit">
                <div className="w-full lg:w-fit h-fit">
                    <div className="mb-4">
                        <p className="text-lg">Enter Kriya ID</p>
                        <KriyaInput value={kriyaId} handleChange={handleChange} />
                    </div>

                    <div className="mb-4">
                        <p className="text-lg">Enter Workshop ID</p>
                        <input
                            type="text"
                            value={workshopId}
                            onChange={handleWorkshopChange}
                            placeholder="e.g. WKSP01"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                    </div>

                    <div className="flex items-center space-x-4">
                        <Button
                            text={"Search"}
                            handleClick={handleSearch}
                        />
                        <Button
                            handleClick={() => {
                                setKriyaId("");
                                setWorkshopId("");
                                setUserData(null);
                            }}
                            outlined
                            text="Clear"
                        />
                    </div>
                </div>

                {userData ? (
                    <div className="space-y-4">
                        {userData.attended ? (
                            <div className="text-emerald-600 font-semibold text-3xl">
                                Attended!
                            </div>
                        ) : (
                            <div className="text-red-600 font-semibold text-3xl">
                                Not Attended!
                            </div>
                        )}

                        {userData.providedCertificate && (
                            <div className="text-emerald-600 font-semibold text-3xl">
                                Certificate Already Issued!
                            </div>
                        )}

                        {userData.attended && !userData.providedCertificate && (
                            <div className="text-red-600 font-semibold text-3xl">
                                Certificate Not Issued!
                            </div>
                        )}




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
                            <p className="font-semibold w-[10ch]">Kriya ID</p>
                            <p className="flex-1 [overflow-wrap:break-word] [inline-size:10ch]">
                                {userData.kriyaId}
                            </p>
                        </div>
                        <div className="flex items-center">
                            <p className="font-semibold w-[10ch]">Workshop</p>
                            <p className="flex-1 [overflow-wrap:break-word] [inline-size:10ch]">
                                {workshopId}
                            </p>
                        </div>
                        {userData.attendedAt && (
                            <div className="flex items-center">
                                <p className="font-semibold w-[10ch]">Attended At</p>
                                <p className="flex-1 [overflow-wrap:break-word] [inline-size:10ch]">
                                    {new Date(userData.attendedAt).toLocaleString()}
                                </p>
                            </div>
                        )}

                        <div className="pt-8 flex items-center space-x-4 w-full lg:w-3/4">
                            <Button
                                text={"Issue Certificate"}
                                handleClick={handleIssueCertificate}
                                disabled={!userData.attended || userData.providedCertificate}
                            />
                            <Button
                                handleClick={() => {
                                    setKriyaId("");
                                    setWorkshopId("");
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

export default ProvideCertificate;