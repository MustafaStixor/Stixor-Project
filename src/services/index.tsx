import { APIresponse, APIparameters } from "@/types";
import { eventsList, eventCount } from "./mocks";
require("dotenv");

const getData = async (params: APIparameters): Promise<APIresponse> => {
  try {
    const response = eventsList;
   
    const filteredAndSortedEvents = filterAndSortEvents(response, params);
    console.log(filteredAndSortedEvents, 111)
    console.log({count:filteredAndSortedEvents.length, result:filteredAndSortedEvents}, 222)
    return {count:filteredAndSortedEvents.length, result:filteredAndSortedEvents} as any;

  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getTotalEventsCount = async (
  params: APIparameters
): Promise<APIresponse> => {
  try {
    const response = eventCount;
    return response as any;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
function filterAndSortEvents(apiResponse: APIresponse, parameters: APIparameters): Event[] {
  const { results } = apiResponse;
  
  // Destructuring the API parameters for easier access
  const {
    "start.lte": startLte,
    "start.gte": startGte,
    category,
    limit,
    offset,
    sort,
    startDate,
    endDate,
    page,
  } = parameters;

  // Step 1: Filtering the results based on the parameters
  let filteredResults = results.filter((event) => {
    const eventStartDate = new Date(event.start);
    
    // Check start date range if provided
    if (startLte && eventStartDate > new Date(startLte)) {
      return false;
    }
    
    if (startGte && eventStartDate < new Date(startGte)) {
      return false;
    }
    
    // Filter by category if provided
    if (category && event.category !== category) {
      return false;
    }
    
    // Filter by date range if startDate and endDate are provided
    if (startDate && eventStartDate < startDate) {
      return false;
    }
    
    if (endDate && eventStartDate > endDate) {
      return false;
    }
    
    return true;
  });

  // Step 2: Sorting the filtered results
  if (sort) {
    // Example sorting: "rank" or "-rank" (ascending or descending)
    const sortKey = sort.startsWith("-") ? sort.slice(1) : sort;
    const isDescending = sort.startsWith("-");
    
    filteredResults.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return isDescending ? 1 : -1;
      if (a[sortKey] > b[sortKey]) return isDescending ? -1 : 1;
      return 0;
    });
  }

  // Step 3: Applying pagination if necessary
  let paginatedResults = filteredResults;

  if (page !== undefined && limit !== undefined) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    paginatedResults = filteredResults.slice(startIndex, endIndex);
  } else if (limit !== undefined && offset !== undefined) {
    paginatedResults = filteredResults.slice(offset, offset + limit);
  }
console.log(paginatedResults, 333)
  return paginatedResults;
}

export { getData, getTotalEventsCount };
