import ApiClient from "@/api";
import { isEmpty } from "@/utils/common";
import { ref } from "vue";

export interface Facility {
  name: string;
  uuid: string;
  id: number;
};

const facility = ref<Facility>({
  name: "Mimosa Facility",
  uuid: "",
  id: 413
});

// const facilities = ref<Array<Facility>>([]);

async function loadFacilities(filter = "", page = 1, limit = 800): Promise<Facility[]> {
  const facilities = await ApiClient.getJson<Array<any>>('locations', {
    page,
    name: filter,
    page_size: limit
  })

  return facilities.map(facility => ({
    name: facility.name,
    uuid: facility.uuid,
    id: facility.location_id
  }))
}

export default function useFacility() {
  return {
    facility,
    loadFacilities,
  }
}
