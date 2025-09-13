

const OrderFilterBar = () => {
  return (
    <div className="flex items-center justify-between p-3 gap-4 rounded-lg w-full bg-white">
      {/* Left Section: Inputs & Filters */}
      <div className="flex items-center gap-2 w-full ">
        {/* Search Input */}
        {/* <div className="flex items-center border gap-4 border-gray-300 rounded-lg px-3 py-3 w-[70vw]">
          <TfiSearch className="text-gray-500" />
          <input
            type="text"
            value={search || ""}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="outline-none text-gray-700 "
          />
        </div> */}
      </div>
    
    </div>
  );
};

export default OrderFilterBar;
