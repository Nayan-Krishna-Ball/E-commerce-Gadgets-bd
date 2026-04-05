"use server";

import { orderModel } from "@/models/Order";

export async function updataOrderStatus(orderId, status) {
  try {
    const order = await orderModel.findById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }
    const itemToUpdate = order.items.map((item) => {
      item.status = status;
      return item;
    });

    order.items = itemToUpdate;
    await order.save();
    return order;
  } catch (error) {
    console.log(error);
  }
}
