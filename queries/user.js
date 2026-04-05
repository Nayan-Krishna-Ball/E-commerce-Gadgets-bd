//

import { userModel } from "@/models/User";
import { replaceMongoIdInObject } from "@/utils/replaceId";

export async function getUserByUserId(email) {
  try {
    const filter = { email: email };
    const user = await userModel.findOne(filter).lean();

    return replaceMongoIdInObject(user);
  } catch (error) {
    console.log(error);
  }
}
