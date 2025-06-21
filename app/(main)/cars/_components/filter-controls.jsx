"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import React from "react";

const CarFilterControls = ({
  filters,
  currentFilters,
  onFilterChange,
  onClearFilter,
}) => {
  const { make, bodyType, fuelType, transmission, priceRange } = currentFilters;

  const filterSections = [
    {
      id: "make",
      title: "Make",
      options: filters.makes,
      currentValue: make,
    },
    {
      id: "bodyType",
      title: "Body Type",
      options: filters.bodyTypes,
      currentValue: bodyType,
    },
    {
      id: "fuelType",
      title: "Fuel Type",
      options: filters.fuelTypes,
      currentValue: fuelType,
    },
    {
      id: "transmission",
      title: "Transmission",
      options: filters.transmissions,
      currentValue: transmission,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Price Range Section */}
      <div className="space-y-4">
        <h3 className="font-medium">Price Range</h3>

        <SliderPrimitive.Root
          className="relative flex w-full touch-none select-none items-center h-4"
          min={filters.priceRange.min}
          max={filters.priceRange.max}
          step={100}
          value={priceRange}
          onValueChange={(value) => onFilterChange("priceRange", value)}
        >
          <SliderPrimitive.Track className="bg-black relative h-1 w-full rounded-full">
            <SliderPrimitive.Range className="absolute h-full bg-black rounded-full" />
          </SliderPrimitive.Track>
          {priceRange.map((_, i) => (
            <SliderPrimitive.Thumb
              key={i}
              className="block h-4 w-4 rounded-full border-2 border-black bg-white shadow hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
            />
          ))}
        </SliderPrimitive.Root>

        <div className="flex justify-between text-sm font-medium px-1">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Filter Sections */}
      {filterSections.map((section) => (
        <div key={section.id} className="space-y-3">
          <h4 className="text-sm font-medium flex justify-between items-center">
            <span>{section.title}</span>
            {section.currentValue && (
              <button
                className="text-xs text-gray-600 flex items-center"
                onClick={() => onClearFilter(section.id)}
              >
                <X className="mr-1 h-3 w-3" />
                Clear
              </button>
            )}
          </h4>

          <div className="flex flex-wrap gap-2">
            {section.options.map((option) => {
              const isSelected = section.currentValue === option;
              return (
                <Badge
                  key={option}
                  onClick={() =>
                    onFilterChange(section.id, isSelected ? "" : option)
                  }
                  variant={isSelected ? "default" : "outline"}
                  className={`cursor-pointer px-3 py-1 transition ${
                    isSelected
                      ? "bg-blue-100 hover:bg-blue-200 text-blue-900 border-blue-200"
                      : "bg-white hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {option}
                  {isSelected && <Check className="ml-1 h-3 w-3 inline" />}
                </Badge>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarFilterControls;
