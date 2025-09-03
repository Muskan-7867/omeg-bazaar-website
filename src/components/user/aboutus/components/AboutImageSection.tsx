export const AboutImageSection = () => {
  const text = "ABOUT US".split("");

  return (
    <div className="relative h-64 md:h-96 w-full mb-16 bg-gradient-to-r from-[#131921] to-[#232F3E] flex justify-center items-center">
      <div className="flex">
        {text.map((char, index) =>
          char === " " ? (
            <div key={index} className="w-8" />
          ) : (
            <span
              key={index}
              className="text-white text-[40px] lg:text-[80px] md:text-[100px] cursor-pointer font-bold"
            >
              {char}
            </span>
          )
        )}
      </div>
    </div>
  );
};
