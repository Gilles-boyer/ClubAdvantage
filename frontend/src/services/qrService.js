import client from '../api/axiosInstance';

export const fetchQrPayload = () =>
  client.get('/api/user/qrcode').then(res => res.data.payload);
