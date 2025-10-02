import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";

interface CarFiltersProps {
  filters: {
    make: string;
    priceRange: [number, number];
    year: string;
    fuelType: string;
    transmission: string;
    condition: string;
  };
  onFiltersChange: (filters: any) => void;
  onClearFilters: () => void;
  showPriceFilter?: boolean;
  hideMakeFilter?: boolean;
}

export function CarFilters({ filters, onFiltersChange, onClearFilters, showPriceFilter = true, hideMakeFilter = false }: CarFiltersProps) {
  const makes = ['All Makes', 'Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Audi', 'Volkswagen', 'Nissan', 'Hyundai'];
  const years = ['All Years', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016'];
  const fuelTypes = ['All Fuel Types', 'Gasoline', 'Hybrid', 'Electric', 'Diesel'];
  const transmissions = ['All Transmissions', 'Automatic', 'Manual', 'CVT'];
  const conditions = ['All Conditions', 'New', 'Used', 'Certified'];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter Cars</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!hideMakeFilter && (
          <div>
            <Label htmlFor="make">Make</Label>
            <Select 
              value={filters.make} 
              onValueChange={(value) => onFiltersChange({ ...filters, make: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select make" />
              </SelectTrigger>
              <SelectContent>
                {makes.map((make) => (
                  <SelectItem key={make} value={make}>{make}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {showPriceFilter && (
          <div>
            <Label>Price Range</Label>
            <div className="px-2 py-4">
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => onFiltersChange({ ...filters, priceRange: value as [number, number] })}
                max={100000}
                min={0}
                step={5000}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{formatPrice(filters.priceRange[0])}</span>
              <span>{formatPrice(filters.priceRange[1])}</span>
            </div>
          </div>
        )}

        <div>
          <Label htmlFor="year">Year</Label>
          <Select 
            value={filters.year} 
            onValueChange={(value) => onFiltersChange({ ...filters, year: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="fuel">Fuel Type</Label>
          <Select 
            value={filters.fuelType} 
            onValueChange={(value) => onFiltersChange({ ...filters, fuelType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select fuel type" />
            </SelectTrigger>
            <SelectContent>
              {fuelTypes.map((fuel) => (
                <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="transmission">Transmission</Label>
          <Select 
            value={filters.transmission} 
            onValueChange={(value) => onFiltersChange({ ...filters, transmission: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select transmission" />
            </SelectTrigger>
            <SelectContent>
              {transmissions.map((transmission) => (
                <SelectItem key={transmission} value={transmission}>{transmission}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="condition">Condition</Label>
          <Select 
            value={filters.condition} 
            onValueChange={(value) => onFiltersChange({ ...filters, condition: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>
            <SelectContent>
              {conditions.map((condition) => (
                <SelectItem key={condition} value={condition}>{condition}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={onClearFilters} variant="outline" className="w-full">
          Clear All Filters
        </Button>
      </CardContent>
    </Card>
  );
}