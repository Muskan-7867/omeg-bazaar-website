export const AboutValue = () => {
  return (
    <div className="py-16 w-full bg-[#F9F9F9]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#131921] mb-4">
            Our Core Values
          </h2>
          <p className="text-[#555] max-w-2xl mx-auto">
            These principles guide everything we do at Omeg Bazaar
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Customer Obsession",
              description:
                "We start with the customer and work backwards. We work vigorously to earn and keep customer trust.",
              icon: "❤️",
              color: "bg-white border-t-4 border-[#FF9900]"
            },
            {
              title: "Ownership",
              description:
                "Leaders are owners. They think long term and don't sacrifice long-term value for short-term results.",
              icon: "🏆",
              color: "bg-white border-t-4 border-[#232F3E]"
            },
            {
              title: "Innovation",
              description:
                "We expect and require innovation and invention from our teams and always find new ways to delight customers.",
              icon: "💡",
              color: "bg-white border-t-4 border-[#FF9900]"
            }
          ].map((item, index) => (
            <div
              key={index}
              className={`${item.color} p-8 rounded shadow-sm hover:shadow-md transition-all h-full`}
            >
              <div className="flex flex-col justify-center items-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-[#131921] mb-3">
                  {item.title}
                </h3>
              </div>

              <p className="text-[#555]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
