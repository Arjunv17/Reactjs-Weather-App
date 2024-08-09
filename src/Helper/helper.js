export const weatherTimeFormator = (sunrise, sunset) => {

    // Convert Unix timestamp to milliseconds
    const sunriseDate = new Date(sunrise * 1000);
    const sunsetDate = new Date(sunset * 1000);

    // Format sunrise and sunset times in IST (Indian Standard Time)
    const options = {
        timeZone: 'Asia/Kolkata', // Time zone for IST
        hour: '2-digit',
        minute: '2-digit',
        hour12: true  // Use 12-hour format
    };

    const sunriseTime = sunriseDate.toLocaleString('en-IN', options);
    const sunsetTime = sunsetDate.toLocaleString('en-IN', options);

    // Format the time as per the options
    let now = new Date()
    const timeInIST = now.toLocaleTimeString('en-US', options);

    console.log('Sunrise time (IST):', sunriseTime);
    console.log('Sunset time (IST):', sunsetTime);
    console.log('Time:', timeInIST);

    return { sunriseTime, sunsetTime, timeInIST }
}


export const recent5searches = (city) => {

    let searches = JSON.parse(localStorage.getItem('recentSearches')) || [];

    searches.unshift(city);

    searches = searches.slice(0,5)

    localStorage.setItem("recentSearches" , JSON.stringify(searches))
    console.log(searches,"sdhgdhfbsd>>>>>>>>>>>>")
    return searches;
}