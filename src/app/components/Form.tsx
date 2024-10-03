import { useState } from "react";

interface FormProps {
  onCitySubmit: (city: string) => void;
}

const Form: React.FC<FormProps> = ({ onCitySubmit }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Ville soumise : ", city);
    if (city.trim() !== "") {
      onCitySubmit(city);
      setCity("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Entrez une ville"
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Obtenir la météo
      </button>
    </form>
  );
};

export default Form;
