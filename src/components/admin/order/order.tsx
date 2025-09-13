"use client"
import OrderSummary from '@/components/admin/order/components/orderSummary';
import OrderTableForAdmin from '@/components/admin/order/components/OrderTableForAdmin';
import SingleOrderProd from '@/components/admin/order/components/SingleOrderProd';
import { useSingleOrderStore } from '@/lib/store/product/Table.store';

import React from 'react'

export default function Order() {
  const { showSingleOrder } = useSingleOrderStore();

  return (
   <div className="w-full min-h-screen mt-2  border-2 border-gray-100 py-7 px-8 overflow-y-scroll scrollbar-hide">
      <div className="shadow-lg pl-14 py-6 pr-8 rounded-2xl border border-gray-50 bg-[#FFFFFF]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[24px] font-medium text-[#333333]  underline decoration-solid leading-[36px] font-poppins">
            Order Details
          </h3>
        </div>
        <OrderSummary />

        <OrderTableForAdmin />
      </div>
      {showSingleOrder && <SingleOrderProd />}
    </div>
  )
}

