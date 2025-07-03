import client from "../api/axiosInstance";

// On récupère le PNG en blob
export const fetchQrCode = () =>
  client
    .get("/api/user/qrcode", { responseType: "blob",
    headers: { "Accept": "image/png" } })
    .then(res => URL.createObjectURL(res.data));
