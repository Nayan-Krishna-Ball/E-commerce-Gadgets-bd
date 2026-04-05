//

import { Star, StarHalf, StarOff } from "lucide-react";

export default function Rating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => {
        const starNumber = i + 1;

        if (rating >= starNumber) {
          return (
            <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
          );
        } else if (rating >= starNumber - 0.5) {
          return (
            <StarHalf
              key={i}
              className="w-4 h-4 text-yellow-500 fill-current"
            />
          );
        } else {
          return <StarOff key={i} className="w-4 h-4 text-gray-300" />;
        }
      })}
    </div>
  );
}
