"use client";

export default function AddressDisplay({ address }) {
  return (
    <div className="space-y-1 text-gray-700">
      <p className="font-semibold">{address.name}</p>

      <p>{address.address}</p>

      <p>
        {address.city} {","} {address.postalCode}
      </p>
      <p className="text-gray-600">Phone: {address.phone}</p>
      <p>{address.country}</p>
    </div>
  );
}
