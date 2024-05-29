import React, { useEffect } from "react";
import heic2any from "heic2any";
import { createDataURL } from "../../utils/FileReader";

interface InputValues {
  roastingCompany: string;
  coffeeName: string;
}

interface InputError {
  roastingCompany: boolean;
  coffeeName: boolean;
}

interface Props {
  open: boolean;
  handleCancel: () => void;
  handleSubmit: (coffeeName: string, image: File) => Promise<void>;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  imageURL: string | undefined;
  error: string | undefined;
  coffeeName: string | undefined;
  roastingCompany: string | undefined;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
}

const useCoffeeDialogContent = (
  props: Props,
): [
  string | undefined,
  InputValues,
  InputError,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  (e: React.FormEvent<HTMLFormElement>) => void,
  () => void,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
] => {
  const [imageURL, setImageURL] = React.useState<string | undefined>();
  const [input, setInput] = React.useState<InputValues>({
    roastingCompany: "",
    coffeeName: "",
  });
  const [image, setImage] = React.useState<File | undefined>();
  const [inputError, setInputError] = React.useState<InputError>({
    roastingCompany: false,
    coffeeName: false,
  });

  const convertHEICtoPNG = async (file: File): Promise<File> => {
    const startTime = new Date();

    const png = await heic2any({
      blob: file,
      toType: "image/png",
      quality: 0.5,
    });

    const endTime = new Date();
    const elapsedTime = endTime.getTime() - startTime.getTime();

    console.log(`Converted HEIC to PNG in ${elapsedTime} milliseconds`);

    let png_file: File;
    if (png instanceof Blob && Array.isArray(png) === false) {
      png_file = new File([png], "image.png", { type: "image/png" });
      return png_file;
    } else {
      const blob_array = png as Blob[];

      png_file = new File(blob_array, "image.png", { type: "image/png" });
      return png_file;
    }
  };

  const handleCoffeeInputNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    console.log("Target: ", e.target.value);
    setInput({ ...input, coffeeName: e.target.value });
    if (props.error) {
      props.setError(undefined);
      setInputError((prev) => ({ ...prev, coffeeName: false }));
    }
  };

  const handleRoastingCompanyInputNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInput({ ...input, roastingCompany: e.target.value });
    if (props.error) {
      props.setError(undefined);
      setInputError((prev) => ({ ...prev, roastingCompany: false }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Preparing to submit coffee");
    console.log("Image: ", image);

    console.log("Submitting ", input);

    props.handleSubmit(input.coffeeName, image as File);
  };

  const handleCancel = () => {
    props.handleCancel();
    setInput({ roastingCompany: "", coffeeName: "" });
    props.setError(undefined);
    props.setLoading(false);
    setImage(undefined);
    setImageURL(undefined);
  };

  // Event handler for file input change
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    console.log("File change");
    let file: File;
    if (event.target.files && event.target.files?.length != 0) {
      console.log(event.target.files?.length);
      const filetype = event.target.files[0].type;
      if (filetype === "image/heic") {
        console.log("Converting HEIC to PNG");
        file = await convertHEICtoPNG(event.target.files[0]);
      } else {
        file = event.target.files[0];
      }
      setImage(file);
      setImageURL(await createDataURL(file));
    }
  };

  useEffect(() => {
    // console.log("Rerendering CoffeeDialog");

    if (props.imageURL) {
      setImageURL(props.imageURL);
    } else {
      setImage(undefined);
      setImageURL(undefined);
    }

    if (props.coffeeName && props.roastingCompany) {
      setInput({
        coffeeName: props.coffeeName,
        roastingCompany: props.roastingCompany,
      });
    } else {
      setInput({ roastingCompany: "", coffeeName: "" });
    }
  }, [props.imageURL, props.coffeeName, props.open, props.roastingCompany]);

  return [
    imageURL,
    input,
    inputError,
    handleCoffeeInputNameChange,
    handleRoastingCompanyInputNameChange,
    handleSubmit,
    handleCancel,
    handleFileChange,
  ];
};

export { useCoffeeDialogContent };
