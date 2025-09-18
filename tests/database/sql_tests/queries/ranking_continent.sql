SELECT continent, 
       ROUND(SUM(gdp)/1000000000, 2) AS total_gdp, 
       ROUND(SUM(population)/1000000000, 2) AS total_population
FROM world
GROUP BY continent
ORDER BY total_gdp DESC;
-- Ranking of continents by total GDP
