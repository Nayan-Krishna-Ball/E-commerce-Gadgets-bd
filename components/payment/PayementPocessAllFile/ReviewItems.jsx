import Image from "next/image";

const ReviewItems = ({ items }) => {
  return (
    <div className="border-b border-gray-300 py-6 hover:bg-gray-50 transition-colors rounded-lg px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-900 text-white text-sm">
            2
          </span>

          <span className="font-semibold text-lg">Review items</span>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-4">
        {items?.map((item) => (
          <div
            key={item._id}
            className="flex gap-4 pb-4 border-b border-gray-200 last:border-0"
          >
            <div className="w-24 h-24 bg-gray-50 flex items-center justify-center flex-shrink-0 rounded-md">
              <Image
                height={96}
                width={96}
                alt={item?.product?.title}
                src={item?.product?.images?.[0]?.url}
                className="h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-sm font-medium mb-1">
                {item?.product?.title}
              </h3>

              <p className="text-xs text-gray-500 mb-2">
                Sold by: Official {item?.shop?.name} Store
              </p>

              <div className="flex items-center gap-4">
                <p className="text-sm font-semibold text-orange-600">
                  ৳
                  {(item?.product?.price * item.quantity)?.toLocaleString(
                    "en-BD",
                  )}
                </p>

                <div className="flex items-center gap-2 text-xs">
                  <span>Qty:</span>
                  <span className="px-2 py-1 border rounded bg-gray-50">
                    {item.quantity}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewItems;
