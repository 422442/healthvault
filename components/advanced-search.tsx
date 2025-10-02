"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, MapPin, Star, Clock, X, SlidersHorizontal } from "lucide-react"

interface SearchFilters {
  query: string
  specialty: string
  location: string
  availability: string
  rating: number[]
  consultationFee: number[]
  insurance: string[]
  consultationType: string
  experience: number[]
  gender: string
  languages: string[]
}

interface AdvancedSearchProps {
  onSearch?: (filters: SearchFilters) => void
  onFiltersChange?: (filters: SearchFilters) => void
}

export function AdvancedSearch({ onSearch, onFiltersChange }: AdvancedSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    specialty: "",
    location: "",
    availability: "",
    rating: [4.0],
    consultationFee: [0, 2000],
    insurance: [],
    consultationType: "",
    experience: [0],
    gender: "",
    languages: []
  })
  
  const [showFilters, setShowFilters] = useState(false)

  const specialties = [
    "Cardiologist", "Dermatologist", "General Physician", "Neurologist",
    "Orthopedic", "Pediatrician", "Psychiatrist", "Gynecologist", 
    "ENT Specialist", "Ophthalmologist", "Pulmonologist", "Radiologist"
  ]

  const locations = [
    "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad",
    "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Kanpur", "Surat"
  ]

  const insuranceProviders = [
    "Star Health", "HDFC ERGO", "ICICI Lombard", "Bajaj Allianz",
    "Max Bupa", "Care Health", "Niva Bupa", "United India Insurance"
  ]

  const languages = [
    "English", "Hindi", "Telugu", "Tamil", "Bengali", "Marathi",
    "Gujarati", "Kannada", "Malayalam", "Punjabi", "Urdu", "Odia"
  ]

  const handleFilterChange = (key: keyof SearchFilters, value: string | number[] | string[]) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  const handleInsuranceChange = (insurance: string, checked: boolean) => {
    const newInsurance = checked 
      ? [...filters.insurance, insurance]
      : filters.insurance.filter(i => i !== insurance)
    handleFilterChange('insurance', newInsurance)
  }

  const handleLanguageChange = (language: string, checked: boolean) => {
    const newLanguages = checked 
      ? [...filters.languages, language]
      : filters.languages.filter(l => l !== language)
    handleFilterChange('languages', newLanguages)
  }

  const clearFilters = () => {
    const clearedFilters: SearchFilters = {
      query: "",
      specialty: "",
      location: "",
      availability: "",
      rating: [4.0],
      consultationFee: [0, 2000],
      insurance: [],
      consultationType: "",
      experience: [0],
      gender: "",
      languages: []
    }
    setFilters(clearedFilters)
    onFiltersChange?.(clearedFilters)
  }

  const handleSearch = () => {
    onSearch?.(filters)
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.query) count++
    if (filters.specialty) count++
    if (filters.location) count++
    if (filters.availability) count++
    if (filters.rating[0] > 4.0) count++
    if (filters.consultationFee[0] > 0 || filters.consultationFee[1] < 2000) count++
    if (filters.insurance.length > 0) count++
    if (filters.consultationType) count++
    if (filters.experience[0] > 0) count++
    if (filters.gender) count++
    if (filters.languages.length > 0) count++
    return count
  }

  const activeFiltersCount = getActiveFiltersCount()

  return (
    <div className="space-y-4">
      {/* Main Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search doctors, specialties, or conditions..."
            value={filters.query}
            onChange={(e) => handleFilterChange("query", e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 h-12 px-4"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
        <Button onClick={handleSearch} className="h-12 px-6">
          Search
        </Button>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => handleFilterChange("availability", "today")}>
          <Clock className="w-4 h-4 mr-1" />
          Available Today
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleFilterChange("consultationType", "video")}>
          📹 Video Consultation
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleFilterChange("rating", [4.5])}>
          <Star className="w-4 h-4 mr-1" />
          4.5+ Rating
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleFilterChange("consultationFee", [0, 500])}>
          💰 Under ₹500
        </Button>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Advanced Filters
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {/* Basic Filters */}
              <div className="grid md:grid-cols-3 gap-4">
                {/* Specialty Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Specialty</label>
                  <Select value={filters.specialty} onValueChange={(value) => handleFilterChange("specialty", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location
                  </label>
                  <Select value={filters.location} onValueChange={(value) => handleFilterChange("location", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Availability Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Availability
                  </label>
                  <Select value={filters.availability} onValueChange={(value) => handleFilterChange("availability", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="When do you need?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="tomorrow">Tomorrow</SelectItem>
                      <SelectItem value="this-week">This Week</SelectItem>
                      <SelectItem value="next-week">Next Week</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Advanced Filters */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Rating Filter */}
                <div className="space-y-3">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Minimum Rating: {filters.rating[0].toFixed(1)}
                  </label>
                  <Slider
                    value={filters.rating}
                    onValueChange={(value) => handleFilterChange("rating", value)}
                    max={5}
                    min={1}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1.0</span>
                    <span>5.0</span>
                  </div>
                </div>

                {/* Consultation Fee Filter */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">
                    Consultation Fee: ₹{filters.consultationFee[0]} - ₹{filters.consultationFee[1]}
                  </label>
                  <Slider
                    value={filters.consultationFee}
                    onValueChange={(value) => handleFilterChange("consultationFee", value)}
                    max={2000}
                    min={0}
                    step={50}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>₹0</span>
                    <span>₹2000+</span>
                  </div>
                </div>

                {/* Experience Filter */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">
                    Minimum Experience: {filters.experience[0]} years
                  </label>
                  <Slider
                    value={filters.experience}
                    onValueChange={(value) => handleFilterChange("experience", value)}
                    max={30}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0 years</span>
                    <span>30+ years</span>
                  </div>
                </div>

                {/* Consultation Type & Gender */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Consultation Type</label>
                    <Select value={filters.consultationType} onValueChange={(value) => handleFilterChange("consultationType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in-person">In-Person</SelectItem>
                        <SelectItem value="video">Video Call</SelectItem>
                        <SelectItem value="phone">Phone Call</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Gender Preference</label>
                    <Select value={filters.gender} onValueChange={(value) => handleFilterChange("gender", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Insurance Providers */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Insurance Accepted</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {insuranceProviders.map((insurance) => (
                    <div key={insurance} className="flex items-center space-x-2">
                      <Checkbox
                        id={insurance}
                        checked={filters.insurance.includes(insurance)}
                        onCheckedChange={(checked) => handleInsuranceChange(insurance, checked as boolean)}
                      />
                      <label
                        htmlFor={insurance}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {insurance}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Languages Spoken</label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {languages.map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={language}
                        checked={filters.languages.includes(language)}
                        onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
                      />
                      <label
                        htmlFor={language}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {language}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
              <Button variant="outline" onClick={clearFilters}>
                Reset Filters
              </Button>
              <Button onClick={handleSearch}>
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.specialty && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Specialty: {filters.specialty}
              <button
                onClick={() => handleFilterChange("specialty", "")}
                className="ml-1 hover:bg-muted rounded-full"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {filters.location && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Location: {filters.location}
              <button
                onClick={() => handleFilterChange("location", "")}
                className="ml-1 hover:bg-muted rounded-full"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {filters.availability && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Available: {filters.availability}
              <button
                onClick={() => handleFilterChange("availability", "")}
                className="ml-1 hover:bg-muted rounded-full"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {filters.insurance.length > 0 && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Insurance: {filters.insurance.length} selected
              <button
                onClick={() => handleFilterChange("insurance", [])}
                className="ml-1 hover:bg-muted rounded-full"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-6 px-2 text-xs">
              Clear all filters
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
