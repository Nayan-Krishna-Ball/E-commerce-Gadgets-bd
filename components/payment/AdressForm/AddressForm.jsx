"use client";

export default function AddressForm({ address, setAddress }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <input
        value={address.address}
        onChange={(e) => setAddress({ ...address, address: e.target.value })}
        placeholder="Street address"
        className="col-span-2 border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <input
        value={address.city}
        onChange={(e) => setAddress({ ...address, city: e.target.value })}
        placeholder="City"
        className="border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <input
        value={address.postalCode}
        onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
        placeholder="Postal code"
        className="border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <input
        value={address.phone}
        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
        placeholder="Phone number"
        className="col-span-2 border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
}
