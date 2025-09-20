export const AboutImageSection = () => {
  const text = "ABOUT US".split("");

  return (
    <div className="relative h-[10rem] md:h-[14rem] w-full mb-16 bg-gradient-to-r from-[#131921] to-[#232F3E] flex justify-center items-center">
      <div className="flex">
        {text.map((char, index) =>
          char === " " ? (
            <div key={index} className="w-8" />
          ) : (
            <span
              key={index}
              className="text-white text-[40px] lg:text-[65px] md:text-[100px] cursor-pointer font-semibold"
            >
              {char}
            </span>
          )
        )}
      </div>
    </div>
  );
};
