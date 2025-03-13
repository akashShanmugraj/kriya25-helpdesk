import axios from "axios";

export const BASE_URL = "https://kriyabackend.psgtech.ac.in/api";

export const AUTH_URL = `${BASE_URL}/convenor-auth`;
export const REGISTER_URL = `${BASE_URL}/register`;
const USER_URL = `${BASE_URL}/auth`;

export const pdfUrlUpdate = async (email, url) => {
  await axios.put(
    `${USER_URL}/user-details/${email}`,
    { verificationUrl: url },
    {}
  );
};

export const uploadPdf = async (file, kriyaId) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(`${BASE_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        filetype: "VERF",
        kriyaId: kriyaId,
      },
    });

    return res; // Assuming the server sends back the URL of the uploaded PDF
  } catch (err) {
    console.error("Error uploading PDF:", err);
    throw err;
  }
};
export const fetchRegister = (formData) =>
  axios.post(`${AUTH_URL}/register`, formData, {});

export const fetchLogin = (formData) =>
  axios.post(`${AUTH_URL}/login`, formData, {});

export const fetchParticipantDetails = (id) =>
  axios.get(`${BASE_URL}/auth/kriya-id/${id}`, {});

export const fetchUpdateUser = (id, formData) =>
  axios.put(`${BASE_URL}/auth/update-user/${id}`, formData, {});

export const fetchApplyAttendanceIndividual = (formData) =>
  axios.post(`${REGISTER_URL}/attend/`, formData, {});

export const fetchAttendees = (id) =>
  axios.get(`${REGISTER_URL}/attendees/${id}`);

export const registerOnSpot = async (body) => {
  try {
    console.log("dataa", body);
    const resss = await axios.post(`${BASE_URL}/auth/onspot/register`, body);
    console.log("resdaa", resss);
    return resss; // ✅ Return successful response
  } catch (error) {
    console.error("Error in registerOnSpot:", error);
    throw error; // ✅ Ensure the error is thrown so toast.promise catches it
  }
};

export const generateOnSpotPaymentURL = (body) =>
  axios.post(`${BASE_URL}/payment/onspot/pay-general`, body);

export const fetchTransactionDetails = (transactionId) =>
  axios.get(`${BASE_URL}/payment/payment-details/${transactionId}`);

export const fetchUserDetails = (kriyaId) =>
  axios.get(`${BASE_URL}/auth/user-details/${kriyaId}`);

export const fetchKit = () => axios.get(`${BASE_URL}/auth/kit-done`);

export const fetchCountWise = () =>
  axios.get(`${BASE_URL}/auth/workshop-and-general`);
