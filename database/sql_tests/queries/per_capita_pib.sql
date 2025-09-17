SELECT top 10 name, ROUND(gdp/population,2) AS per_capita_pib
FROM world
ORDER BY per_capita_pib DESC;
-- 10 countries with the highest per capita GDP
-- For MySQL use LIMIT 10 at the end instead of TOP 10

