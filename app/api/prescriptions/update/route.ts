import { connectDB } from "@/lib/db";
import PrescriptionModel from "@/lib/models/prescriptions.models";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

connectDB();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const prescriptionId = data.prescriptionId;
    const response = await PrescriptionModel.findByIdAndUpdate(
      prescriptionId,
      {
        $set: {
          read: true,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    revalidatePath(`patients/${response.response}/profile`);
    return NextResponse.json({
      sucessMessage: "Read status are successfully updated",
    });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
