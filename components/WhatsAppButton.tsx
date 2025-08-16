'use client';

import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Instagram, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ContactButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show button after a shorter delay for better UX
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = "+1234567890"; // Replace with your actual WhatsApp number
    const message = "Hello! I'm interested in your luxury car rental services.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleTelegramClick = () => {
    const username = "your_telegram_username"; // Replace with your actual Telegram username
    const message = "Hello! I'm interested in your luxury car rental services.";
    const telegramUrl = `https://t.me/${username}?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
  };

  const handleInstagramClick = () => {
    const username = "your_instagram_username"; // Replace with your actual Instagram username
    const instagramUrl = `https://instagram.com/${username}`;
    window.open(instagramUrl, '_blank');
  };

  const handleFacebookClick = () => {
    const username = "your_facebook_username"; // Replace with your actual Facebook username
    const facebookUrl = `https://facebook.com/${username}`;
    window.open(facebookUrl, '_blank');
  };

  const handleSnapchatClick = () => {
    const username = "your_snapchat_username"; // Replace with your actual Snapchat username
    const snapchatUrl = `https://snapchat.com/add/${username}`;
    window.open(snapchatUrl, '_blank');
  };

  const handlePhoneClick = () => {
    const phoneNumber = "+1234567890"; // Replace with your actual phone number
    window.open(`tel:${phoneNumber}`, '_self');
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="relative group bg-green-600 hover:bg-green-700 text-white hover:text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 w-16 h-16"
            style={{
              boxShadow: '0 10px 25px -5px rgba(34, 197, 94, 0.3), 0 10px 10px -5px rgba(34, 197, 94, 0.2)',
            }}
          >
            <MessageSquare className="text-4xl" style={{ fontSize: '2rem', width: '1.5rem', height: '1.5rem' }} />
            
            {/* Pulse animation ring - original WhatsApp style */}
            <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></div>
            
            {/* Hover effect ring */}
            <div className="absolute inset-0 rounded-full bg-green-300 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent 
          align="end" 
          className="w-48 mb-2 bg-card border-border shadow-lg max-h-80 overflow-y-auto p-1"
          sideOffset={8}
        >
          
          <div 
            onClick={handleInstagramClick}
            className="flex items-center gap-3 cursor-pointer rounded-sm px-2 py-1.5 text-sm hover:bg-muted transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-full flex items-center justify-center">
              <Instagram className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="font-medium text-foreground">Instagram</div>
              <div className="text-xs text-muted-foreground">Follow us</div>
            </div>
          </div>
          
          <div 
            onClick={handleSnapchatClick}
            className="flex items-center gap-3 cursor-pointer rounded-sm px-2 py-1.5 text-sm hover:bg-muted transition-colors"
          >
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <img 
                src="https://img.icons8.com/?size=100&id=100509&format=png&color=FFFFFF" 
                alt="Snapchat" 
                className="h-4 w-4"
              />
            </div>
            <div>
              <div className="font-medium text-foreground">Snapchat</div>
              <div className="text-xs text-muted-foreground">Add us</div>
            </div>
          </div>
          
          <div 
            onClick={handleFacebookClick}
            className="flex items-center gap-3 cursor-pointer rounded-sm px-2 py-1.5 text-sm hover:bg-muted transition-colors"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <div>
              <div className="font-medium text-foreground">Facebook</div>
              <div className="text-xs text-muted-foreground">Like our page</div>
            </div>
          </div>

          <div 
            onClick={handleTelegramClick}
            className="flex items-center gap-3 cursor-pointer rounded-sm px-2 py-1.5 text-sm hover:bg-muted transition-colors"
          >
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </div>
            <div>
              <div className="font-medium text-foreground">Telegram</div>
              <div className="text-xs text-muted-foreground">Message us</div>
            </div>
          </div>

          <div 
            onClick={handleWhatsAppClick}
            className="flex items-center gap-3 cursor-pointer rounded-sm px-2 py-1.5 text-sm hover:bg-muted transition-colors"
          >
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <MessageCircle className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="font-medium text-foreground">WhatsApp</div>
              <div className="text-xs text-muted-foreground">Chat with us</div>
            </div>
          </div>

          <div 
            onClick={handlePhoneClick}
            className="flex items-center gap-3 cursor-pointer rounded-sm px-2 py-1.5 text-sm hover:bg-muted transition-colors"
          >
            <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center">
              <Phone className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="font-medium text-foreground">Call Us</div>
              <div className="text-xs text-muted-foreground">Direct call</div>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Contact us
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );
};

export default ContactButton;
