import { useState, type FormEvent } from "react";

interface AssetFormProps {
  onCreate: (name: string) => void;
}

export function AssetForm({ onCreate }: AssetFormProps) {
  const [name, setName] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedName = name.trim();
    if (!normalizedName) {
      return;
    }

    onCreate(normalizedName);
    setName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="asset-name">Asset name</label>
      <input
        id="asset-name"
        name="asset-name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button type="submit">Add Asset</button>
    </form>
  );
}
