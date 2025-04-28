import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [text, setText] = useState("");
  const [filteredResults, setfilteredResults] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [servingsFilter, setServingsFilter] = useState("");
  const [mealTypeFilter, setMealTypeFilter] = useState("");
  const [sortOptions, setSortOptions] = useState(""); // new state for sorting options

  const fetchApi = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/recipes");
      const data = await response.json();
      console.log(data);
      setResults(data.recipes);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  // Debounce logic for optimized searching
  // Search on the basis of name, cuisines, tags
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Filtering happening for text:", text);
      if (text.trim() === "") {
        setfilteredResults(results);
      } else {
        const filtered = results.filter((res) => {
          const searchedText = text.toLowerCase();
          const nameMatch = res.name.toLowerCase().includes(searchedText);
          const cuisineMatch = res.cuisine.toLowerCase().includes(searchedText);
          const tagsMatch = res.tags.some((tag) =>
            tag.toLowerCase().includes(searchedText)
          );

          return nameMatch || cuisineMatch || tagsMatch;
        });
        setfilteredResults(filtered);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [text, results]);

  // sorting function
  const sortResults = (option) => {
    let sortedResults = [...filteredResults];

    if (option === "servingAsc") {
      sortedResults.sort((a, b) => a.servings - b.servings);
    } else if (option === "servingDesc") {
      sortedResults.sort((a, b) => b.servings - a.servings);
    } else if (option === "caloriesAsc") {
      sortedResults.sort((a, b) => a.caloriesPerServing - b.caloriesPerServing);
    } else if (option === "caloriesDesc") {
      sortedResults.sort((a, b) => b.caloriesPerServing - a.caloriesPerServing);
    } else if (option === "ratingAsc") {
      sortedResults.sort((a, b) => a.rating - b.rating);
    } else if (option === "ratingDesc") {
      sortedResults.sort((a, b) => b.rating - a.rating);
    }

    setfilteredResults(sortedResults);
  };

  useEffect(() => {
    sortResults(sortOptions); // Apply sorting when the option changes
  }, [sortOptions]);

  // Filter Logic based on selected filters
  useEffect(() => {
    let filtered = results;

    // Difficulty Filter Logic
    if (difficultyFilter) {
      filtered = filtered.filter((res) => res.difficulty === difficultyFilter);
    }

    // Rating Filter Logic
    if (ratingFilter) {
      filtered = filtered.filter((res) => {
        const rating = res.rating;
        if (ratingFilter === "4-4.5") {
          return rating >= 4 && rating <= 4.5;
        } else if (ratingFilter === "4.6-5") {
          return rating > 4.5 && rating <= 5;
        }
        return true;
      });
    }

    // Servings Filter Logic
    if (servingsFilter) {
      filtered = filtered.filter((res) => {
        const servings = res.servings;
        if (servingsFilter === "1-3") {
          return servings >= 1 && servings <= 3;
        } else if (servings === "4-6") {
          return servings >= 4 && servings <= 6;
        } else if (servings === "7-10") {
          return servings >= 7 && servings <= 10;
        }
        return true;
      });
    }

    // Meal Type Filter
    if (mealTypeFilter) {
      filtered = filtered.filter((res) =>
        res.mealType.includes(mealTypeFilter)
      );
    }

    setfilteredResults(filtered);
  }, [difficultyFilter, ratingFilter, servingsFilter, mealTypeFilter, results]);

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "50px",
          fontWeight: "bold",
          height: "100vh",
        }}
      >
        Loading.....
      </div>
    );

  if (error)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "50px",
          fontWeight: "bold",
          height: "100vh",
        }}
      >
        {error}
      </div>
    );

  return (
    <div style={{ background: "lightblue" }}>
      <div
        style={{
          width: "1200px",
          // border: "1px solid black",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search Recipies Name, Cuisine and tags"
          style={{
            height: "30px",
            width: "300px",
            borderRadius: "5px",
            fontSize: "20px",
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/*Filter Sections*/}
        <div>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            style={{
              height: "30px",
              width: "150px",
              borderRadius: "5px",
              fontSize: "20px",
            }}
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            style={{
              height: "30px",
              width: "150px",
              borderRadius: "5px",
              fontSize: "20px",
            }}
          >
            <option value="">Select Rating Range</option>
            <option value="4-4.5">4 - 4.5</option>
            <option value="4.6-5">4.6 - 5</option>
          </select>

          <select
            value={servingsFilter}
            onChange={(e) => setServingsFilter(e.target.value)}
            style={{
              height: "30px",
              width: "150px",
              borderRadius: "5px",
              fontSize: "20px",
            }}
          >
            <option value="">Select Servings Range</option>
            <option value="1-3">1 - 3</option>
            <option value="4-6">4 - 6</option>
            <option value="7-10">7 - 10</option>
          </select>

          <select
            value={mealTypeFilter}
            onChange={(e) => setMealTypeFilter(e.target.value)}
            style={{
              height: "30px",
              width: "150px",
              borderRadius: "5px",
              fontSize: "20px",
            }}
          >
            <option value="">Select Meal Type</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>

          {/* Sorting Functionality */}
          <select
            value={sortOptions}
            onChange={(e) => setSortOptions(e.target.value)}
            style={{
              height: "30px",
              width: "150px",
              borderRadius: "5px",
              fontSize: "20px",
            }}
          >
            <option value="">Sort By</option>
            <option value="servingAsc">Servings : Low to High</option>
            <option value="servingDesc">Servongs : High to Low</option>
            <option value="caloriesAsc">Calories : Low to High</option>
            <option value="caloriesDesc">Calories : High to Low</option>
            <option value="ratingAsc">Rating : Low to High</option>
            <option value="ratingDesc">Rating : High to Low</option>
          </select>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          padding: "20px",
          margin: "auto",
          background: "lightblue",
        }}
      >
        {filteredResults.length > 0 &&
          filteredResults.map((result) => {
            return (
              <div
                key={result.id}
                style={{
                  padding: "15px",
                  border: "2px solid blue",
                  borderRadius: "5px",
                }}
              >
                <img
                  src={result.image}
                  alt={result.name}
                  style={{ height: "300px", width: "100%" }}
                />
                <h2>{result.name}</h2>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "15px",
                  }}
                >
                  <h3 style={{ fontWeight: "bold", color: "red" }}>
                    Difficulty : {result.difficulty}
                  </h3>
                  <h3 style={{ fontWeight: "bold", color: "red" }}>
                    Cuisine : {result.cuisine}
                  </h3>
                </div>

                <h2>
                  Tags🏷️{" "}
                  {result.tags.map((el, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        gap: "5px",
                        flexWrap: "wrap",
                        marginTop: "5px",
                      }}
                    >
                      <span
                        style={{
                          padding: "6px 12px",
                          backgroundColor: "#f0f9ff",
                          borderRadius: "16px",
                          fontSize: "14px",
                          color: "#0369a1",
                          border: "1px solid #0ea5e9",
                          display: "inline-block",
                          fontWeight: "500",
                          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                          transition: "all 0.2s ease",
                          cursor: "pointer",
                        }}
                      >
                        {el}
                      </span>
                    </div>
                  ))}
                </h2>

                <h3 style={{ color: "darkred" }}>
                  Rating : {result.rating} / 5 ⭐
                </h3>
                <button
                  style={{
                    padding: "5px",
                    borderRadius: "5px",
                    fontSize: "20px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    width: "100%",
                    marginTop: "10px",
                  }}
                >
                  Please Click Here To See Details
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
