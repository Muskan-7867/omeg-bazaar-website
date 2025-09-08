import { LiaRupeeSignSolid } from "react-icons/lia"
interface SummaryDetailsProps {
  subtotal: number,
  deliveryCharge: number,
  total: number
}

const SummaryDetails = ({subtotal, deliveryCharge, total} : SummaryDetailsProps) => {

  return (
      <div className="flex flex-col border border-gray-200 rounded-lg mb-6">
          <div className="flex flex-col rounded-md p-4 gap-2">
            <div className="flex justify-between items-center">
              <p className="text-md font-normal font-serif">Subtotal:</p>
              <div className="flex items-center">
                <LiaRupeeSignSolid />
                <span className="text-sm">{subtotal}/-</span>
              </div>
            </div>
            <div className="flex justify-between items-center border-b border-gray-300 pb-2">
              <p className="text-md font-normal font-serif">Delivery:</p>
              <div className="flex items-center">
                <LiaRupeeSignSolid />
                <span className="text-sm">{deliveryCharge}/-</span>
              </div>
            </div>
            <div className="flex justify-between pt-2">
              <p className="text-md font-normal font-serif">Total:</p>
              <div className="flex items-center">
                <LiaRupeeSignSolid />
                <span className="text-sm">{total}/-</span>
              </div>
            </div>
          </div>
        </div>
  )
}

export default SummaryDetails
