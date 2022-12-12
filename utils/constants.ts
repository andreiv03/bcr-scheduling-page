export const constants = {
  BCR_API_KEY: process.env["BCR_API_KEY"] as string,
  IPSTACK_API_KEY: process.env["IPSTACK_API_KEY"] as string,
  MAPBOX_API_KEY: process.env["MAPBOX_API_KEY"] as string
};

Object.entries(constants).forEach(([key, value]) => {
  if (typeof value === "undefined") throw new Error(`${key} not found!`);
});
