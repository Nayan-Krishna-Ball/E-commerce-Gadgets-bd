//

import { orderModel } from "@/models/Order";
import { replaceMongoIdInArray } from "@/utils/replaceId";

export async function getOrdersByShopId(shopID) {
  try {
    const data = await orderModel
      .find({ "items.shop": shopID })
      .populate("items.product", "features")
      .sort({ createdAt: -1 })
      .lean();
    return replaceMongoIdInArray(data);
  } catch (error) {
    console.log(error);
  }
}
