import { getAllLocationsApi } from "@/lib/getSearchApi";
import { useQuery } from "@tanstack/react-query";

interface LocationProps {
  data: {
    id: number;
    name: string;
  }[];
}

export function useAllLocations() {
  const { data: allLocations, isLoading } = useQuery<LocationProps>({
    queryKey: ["allLocations"],
    queryFn: () => getAllLocationsApi(),
  });



  return {
    allLocations,
    isLoading,
  };
}
