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
  { code: "af", name: "Afganistan", flag: "🇦🇫" },
  { code: "al", name: "Shqipëri", flag: "🇦🇱" },
  { code: "dz", name: "Algjeri", flag: "🇩🇿" },
  { code: "ad", name: "Andorrë", flag: "🇦🇩" },
  { code: "ao", name: "Angolë", flag: "🇦🇴" },
  { code: "ar", name: "Argjentinë", flag: "🇦🇷" },
  { code: "am", name: "Armeni", flag: "🇦🇲" },
  { code: "au", name: "Australi", flag: "🇦🇺" },
  { code: "at", name: "Austri", flag: "🇦🇹" },
  { code: "az", name: "Azerbajxhan", flag: "🇦🇿" },
  { code: "bs", name: "Bahamas", flag: "🇧🇸" },
  { code: "bh", name: "Bahrain", flag: "🇧🇭" },
  { code: "bd", name: "Bangladesh", flag: "🇧🇩" },
  { code: "bb", name: "Barbados", flag: "🇧🇧" },
  { code: "by", name: "Bjellorusi", flag: "🇧🇾" },
  { code: "be", name: "Belgjikë", flag: "🇧🇪" },
  { code: "bz", name: "Belizë", flag: "🇧🇿" },
  { code: "bj", name: "Benin", flag: "🇧🇯" },
  { code: "bt", name: "Butan", flag: "🇧🇹" },
  { code: "bo", name: "Bolivi", flag: "🇧🇴" },
  { code: "ba", name: "Bosnjë e Hercegovinë", flag: "🇧🇦" },
  { code: "bw", name: "Botsvanë", flag: "🇧🇼" },
  { code: "br", name: "Brazil", flag: "🇧🇷" },
  { code: "bn", name: "Brunei", flag: "🇧🇳" },
  { code: "bg", name: "Bullgari", flag: "🇧🇬" },
  { code: "bf", name: "Burkina Faso", flag: "🇧🇫" },
  { code: "bi", name: "Burundi", flag: "🇧🇮" },
  { code: "cv", name: "Kabo Verde", flag: "🇨🇻" },
  { code: "kh", name: "Kamboxhia", flag: "🇰🇭" },
  { code: "cm", name: "Kamerun", flag: "🇨🇲" },
  { code: "ca", name: "Kanada", flag: "🇨🇦" },
  { code: "cf", name: "Republika e Afrikës Qendrore", flag: "🇨🇫" },
  { code: "td", name: "Çad", flag: "🇹🇩" },
  { code: "cl", name: "Kili", flag: "🇨🇱" },
  { code: "cn", name: "Kinë", flag: "🇨🇳" },
  { code: "co", name: "Kolumbi", flag: "🇨🇴" },
  { code: "km", name: "Komore", flag: "🇰🇲" },
  { code: "cg", name: "Kongo", flag: "🇨🇬" },
  { code: "cd", name: "Republika Demokratike e Kongos", flag: "🇨🇩" },
  { code: "cr", name: "Kosta Rikë", flag: "🇨🇷" },
  { code: "ci", name: "Bregu i Fildishtë", flag: "🇨🇮" },
  { code: "hr", name: "Kroaci", flag: "🇭🇷" },
  { code: "cu", name: "Kubë", flag: "🇨🇺" },
  { code: "cy", name: "Qipro", flag: "🇨🇾" },
  { code: "cz", name: "Republika Çeke", flag: "🇨🇿" },
  { code: "dk", name: "Danimarkë", flag: "🇩🇰" },
  { code: "dj", name: "Xhibuti", flag: "🇩🇯" },
  { code: "dm", name: "Dominikë", flag: "🇩🇲" },
  { code: "do", name: "Republika Dominikane", flag: "🇩🇴" },
  { code: "ec", name: "Ekuador", flag: "🇪🇨" },
  { code: "eg", name: "Egjipt", flag: "🇪🇬" },
  { code: "sv", name: "Salvador", flag: "🇸🇻" },
  { code: "gq", name: "Guineja Ekuatoriale", flag: "🇬🇶" },
  { code: "er", name: "Eritre", flag: "🇪🇷" },
  { code: "ee", name: "Estoni", flag: "🇪🇪" },
  { code: "sz", name: "Esuatini", flag: "🇸🇿" },
  { code: "et", name: "Etiopi", flag: "🇪🇹" },
  { code: "fj", name: "Fixhi", flag: "🇫🇯" },
  { code: "fi", name: "Finlandë", flag: "🇫🇮" },
  { code: "fr", name: "Francë", flag: "🇫🇷" },
  { code: "ga", name: "Gabon", flag: "🇬🇦" },
  { code: "gm", name: "Gambia", flag: "🇬🇲" },
  { code: "ge", name: "Gjeorgji", flag: "🇬🇪" },
  { code: "de", name: "Gjermani", flag: "🇩🇪" },
  { code: "gh", name: "Ganë", flag: "🇬🇭" },
  { code: "gr", name: "Greqi", flag: "🇬🇷" },
  { code: "gd", name: "Grenadë", flag: "🇬🇩" },
  { code: "gt", name: "Guatemalë", flag: "🇬🇹" },
  { code: "gn", name: "Guine", flag: "🇬🇳" },
  { code: "gw", name: "Guine-Bisau", flag: "🇬🇼" },
  { code: "gy", name: "Guajanë", flag: "🇬🇾" },
  { code: "ht", name: "Haiti", flag: "🇭🇹" },
  { code: "hn", name: "Honduras", flag: "🇭🇳" },
  { code: "hu", name: "Hungari", flag: "🇭🇺" },
  { code: "is", name: "Islandë", flag: "🇮🇸" },
  { code: "in", name: "Indi", flag: "🇮🇳" },
  { code: "id", name: "Indonezi", flag: "🇮🇩" },
  { code: "ir", name: "Iran", flag: "🇮🇷" },
  { code: "iq", name: "Irak", flag: "🇮🇶" },
  { code: "ie", name: "Irlandë", flag: "🇮🇪" },
  { code: "il", name: "Izrael", flag: "🇮🇱" },
  { code: "it", name: "Itali", flag: "🇮🇹" },
  { code: "jm", name: "Xhamajkë", flag: "🇯🇲" },
  { code: "jp", name: "Japoni", flag: "🇯🇵" },
  { code: "jo", name: "Jordani", flag: "🇯🇴" },
  { code: "kz", name: "Kazakistan", flag: "🇰🇿" },
  { code: "ke", name: "Kenia", flag: "🇰🇪" },
  { code: "ki", name: "Kiribati", flag: "🇰🇮" },
  { code: "kp", name: "Koreja e Veriut", flag: "🇰🇵" },
  { code: "kr", name: "Koreja e Jugut", flag: "🇰🇷" },
  { code: "xk", name: "Kosovë", flag: "🇽🇰" },
  { code: "kw", name: "Kuvajt", flag: "🇰🇼" },
  { code: "kg", name: "Kirgistan", flag: "🇰🇬" },
  { code: "la", name: "Laos", flag: "🇱🇦" },
  { code: "lv", name: "Letoni", flag: "🇱🇻" },
  { code: "lb", name: "Liban", flag: "🇱🇧" },
  { code: "ls", name: "Lesoto", flag: "🇱🇸" },
  { code: "lr", name: "Liberi", flag: "🇱🇷" },
  { code: "ly", name: "Libi", flag: "🇱🇾" },
  { code: "li", name: "Lihtenshtajn", flag: "🇱🇮" },
  { code: "lt", name: "Lituani", flag: "🇱🇹" },
  { code: "lu", name: "Luksemburg", flag: "🇱🇺" },
  { code: "mg", name: "Madagaskar", flag: "🇲🇬" },
  { code: "mw", name: "Malavi", flag: "🇲🇼" },
  { code: "my", name: "Malajzi", flag: "🇲🇾" },
  { code: "mv", name: "Maldive", flag: "🇲🇻" },
  { code: "ml", name: "Mali", flag: "🇲🇱" },
  { code: "mt", name: "Maltë", flag: "🇲🇹" },
  { code: "mh", name: "Ishujt Marshall", flag: "🇲🇭" },
  { code: "mr", name: "Mauritani", flag: "🇲🇷" },
  { code: "mu", name: "Mauritius", flag: "🇲🇺" },
  { code: "mx", name: "Meksikë", flag: "🇲🇽" },
  { code: "fm", name: "Mikronezia", flag: "🇫🇲" },
  { code: "md", name: "Moldavi", flag: "🇲🇩" },
  { code: "mc", name: "Monako", flag: "🇲🇨" },
  { code: "mn", name: "Mongoli", flag: "🇲🇳" },
  { code: "me", name: "Mali i Zi", flag: "🇲🇪" },
  { code: "ma", name: "Marok", flag: "🇲🇦" },
  { code: "mz", name: "Mozambik", flag: "🇲🇿" },
  { code: "mm", name: "Mianmar", flag: "🇲🇲" },
  { code: "na", name: "Namibi", flag: "🇳🇦" },
  { code: "nr", name: "Nauru", flag: "🇳🇷" },
  { code: "np", name: "Nepal", flag: "🇳🇵" },
  { code: "nl", name: "Holandë", flag: "🇳🇱" },
  { code: "nz", name: "Zelanda e Re", flag: "🇳🇿" },
  { code: "ni", name: "Nikaragua", flag: "🇳🇮" },
  { code: "ne", name: "Nigjer", flag: "🇳🇪" },
  { code: "ng", name: "Nigeri", flag: "🇳🇬" },
  { code: "mk", name: "Maqedoni e Veriut", flag: "🇲🇰" },
  { code: "no", name: "Norvegji", flag: "🇳🇴" },
  { code: "om", name: "Oman", flag: "🇴🇲" },
  { code: "pk", name: "Pakistan", flag: "🇵🇰" },
  { code: "pw", name: "Palau", flag: "🇵🇼" },
  { code: "ps", name: "Palestinë", flag: "🇵🇸" },
  { code: "pa", name: "Panama", flag: "🇵🇦" },
  { code: "pg", name: "Papua Guineja e Re", flag: "🇵🇬" },
  { code: "py", name: "Paraguaj", flag: "🇵🇾" },
  { code: "pe", name: "Peru", flag: "🇵🇪" },
  { code: "ph", name: "Filipine", flag: "🇵🇭" },
  { code: "pl", name: "Poloni", flag: "🇵🇱" },
  { code: "pt", name: "Portugali", flag: "🇵🇹" },
  { code: "qa", name: "Katar", flag: "🇶🇦" },
  { code: "ro", name: "Rumani", flag: "🇷🇴" },
  { code: "ru", name: "Rusi", flag: "🇷🇺" },
  { code: "rw", name: "Ruandë", flag: "🇷🇼" },
  { code: "kn", name: "Saint Kitts e Nevis", flag: "🇰🇳" },
  { code: "lc", name: "Shën Luçia", flag: "🇱🇨" },
  { code: "vc", name: "Shën Vincent e Grenadine", flag: "🇻🇨" },
  { code: "ws", name: "Samoa", flag: "🇼🇸" },
  { code: "sm", name: "San Marino", flag: "🇸🇲" },
  { code: "st", name: "São Tomé e Príncipe", flag: "🇸🇹" },
  { code: "sa", name: "Arabia Saudite", flag: "🇸🇦" },
  { code: "sn", name: "Senegal", flag: "🇸🇳" },
  { code: "rs", name: "Serbi", flag: "🇷🇸" },
  { code: "sc", name: "Sejshelle", flag: "🇸🇨" },
  { code: "sl", name: "Sierra Leone", flag: "🇸🇱" },
  { code: "sg", name: "Singapor", flag: "🇸🇬" },
  { code: "sk", name: "Sllovaki", flag: "🇸🇰" },
  { code: "si", name: "Slloveni", flag: "🇸🇮" },
  { code: "sb", name: "Ishujt Solomon", flag: "🇸🇧" },
  { code: "so", name: "Somali", flag: "🇸🇴" },
  { code: "za", name: "Afrika e Jugut", flag: "🇿🇦" },
  { code: "ss", name: "Sudani i Jugut", flag: "🇸🇸" },
  { code: "es", name: "Spanjë", flag: "🇪🇸" },
  { code: "lk", name: "Sri Lankë", flag: "🇱🇰" },
  { code: "sd", name: "Sudan", flag: "🇸🇩" },
  { code: "sr", name: "Surinam", flag: "🇸🇷" },
  { code: "se", name: "Suedi", flag: "🇸🇪" },
  { code: "ch", name: "Zvicër", flag: "🇨🇭" },
  { code: "sy", name: "Siri", flag: "🇸🇾" },
  { code: "tw", name: "Tajvan", flag: "🇹🇼" },
  { code: "tj", name: "Taxhikistan", flag: "🇹🇯" },
  { code: "tz", name: "Tanzani", flag: "🇹🇿" },
  { code: "th", name: "Tajlandë", flag: "🇹🇭" },
  { code: "tl", name: "Timor Lindor", flag: "🇹🇱" },
  { code: "tg", name: "Togo", flag: "🇹🇬" },
  { code: "to", name: "Tonga", flag: "🇹🇴" },
  { code: "tt", name: "Trinidad e Tobago", flag: "🇹🇹" },
  { code: "tn", name: "Tunizi", flag: "🇹🇳" },
  { code: "tr", name: "Turqi", flag: "🇹🇷" },
  { code: "tm", name: "Turkmenistan", flag: "🇹🇲" },
  { code: "tv", name: "Tuvalu", flag: "🇹🇻" },
  { code: "ug", name: "Ugandë", flag: "🇺🇬" },
  { code: "ua", name: "Ukrainë", flag: "🇺🇦" },
  { code: "ae", name: "Emiratet e Bashkuara Arabe", flag: "🇦🇪" },
  { code: "gb", name: "Mbretëria e Bashkuar", flag: "🇬🇧" },
  { code: "us", name: "Shtetet e Bashkuara", flag: "🇺🇸" },
  { code: "uy", name: "Uruguaj", flag: "🇺🇾" },
  { code: "uz", name: "Uzbekistan", flag: "🇺🇿" },
  { code: "vu", name: "Vanuatu", flag: "🇻🇺" },
  { code: "va", name: "Vatikan", flag: "🇻🇦" },
  { code: "ve", name: "Venezuelë", flag: "🇻🇪" },
  { code: "vn", name: "Vietnam", flag: "🇻🇳" },
  { code: "ye", name: "Jemen", flag: "🇾🇪" },
  { code: "zm", name: "Zambia", flag: "🇿🇲" },
  { code: "zw", name: "Zimbabve", flag: "🇿🇼" },
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

        <div className="max-h-[60vh] overflow-y-auto px-1">
          <div className="grid grid-cols-2 gap-3 pt-4">
            {countries.map((country) => (
              <Button
                key={country.code}
                variant="outline"
                size="lg"
                onClick={() => onSelectCountry(country.code)}
                className="h-auto py-4 flex flex-col gap-2 hover:border-primary hover:bg-primary/5 transition-smooth"
              >
                <span className="text-3xl">{country.flag}</span>
                <span className="font-semibold text-sm text-center leading-tight">{country.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
