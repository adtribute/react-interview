import React, { useState, FormEvent, ChangeEvent } from "react";
import "./styles.css";

type LunchFormData = {
  yourName: string;
  meal: string;
  drink?: string;
  recurring: boolean;
  repeatFrequency: string;
};

export default function App() {
  const [formData, setFormData] = useState<LunchFormData>({
    yourName: "",
    meal: "",
    recurring: false,
    repeatFrequency: "",
    drink: "",
  });

  const [error, setError] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  function validate(data: LunchFormData): boolean {
    let hasError: boolean = false;

    if (!data.yourName) {
      hasError = true;
    }

    if (!data.meal) {
      hasError = true;
    }

    if (data.recurring && !data.repeatFrequency) {
      hasError = true;
    }

    return !hasError;
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const isFormValid = validate(formData);
    if (!isFormValid) {
      setError("Validation error");
      return;
    }

    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <div style={{ margin: 40 }}>
        <h2>Submitted!</h2>
        <p>Your lunch order is on its way.</p>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Lunch Order Form</h1>
      <p>This form contains intentional UX issues. Have fun fixing it!</p>

      <form>
        <div>
          <label htmlFor="yourName">
            Your Name:
            <input
              id="yourName"
              name="yourName"
              type="text"
              value={formData.yourName}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label htmlFor="meal">
            Choose a Meal:
            <select
              id="meal"
              name="meal"
              value={formData.meal}
              onChange={handleChange}
            >
              <option value="Pizza">Pizza</option>
              <option value="Salad">Salad</option>
              <option value="Sushi">Sushi</option>
            </select>
          </label>
        </div>

        <div className="drinks-section">
          Choose a drink (optional):
          <label>
            <input
              type="radio"
              name="drink"
              value="orangejuice"
              checked={formData.drink === "orangejuice"}
              onChange={handleChange}
            />{" "}
            Orange Juice
          </label>
          <label>
            <input
              type="radio"
              name="drink"
              value="milk"
              checked={formData.drink === "milk"}
              onChange={handleChange}
            />{" "}
            Milk
          </label>
          <label>
            <input
              type="radio"
              name="drink"
              value="coke"
              checked={formData.drink === "coke"}
              onChange={handleChange}
            />{" "}
            Coca Cola
          </label>
          <label>
            <input
              type="radio"
              name="drink"
              value="tea"
              checked={formData.drink === "tea"}
              onChange={handleChange}
            />{" "}
            Tea
          </label>
          <label>
            <input
              type="radio"
              name="drink"
              value="sprite"
              checked={formData.drink === "sprite"}
              onChange={handleChange}
            />{" "}
            Sprite
          </label>
          <label>
            <input
              type="radio"
              name="drink"
              value="water"
              checked={formData.drink === "water"}
              onChange={handleChange}
            />{" "}
            Water
          </label>
        </div>

        <div>
          <label htmlFor="recurring">
            Make this a recurring order?
            <input
              id="recurring"
              name="recurring"
              type="checkbox"
              checked={formData.recurring}
              onChange={handleChange}
            />
          </label>
        </div>

        {formData.recurring && (
          <div>
            <label htmlFor="repeatFrequency">
              Repeat Frequency:
              <select
                id="repeatFrequency"
                name="repeatFrequency"
                value={formData.repeatFrequency}
                onChange={handleChange}
              >
                <option value="">-- Select an option --</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </label>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <button onClick={handleSubmit}>Submit Order</button>
      </form>
    </div>
  );
}
