//

import { connectDB } from "@/lib/db";
import { cartModel } from "@/models/Cart";
import { orderModel } from "@/models/Order";
import { productModel } from "@/models/Products";
import { reviewModel } from "@/models/review";

// import { productModel } from "@/models/Products";
import { shopModel } from "@/models/Shop";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/replaceId";

//Get all products

export async function getAllProducts({
  category,
  keyword,
  brand,
  rating,
  price,
  stock,
} = {}) {
  await connectDB();
  const filter = {
    status: "published",
  };

  if (keyword && keyword.trim() !== "") {
    filter.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { brand: { $regex: keyword, $options: "i" } },
      { category: { $regex: keyword, $options: "i" } },
      { subCategory: { $regex: keyword, $options: "i" } },
    ];
  } else {
    if (category) {
      const categories = Array.isArray(category) ? category : [category];
      filter.category = { $in: categories };
    }
  }

  if (brand) filter.brand = brand;

  if (category) {
    const categories = Array.isArray(category) ? category : [category];
    filter.category = { $in: categories };
  }

  if (rating) {
    filter["rating.average"] = { $gte: Number(rating) };
  }

  if (price) {
    const [min, max] = price.split("-").map((n) => Number(n));

    filter.price = {};

    if (!isNaN(min)) filter.price.$gte = min;
    if (!isNaN(max)) filter.price.$lte = max;
  }

  if (stock === "true") filter.stock = { $gt: 0 };

  const products = await productModel.find(filter).lean();

  return replaceMongoIdInArray(products);
}

//Get products by shop id

export async function getAllProductsByShopId(shopId) {
  await connectDB();

  const products = await productModel.find({ "shop.shopId": shopId }).lean();

  return replaceMongoIdInArray(products);
}

// Get products by slug

export async function getProductBySlug(slug) {
  await connectDB();
  const product = await productModel.findOne({ slug }).lean();

  return replaceMongoIdInObject(product);
}

//get products by category
export async function getProductsByCategory(category) {
  await connectDB();
  const products = await productModel.find({ category }).lean();

  return replaceMongoIdInArray(products);
}

// Get product by sold count
export async function getTopSellingProducts(limit = 10) {
  await connectDB();
  const products = await productModel
    .find()
    .sort({ soldCount: -1 })
    .limit(limit)
    .lean();

  return replaceMongoIdInArray(products);
}

//Get Single Product by product id
export async function getProductByProductId(productId, value) {
  await connectDB();

  if (value) {
    const product = await productModel.findOne({ _id: productId }).lean();
    return product;
  }
  const product = await productModel.findOne({ _id: productId }).lean();

  return replaceMongoIdInObject(product);
}

// Get all shops
export async function getAllShops() {
  await connectDB();
  const shops = await shopModel.find().lean();
  return replaceMongoIdInArray(shops);
}

//Get Shop by Shop id
export async function getShopById(shopId) {
  await connectDB();
  const shop = await shopModel.findById(shopId).lean();

  return replaceMongoIdInObject(shop);
}

//Get shop by user id
export async function getShopByUserId(userId) {
  await connectDB();
  const shop = await shopModel
    .findOne({ owner: userId })
    .populate({
      path: "owner",
      model: "users",
      select: "name email",
    })
    .lean();

  return shop;
}

//Get shop by slug
export async function getShopBySlug(slug) {
  await connectDB();
  const shopBySlug = await shopModel.findOne({ slug }).lean();
  return shopBySlug;
}

//Get Shop by pagination

export const getPaginatedShops = async (page = 1, limit = 6) => {
  await connectDB();

  const skip = (page - 1) * limit;

  const shops = await shopModel
    .find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await shopModel.countDocuments();

  return {
    shops,
    totalPages: Math.ceil(total / limit),
  };
};

//Get all Cart Items by User id

export async function getCartByUserId(userId) {
  await connectDB();

  if (!userId) return null;

  const cart = await cartModel
    .findOne({ user: userId })
    .populate({
      path: "items.product",
      // model: "products",
      model: "product",

      select: "title slug price images stock",
    })
    .populate({
      path: "items.shop",
      model: "shop",
      select: "name",
    })
    .lean();

  if (!cart) return null;

  return replaceMongoIdInObject(cart);
}

//Get Order By User Id From Order

export async function getOrderByUserId(userId) {
  await connectDB();
  if (!userId) return null;

  const order = await orderModel
    .find({ user: userId })
    .populate({
      path: "items.product",
      // model: "products",
      model: "product",

      select: " title image price quantity ",
    })
    .populate({
      path: "items.shop",
      model: "shop",
      select: "name",
    })
    .sort({ createdAt: -1 })
    .lean();

  if (!order) return null;

  return replaceMongoIdInArray(order);
}

//Get Review by user id and product id

export async function getReviewsByProductId(productId, userId) {
  await connectDB();

  if (!productId) return [];

  const reviews = await reviewModel
    .find({ product: productId })
    .populate({
      path: "user",
      model: "users",
      select: "name email",
    })
    .sort({ createdAt: -1 })
    .lean();

  if (!reviews) return [];

  let formattedReviews = replaceMongoIdInArray(reviews);

  if (userId) {
    formattedReviews = formattedReviews.sort((a, b) => {
      if (a.user?.id === userId) return -1;
      if (b.user?.id === userId) return 1;
      return 0;
    });
  }

  return formattedReviews;
}
