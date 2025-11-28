import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface CountrySelectModalProps {
  open: boolean;
  onSelectCountry: (country: string) => void;
}

const countries = [
  { code: "al", name: "Shqipëri", flag: "🇦🇱" },
  { code: "xk", name: "Kosovë", flag: "🇽🇰" },
  { code: "mk", name: "Maqedoni e Veriut", flag: "🇲🇰" },
  { code: "me", name: "Mali i Zi", flag: "🇲🇪" },
];

export const CountrySelectModal = ({ open, onSelectCountry }: CountrySelectModalProps) => {
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-md [&>button]:hidden">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
              <MapPin className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-2xl text-center">Mirë se vini!</DialogTitle>
          <DialogDescription className="text-center text-base">
            Zgjidhni shtetin tuaj për të parë produktet e disponueshme në zonën tuaj
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3 pt-4">
          {countries.map((country) => (
            <Button
              key={country.code}
              variant="outline"
              size="lg"
              onClick={() => onSelectCountry(country.code)}
              className="h-auto py-6 flex flex-col gap-2 hover:border-primary hover:bg-primary/5 transition-smooth"
            >
              <span className="text-4xl">{country.flag}</span>
              <span className="font-semibold">{country.name}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
