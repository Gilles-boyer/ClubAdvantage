import client from "../api/axiosInstance";

export const displayOffers = () => {
  return client.get("/offers"); 
};

export const createOffer = (offerName, offerDescription) => {
    console.log("Contenu envoyé :", offerName, offerDescription);
  return client.post("/offers", offerName, offerDescription);
};

export const UpdateOffer = (id, offerName, offerDescription) => {
  return client.patch(`/offer/${id}`, offerName, offerDescription);
}

export const updatedStatus = (id, modifiedStatus) => {
  return client.patch(`/offers/${id}`, modifiedStatus)
}

export const deleteOffer = (id) => {
  return client.delete(`/offers/${id}`);
};
