import Image from "next/image";


const UploadProdImage = ({ disabled, productImages, setProductImages }: { disabled: boolean, productImages: File[], setProductImages: React.Dispatch<React.SetStateAction<File[]>> }) => {

   const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const files = Array.from(e.target.files);
      if (!files) return;
  
      files.map((file, index) => {
        if (index == 3) return;
        setProductImages((prev) => [...prev, file]);
      });
    };

  return (
    <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-800">
      Product Image
    </label>
    <div>
      <input
        type="file"
        name="file"
        multiple
        accept="image/*"
        disabled={disabled}
        maxLength={10}
        onChange={handleImage}
        className="py-2 focus:outline-none text-gray-700 border border-gray-200 p-2 rounded-md"
      />
    </div>
    <div className="flex gap-2">
      {productImages &&
        productImages.map((image, index) => (
          <div key={`${index}-image`}>
            <Image
              alt=""
              src={URL.createObjectURL(image)}
              className="h-32 w-32 object-cover bg-gray-100"
              width={100}
              height={100}
            />
          </div>
        ))}
    </div>
  </div>
  )
}

export default UploadProdImage
