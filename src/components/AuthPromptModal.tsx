import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Mail, ArrowLeft, ShieldCheck, Loader2 } from "lucide-react";

interface AuthPromptModalProps {
  open: boolean;
  onClose: () => void;
}

export const AuthPromptModal = ({ open, onClose }: AuthPromptModalProps) => {
  const { signInWithOtp, verifyOtp } = useAuth();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!email.trim() || !email.includes("@")) {
      toast.error("Shkruaj një email të vlefshëm.");
      return;
    }
    setIsLoading(true);
    try {
      await signInWithOtp(email.trim());
      setStep("otp");
      toast.success("Kodi u dërgua! Kontrollo emailin tënd.");
    } catch {
      toast.error("Ndodhi një gabim. Provo përsëri.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otpCode.length !== 6) {
      toast.error("Fut kodin 6-shifror të plotë.");
      return;
    }
    setIsLoading(true);
    try {
      await verifyOtp(email.trim(), otpCode);
      toast.success("Hyrje e suksesshme!");
      handleReset();
      onClose();
    } catch {
      toast.error("Kodi është i gabuar. Provo përsëri.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setStep("email");
    setEmail("");
    setOtpCode("");
    setIsLoading(false);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md text-center">
        <DialogHeader className="space-y-4">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-button">
            {step === "email" ? (
              <Mail className="w-8 h-8 text-primary-foreground" />
            ) : (
              <ShieldCheck className="w-8 h-8 text-primary-foreground" />
            )}
          </div>
          <DialogTitle className="text-2xl font-display">
            {step === "email" ? "Hyr për të postuar" : "Fut kodin"}
          </DialogTitle>
          <DialogDescription className="text-base">
            {step === "email"
              ? "Shkruaj emailin tënd për të marrë një kod 6-shifror hyrjeje."
              : `Një kod 6-shifror u dërgua te ${email}. Fute më poshtë.`}
          </DialogDescription>
        </DialogHeader>

        {step === "email" ? (
          <div className="pt-6 space-y-4">
            <Input
              type="email"
              placeholder="email@shembull.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
              className="h-14 text-base text-center rounded-2xl"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendOtp}
              size="lg"
              disabled={isLoading}
              className="w-full h-14 text-base font-semibold bg-gradient-primary hover:opacity-90 shadow-button rounded-2xl gap-3"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Mail className="w-5 h-5" />
              )}
              Dërgo Kodin
            </Button>
            <Button variant="ghost" onClick={handleClose} className="w-full text-muted-foreground">
              Anulo
            </Button>
          </div>
        ) : (
          <div className="pt-6 space-y-6">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otpCode}
                onChange={setOtpCode}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              onClick={handleVerifyOtp}
              size="lg"
              disabled={isLoading || otpCode.length !== 6}
              className="w-full h-14 text-base font-semibold bg-gradient-primary hover:opacity-90 shadow-button rounded-2xl gap-3"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <ShieldCheck className="w-5 h-5" />
              )}
              Verifiko & Hyr
            </Button>

            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { setStep("email"); setOtpCode(""); }}
                className="text-muted-foreground gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                Kthehu
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSendOtp}
                disabled={isLoading}
                className="text-muted-foreground"
              >
                Ridërgo kodin
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
