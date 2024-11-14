import { NextResponse } from "next/server";
import PatientModel from "@/lib/models/patient.model";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // console.log(data);

    if (!data.userId) return NextResponse.json({ userIdError: "Id invalide" });

    await PatientModel.findByIdAndUpdate(
      data.userId,
      {
        $set: {
          online: data.online,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return NextResponse.json({
      successMessage: "Status mis à jour avec succès",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
