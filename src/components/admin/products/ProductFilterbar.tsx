import Category from "@/components/user/products/Category";
import { useQueryState } from "nuqs";
import { TfiSearch } from "react-icons/tfi";


const ProductFilterBar = () => {
  const [search, setSearch] = useQueryState("search");
  
  return (
    <div className="flex flex-col md:flex-row items-stretch gap-3 p-3 rounded-lg w-full bg-white">
      {/* Search Input */}
      <div className="flex-1 flex items-center border gap-3 border-gray-300 rounded-lg px-3 py-2">
        <TfiSearch className="text-gray-500 flex-shrink-0" />
        <input
          type="text"
          value={search || ""}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="flex-1 outline-none text-gray-700 bg-transparent min-w-[50px]"
        />
      </div>
      
      <Category />
    </div>
  );
};

export default ProductFilterBar;