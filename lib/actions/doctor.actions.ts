// import { DoctorCreating } from "@/types";
// import { createNewDoctor, getDocteurAndDetails } from "../api/doctor";
// import { parseStringify } from "../utils";
// import { revalidatePath } from "next/cache";

// export async function getAllDoctors() {
//   try {
//     const docteursAndDetails = await getDocteurAndDetails();
//     return parseStringify(docteursAndDetails);
//   } catch (error) {
//     console.error(error);
//   }
// }

// export async function createDoctor(doctorData: DoctorCreating) {
//   try {
//     const response = await createNewDoctor(doctorData);
//     if (!response.user) {
//       return response;
//     }

//     revalidatePath("/dashboard/docteurs");
//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// }
