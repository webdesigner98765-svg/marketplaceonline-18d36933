import { Search, Plus, Sparkles, LogOut, Settings, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  onAddProduct: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const Header = ({ onAddProduct, searchQuery, onSearchChange }: HeaderProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const userEmail = user?.email || "";
  const initials = userEmail
    ? userEmail.substring(0, 2).toUpperCase()
    : "?";

  return (
    <header className="sticky top-0 z-50 glass-strong">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-button">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl hidden sm:block">Marketplace</span>
          </div>
          
          {/* Search */}
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Kërko produkte..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 h-12 bg-secondary/50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/60"
            />
          </div>
          
          {/* CTA Button */}
          <Button 
            onClick={onAddProduct} 
            size="lg" 
            className="gap-2 font-semibold h-12 px-6 bg-gradient-primary hover:opacity-90 rounded-xl shadow-button hidden sm:flex"
          >
            <Plus className="w-5 h-5" />
            Posto Produkt
          </Button>
          
          {/* Mobile CTA */}
          <Button 
            onClick={onAddProduct} 
            size="icon"
            className="w-12 h-12 bg-gradient-primary hover:opacity-90 rounded-xl shadow-button sm:hidden"
          >
            <Plus className="w-5 h-5" />
          </Button>

          {/* Chat */}
          {user && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/chat")}
              className="w-10 h-10 rounded-xl text-muted-foreground hover:text-foreground"
            >
              <MessageCircle className="w-5 h-5" />
            </Button>
          )}

          {/* Settings */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/settings")}
            className="w-10 h-10 rounded-xl text-muted-foreground hover:text-foreground"
          >
            <Settings className="w-5 h-5" />
          </Button>

          {/* User Avatar / Auth */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full ring-2 ring-border hover:ring-primary transition-all">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user?.user_metadata?.avatar_url} alt={userEmail} />
                    <AvatarFallback className="bg-secondary text-sm font-semibold">{initials}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-3 py-2 border-b border-border">
                  <p className="font-medium text-sm truncate">{userEmail}</p>
                </div>
                <DropdownMenuItem onClick={() => navigate("/settings")} className="gap-2 cursor-pointer">
                  <Settings className="w-4 h-4" />
                  Cilësimet
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signOut} className="gap-2 text-destructive cursor-pointer">
                  <LogOut className="w-4 h-4" />
                  Dil
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
      </div>
    </header>
  );
};
