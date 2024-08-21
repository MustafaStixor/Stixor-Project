import { create } from "zustand";
import { Event, APIparameters } from "../types";
import { getData } from "../services";
import { persist, createJSONStorage } from "zustand/middleware";

interface Store {
  tableData: Event[];
  setTableData: (parameters: APIparameters) => void;
  upComingEventsTableData: Event[];
  setUpComingEventsTableData: (parameters: APIparameters) => void;
  favouriteEvents: Event[];
  setFavouriteEvents: (parameters: Event[]) => void;
  tableFilter: APIparameters;
  setTableFilter: (parameters: APIparameters) => void;
  eventOfTheMonth: Event | null;
  setEventOfTheMonth: (parameters: APIparameters) => void;
}

const useStore = create<Store>()(
  persist(
    (set) => ({
      tableData: [],
      setTableData: (parameters: APIparameters) => {
        getData(parameters).then((response) => {
          set((state) => ({
            tableData:
              parameters.offset === 0
                ? response.results
                : [...state.tableData, ...response.results],
          }));
        });
      },
      upComingEventsTableData: [],
      setUpComingEventsTableData: (parameters: APIparameters) => {
        getData(parameters).then((response) => {
          set((state) => ({
            upComingEventsTableData: [
              ...state.upComingEventsTableData,
              ...response.results,
            ],
          }));
        });
      },
      favouriteEvents: [],
      setFavouriteEvents: (parameters: Event[]) => {
        set((state) => ({
          favouriteEvents: parameters,
        }));
      },
      tableFilter: {
        limit: 10,
        offset: 0,
      },
      setTableFilter: (parameters: APIparameters) => {
        set((state) => ({
          tableFilter: { ...state.tableFilter, ...parameters },
        }));
      },
      eventOfTheMonth: null,
      setEventOfTheMonth: (parameters: APIparameters) => {
        getData(parameters).then((response) => {
          set({
            eventOfTheMonth: response.results[0],
          });
        });
      },
    }),
    {
      name: "my-app-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        favouriteEvents: state.favouriteEvents,
        tableFilter: state.tableFilter,
      }),
    }
  )
);

export { useStore };
