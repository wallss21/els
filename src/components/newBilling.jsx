import React from "react";
import Header from "./shared/header";

function NewBilling() {
  return (
    <div>
      <Header />

      <label
        for="billing-address"
        className="mt-4 mb-2 block text-sm font-medium"
      >
        Billing Address
      </label>
      <div className="flex flex-col sm:flex-row">
        <div className="relative flex-shrink-0 sm:w-7/12">
          <input
            type="text"
            id="billing-address"
            name="billing-address"
            className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Street Address"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <img
              className="h-4 w-4 object-contain"
              src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg"
              alt=""
            />
          </div>
        </div>
        <select
          type="text"
          name="billing-state"
          className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="State">State</option>
        </select>
        <input
          type="text"
          name="billing-zip"
          className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
          placeholder="ZIP"
        />
      </div>
    </div>
  );
}

export default NewBilling;
