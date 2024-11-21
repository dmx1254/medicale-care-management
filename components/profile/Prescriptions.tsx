import React, { useState } from "react";
import { Download, FileText, EyeOff, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Medication, Prescription, formatDateTime } from "@/lib/utils";
import { Patient } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { handleDownload } from "@/lib/prescriptionPdf";

const PrescriptionCard: React.FC<{
  prescription: Prescription;
  onDownload: (prescription: Prescription) => void;
}> = ({ prescription, onDownload }) => {
  const router = useRouter();
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const toggleDetailsVisibility = async (prescriptionId: string) => {
    setIsDetailsVisible(!isDetailsVisible);
    const data = {
      prescriptionId,
    };

    const response = await axios.post("/api/prescriptions/update", data);
    if (response.data.sucessMessage) {
      router.refresh();
    }
  };

  return (
    <Card className="mb-6 border-dark-500 shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-bold text-green-500">
            Ordonnance - {formatDateTime(prescription.createdAt).dateOnly}
          </CardTitle>
          <p className="text-sm text-gray-500">
            {prescription.patient.name}, {prescription.patient.age} ans
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => toggleDetailsVisibility(prescription?._id)}
            title={
              isDetailsVisible ? "Masquer les détails" : "Afficher les détails"
            }
            className="border-dark-500 text-green-500"
          >
            {isDetailsVisible ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDownload(prescription)}
            title="Télécharger l'ordonnance"
            className="border-dark-500 text-blue-500"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      {isDetailsVisible && (
        <CardContent>
          <div className="space-y-4">
            {prescription.medications.map(
              (medication: Medication, index: number) => (
                <div
                  key={index}
                  className="bg-dark-400 p-3 rounded-lg border border-dark-500 hover:bg-dark-300 transition-colors"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-green-500">
                      {medication.name}
                    </h3>
                    <span className="text-sm text-green-500">
                      {medication.dosage}
                    </span>
                  </div>
                  <div className="text-sm text-white">
                    <p>
                      <strong className="">Fréquence:</strong>{" "}
                      {medication.frequency}
                    </p>
                    <p>
                      <strong className="">Durée:</strong> {medication.duration}
                    </p>
                    <p>
                      <strong className="">Instructions:</strong>{" "}
                      {medication.instructions}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

const Prescriptions: React.FC<{
  patient: Patient;
  prescriptions: Prescription[];
}> = ({ patient, prescriptions }) => {
  return (
    <div className="w-full py-6 max-w-4xl">
      <h1 className="text-xl font-bold mb-6 text-green-500">
        Historique des Ordonnances
        <span className="text-sm text-gray-500 ml-3">
          {patient.name} - {prescriptions.length} ordonnances
        </span>
      </h1>
      {prescriptions.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600">Aucune ordonnance disponible</p>
        </div>
      ) : (
        <div className="space-y-4">
          {prescriptions.map((prescription) => (
            <PrescriptionCard
              key={prescription._id}
              prescription={prescription}
              onDownload={() => handleDownload(prescription)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Prescriptions;
