const  Price  = require("../model/price");

const getPricingDetails = async (priceId) => {
  try {
    // Assuming priceId is a UUID
    const pricingDetails = await Price.findOne({
      where: { id: priceId },
    });

    return pricingDetails;
  } catch (error) {
    console.error("Error fetching pricing details:", error);
    throw error;
  }
};

const getPriceByCategory = async (priceId, category) => {
  try {
    const pricingDetails = await getPricingDetails(priceId);

    if (!pricingDetails) {
      throw { code: 400, msg: "Invalid priceId" };
    }

    switch (category) {
      case "economy":
        return pricingDetails.economy;
      case "business":
        return pricingDetails.business;
      case "firstClass":
        return pricingDetails.firstClass;
      default:
        throw { code: 400, msg: "Invalid priceCategory" };
    }
  } catch (error) {
    console.error("Error fetching price by category:", error);
    throw error;
  }
};

module.exports = getPriceByCategory;
