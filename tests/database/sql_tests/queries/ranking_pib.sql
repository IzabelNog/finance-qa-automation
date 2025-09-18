SELECT TOP 15 name, ROUND(gdp/1000000000, 2) AS gdp_in_billion
FROM world
ORDER BY gdp DESC
-- 15 countries with the highest GDP
-- For MySQL use LIMIT 15 at the end instead of TOP 15
