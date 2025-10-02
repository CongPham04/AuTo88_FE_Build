import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Calendar, Fuel, Settings, MapPin, Phone, Mail, Heart } from "lucide-react";
import { Separator } from "./ui/separator";

interface CarDetailsModalProps {
  car: {
    id: number;
    make: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    fuelType: string;
    transmission: string;
    location: string;
    image: string;
    condition: 'New' | 'Used' | 'Certified';
    description?: string;
    features?: string[];
    dealer?: {
      name: string;
      phone: string;
      email: string;
    };
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CarDetailsModal({ car, isOpen, onClose }: CarDetailsModalProps) {
  if (!car) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('en-US').format(mileage);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {car.year} {car.make} {car.model}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative">
              <ImageWithFallback
                src={car.image}
                alt={`${car.year} ${car.make} ${car.model}`}
                className="w-full h-64 object-cover rounded-lg"
              />
              <Badge 
                className="absolute top-2 left-2" 
                variant={car.condition === 'New' ? 'default' : car.condition === 'Certified' ? 'secondary' : 'outline'}
              >
                {car.condition}
              </Badge>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm"
              >
                <Heart className="w-4 h-4" />
              </Button>
            </div>

            {/* Additional images placeholder */}
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <ImageWithFallback
                  key={i}
                  src={car.image}
                  alt={`${car.make} ${car.model} view ${i}`}
                  className="w-full h-16 object-cover rounded cursor-pointer hover:opacity-80"
                />
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-4">
            <div>
              <p className="text-3xl text-blue-600">
                {formatPrice(car.price)}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Mileage</p>
                  <p>{formatMileage(car.mileage)} miles</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Fuel className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Fuel Type</p>
                  <p>{car.fuelType}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Transmission</p>
                  <p>{car.transmission}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p>{car.location}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="mb-2">Description</h3>
              <p className="text-gray-600">
                {car.description || `This ${car.year} ${car.make} ${car.model} is in excellent condition and comes with all the modern features you need. Perfect for daily commuting and weekend adventures.`}
              </p>
            </div>

            <div>
              <h3 className="mb-2">Key Features</h3>
              <div className="flex flex-wrap gap-2">
                {(car.features || ['Air Conditioning', 'Bluetooth', 'Backup Camera', 'Cruise Control', 'Leather Seats']).map((feature, index) => (
                  <Badge key={index} variant="secondary">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Dealer Information */}
            <div>
              <h3 className="mb-2">Dealer Information</h3>
              <div className="space-y-2">
                <p>{car.dealer?.name || 'Premium Auto Sales'}</p>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{car.dealer?.phone || '(555) 123-4567'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{car.dealer?.email || 'sales@premiumauto.com'}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1">
                <Phone className="w-4 h-4 mr-2" />
                Call Dealer
              </Button>
              <Button variant="outline" className="flex-1">
                <Mail className="w-4 h-4 mr-2" />
                Email Dealer
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}