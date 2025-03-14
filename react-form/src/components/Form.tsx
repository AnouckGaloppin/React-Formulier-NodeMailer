import { useForm, Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { FormData } from "../types/formType";

const Form = () => {
  const { register, handleSubmit, control } = useForm<FormData>();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data: FormData) => {
    const response = await fetch("http://localhost:5000/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setSubmitted(true);
    }
  };
  return (
    <div className="form-container">
      <h2>Formulier</h2>
      {submitted ? (
        <p>Formulier succesvol verzonden!</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="firstname">Voornaam:</label>
          <input {...register("firstname")} />
          <label htmlFor="lastname">Achternaam:</label>
          <input {...register("lastname")} />
          <label htmlFor="birthDate">Geboortedatum:</label>
          <Controller
            name="birthDate"
            control={control}
            render={({ field }) => <DatePicker {...field} />}
          />
          <label htmlFor="hairColor">Haarkleur:</label>
          <input type="color" {...register("hairColor")} />
          <label htmlFor="height">Lengte:</label>
          <input {...register("height")} />
          <Controller
            name="gender"
            control={control}
            defaultValue="Man"
            render={({ field }) => (
              <div className="radio-group">
                <label htmlFor="gender">Geslacht:</label>
                <label>
                  <input
                    type="radio"
                    value="Man"
                    checked={field.value === "Man"}
                    onChange={field.onChange}
                  />{" "}
                  Man
                </label>
                <label>
                  <input
                    type="radio"
                    value="Vrouw"
                    checked={field.value === "Vrouw"}
                    onChange={field.onChange}
                  />{" "}
                  Vrouw
                </label>
              </div>
            )}
          />
          <label htmlFor="remarks">Opmerkingen:</label>
          <input type="textarea" {...register("remarks")} />
          <button type="submit">Verzenden</button>
        </form>
      )}
    </div>
  );
};

export default Form;
