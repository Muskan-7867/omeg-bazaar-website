import { ProductImage } from "@/lib/types/Product";
import { motion } from "framer-motion";
import Image from "next/image";


interface TableImageRenderProps {
  images: ProductImage[];
}

const TableImageRender: React.FC<TableImageRenderProps> = ({ images }) => {
  return (
    <motion.div
      layoutId={images[0]?.publicId}
      className="flex justify-center items-center"
    >
      <Image src={images[0]?.url} alt="" height={100} width={100} className="w-14 aspect-square object-cover"  />
    </motion.div>
  );
};

export default TableImageRender;
