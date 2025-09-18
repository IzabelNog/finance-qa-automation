SELECT name, capital, 
    ROUND(gdp/1000000000, 2) AS gdp_in_billion
FROM world
WHERE LEFT(name,1) = LEFT(capital,1) 
  AND name <> capital;

-- Countries where the name starts with the same letter as its capital
