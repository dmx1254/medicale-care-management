"use client";

import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Hospital } from "lucide-react";
import MapWithNearbyPlaces from "./MapWithNearbyPlaces";

const Maps = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <Hospital className="text-light-200" />
        </Button>
      </DialogTrigger>
      <DialogContent
        isShowIcon={false}
        className="w-full max-w-7xl h-[90vh] flex flex-col bg-dark-400 text-light-200"
      >
        <MapWithNearbyPlaces />
      </DialogContent>
    </Dialog>
  );
};

export default Maps;
