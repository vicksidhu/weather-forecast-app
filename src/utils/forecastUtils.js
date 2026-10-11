export function getDailyForecast(forecastData) {
    if (!forecastData?.list) {
        return [];
    }

    //Group forecast entries by calendar date.
    const grouped = forecastData.list.reduce((days, item) => {
        const date = item.dt_txt.split(" ")[0];

        if (!days[date]) {
            days[date] = [];
        }

        days[date].push(item);
        return days;
    },
{});

//Select one forecast entry closest to noon for each date.
return Object.entries(grouped)
.slice(0,5)
.map(([date, entries]) => {
    const representative = entries.reduce((best, entry) => {
        const hour = Number(entry.dt_txt.slice(11, 13));
        const bestHour = Number(best.dt_txt.slice(11, 13));

        const distanceFromNoon = Math.abs(hour - 12);
        const bestDistanceFromNoon = Math.abs(bestHour - 12);

        return distanceFromNoon < bestDistanceFromNoon
        ? entry
        : best;
    });

    return {
        date,
        temperature: representative.main.temp,
        description: representative.weather[0].description,
        icon: representative.weather[0].icon,
        humidity: representative.main.humidity,
    };
});
}