import axios from "axios";

export const BASE_URL = "http://localhost:4300/api";

export const AUTH_URL = `${BASE_URL}/convenor-auth`;
export const REGISTER_URL = `${BASE_URL}/register`;

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

export const registerOnSpot = (body) =>
  axios.post(`${BASE_URL}/auth/onspot/register`, body);

export const generateOnSpotPaymentURL = (body) =>
  axios.post(`${BASE_URL}/payment/onspot/pay-general`, body);

export const fetchTransactionDetails = (transactionId) =>
  axios.get(`${BASE_URL}/payment/payment-details/${transactionId}`);

export const fetchUserDetails = (kriyaId) =>
  axios.get(`${BASE_URL}/auth/user-details/${kriyaId}`);

export const fetchKit = () => axios.get(`${BASE_URL}/auth/kit-done`);

export const fetchCountWise = () => axios.get(`${BASE_URL}/auth/workshop-and-general`)
