"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const ChangePasswordForm = ({ user }) => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { oldPassword, newPassword, confirmPassword } = form;

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/user/change-password", {
        method: "POST",
        body: JSON.stringify({
          userId: user.id,
          oldPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setForm({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        toast.success("Password updated");
      } else {
        toast.error(data.error);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg bg-white p-6">
      <h2 className="text-lg font-bold mb-4">Change Password</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Current Password</label>
          <input
            name="oldPassword"
            type="password"
            value={form.oldPassword}
            onChange={handleChange}
            className="w-full mt-1 border rounded px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="text-sm font-medium">New Password</label>
          <input
            name="newPassword"
            type="password"
            className="w-full mt-1 border rounded px-3 py-2 text-sm"
            value={form.newPassword}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full mt-1 border rounded px-3 py-2 text-sm"
          />
        </div>

        <button
          disabled={loading}
          className="bg-amazon-yellow hover:bg-amazon-yellow_hover border border-amazon-secondary px-4 py-2 rounded text-sm font-bold"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
