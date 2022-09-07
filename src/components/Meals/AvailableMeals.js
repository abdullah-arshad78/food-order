import React, { useEffect, useState } from "react";
import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";

import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchMeals = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://food-order-18bb0-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();
      const dataKeyVals = Object.entries(data);
      const fetchedMeals = dataKeyVals.map((item) => {
        return { ...item[1], id: item[0] };
      });
      setMeals(fetchedMeals);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };
  useEffect(() => {
    fetchMeals();
  }, []);
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      name={meal.name}
      price={meal.price}
      description={meal.description}
      id={meal.id}
    />
  ));
  let content = mealsList;
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  return (
    <section className={styles.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
