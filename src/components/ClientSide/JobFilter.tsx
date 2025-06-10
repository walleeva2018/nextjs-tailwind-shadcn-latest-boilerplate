"use client"

import * as React from "react"
import { Search, Filter, X, MapPin, Briefcase, Clock, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export type JobType = "full-time" | "part-time" | "contract" | "remote" | "hybrid"
export type JobCategory = "frontend" | "backend" | "fullstack" | "devops" | "data-science" | "ui-ux" | "mobile" | "qa"
export type ExperienceLevel = "entry" | "junior" | "mid" | "senior" | "lead"
export type TimeRange = "24h" | "3d" | "week" | "month" | "all"
export type Location = "dhaka" | "chittagong" | "sylhet" | "rajshahi" | "khulna" | "remote" | "hybrid"

export interface JobFilters {
  search: string
  location: Location | "all"
  jobType: JobType[]
  category: JobCategory[]
  experience: ExperienceLevel | "all"
  salaryRange: [number, number]
  postedWithin: TimeRange | "all"
}

interface JobFilterProps {
  filters: JobFilters
  onFiltersChange: (filters: JobFilters) => void
  totalJobs: number
}

export function JobFilter({ filters, onFiltersChange, totalJobs }: JobFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false)

  const jobTypes: Array<{ id: JobType; label: string; count: number }> = [
    { id: "full-time", label: "Full-time", count: 245 },
    { id: "part-time", label: "Part-time", count: 67 },
    { id: "contract", label: "Contract", count: 89 },
    { id: "remote", label: "Remote", count: 156 },
    { id: "hybrid", label: "Hybrid", count: 134 }
  ]

  const categories: Array<{ id: JobCategory; label: string; count: number }> = [
    { id: "frontend", label: "Frontend Developer", count: 123 },
    { id: "backend", label: "Backend Developer", count: 98 },
    { id: "fullstack", label: "Full Stack Developer", count: 87 },
    { id: "devops", label: "DevOps Engineer", count: 45 },
    { id: "data-science", label: "Data Scientist", count: 34 },
    { id: "ui-ux", label: "UI/UX Designer", count: 67 },
    { id: "mobile", label: "Mobile Developer", count: 56 },
    { id: "qa", label: "Quality Assurance", count: 43 }
  ]

  const experienceLevels: Array<{ value: ExperienceLevel; label: string }> = [
    { value: "entry", label: "Entry Level (0-1 years)" },
    { value: "junior", label: "Junior (1-3 years)" },
    { value: "mid", label: "Mid Level (3-5 years)" },
    { value: "senior", label: "Senior (5+ years)" },
    { value: "lead", label: "Lead/Principal (8+ years)" }
  ]

  const timeRanges: Array<{ value: TimeRange; label: string }> = [
    { value: "24h", label: "Last 24 hours" },
    { value: "3d", label: "Last 3 days" },
    { value: "week", label: "Last week" },
    { value: "month", label: "Last month" },
    { value: "all", label: "All time" }
  ]

  const locations: Location[] = [
    "dhaka", "chittagong", "sylhet", "rajshahi", "khulna", "remote", "hybrid"
  ]

  const updateFilters = (updates: Partial<JobFilters>) => {
    onFiltersChange({ ...filters, ...updates })
  }

  const toggleJobType = (type: JobType) => {
    const newTypes = filters.jobType.includes(type)
      ? filters.jobType.filter(t => t !== type)
      : [...filters.jobType, type]
    updateFilters({ jobType: newTypes })
  }

  const toggleCategory = (category: JobCategory) => {
    const newCategories = filters.category.includes(category)
      ? filters.category.filter(c => c !== category)
      : [...filters.category, category]
    updateFilters({ category: newCategories })
  }

  const clearAllFilters = () => {
    onFiltersChange({
      search: "",
      location: "all",
      jobType: [],
      category: [],
      experience: "all",
      salaryRange: [0, 200000],
      postedWithin: "all"
    })
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.search) count++
    if (filters.location && filters.location !== "all") count++
    if (filters.jobType.length > 0) count++
    if (filters.category.length > 0) count++
    if (filters.experience && filters.experience !== "all") count++
    if (filters.postedWithin && filters.postedWithin !== "all") count++
    if (filters.salaryRange[0] > 0 || filters.salaryRange[1] < 200000) count++
    return count
  }

  return (
    <div className="space-y-6">
      {/* Search and Quick Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Find Your Perfect Job</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs, companies, skills..."
              value={filters.search}
              onChange={(e) => updateFilters({ search: e.target.value })}
              className="pl-10"
            />
          </div>

          {/* Location and Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select value={filters.location} onValueChange={(value: Location | "all") => updateFilters({ location: value })}>
              <SelectTrigger>
                <MapPin className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location.charAt(0).toUpperCase() + location.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.experience} onValueChange={(value: ExperienceLevel | "all") => updateFilters({ experience: value })}>
              <SelectTrigger>
                <Briefcase className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {experienceLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Filter Toggle Button */}
          <div className="flex items-center justify-between pt-2">
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>Advanced Filters</span>
              {getActiveFiltersCount() > 0 && (
                <Badge variant="secondary">{getActiveFiltersCount()}</Badge>
              )}
            </Button>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {totalJobs} jobs found
              </span>
              {getActiveFiltersCount() > 0 && (
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Clear all
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <CollapsibleContent>
          <Card>
            <CardContent className="pt-6 space-y-6">
              {/* Job Type */}
              <div className="space-y-3">
                <Label className="text-base font-medium flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Job Type
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {jobTypes.map((type) => (
                    <div key={type.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={type.id}
                        checked={filters.jobType.includes(type.id)}
                        onCheckedChange={() => toggleJobType(type.id)}
                      />
                      <Label htmlFor={type.id} className="text-sm font-normal cursor-pointer">
                        {type.label} ({type.count})
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="space-y-3">
                <Label className="text-base font-medium flex items-center">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Category
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={category.id}
                        checked={filters.category.includes(category.id)}
                        onCheckedChange={() => toggleCategory(category.id)}
                      />
                      <Label htmlFor={category.id} className="text-sm font-normal cursor-pointer">
                        {category.label} ({category.count})
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Salary Range */}
              <div className="space-y-3">
                <Label className="text-base font-medium flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Salary Range (BDT per month)
                </Label>
                <div className="space-y-4">
                  <Slider
                    value={filters.salaryRange}
                    onValueChange={(value) => updateFilters({ salaryRange: value as [number, number] })}
                    max={200000}
                    min={0}
                    step={5000}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>৳{filters.salaryRange[0].toLocaleString()}</span>
                    <span>৳{filters.salaryRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Posted Within */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Posted Within</Label>
                <Select value={filters.postedWithin} onValueChange={(value: TimeRange | "all") => updateFilters({ postedWithin: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All time</SelectItem>
                    {timeRanges.filter(range => range.value !== "all").map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      {/* Active Filters */}
      {getActiveFiltersCount() > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 flex-wrap gap-2">
              <span className="text-sm font-medium">Active filters:</span>
              {filters.search && (
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <span>Search: {filters.search}</span>
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => updateFilters({ search: "" })}
                  />
                </Badge>
              )}
              {filters.location && filters.location !== "all" && (
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <span>Location: {filters.location}</span>
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => updateFilters({ location: "all" })}
                  />
                </Badge>
              )}
              {filters.jobType.map((type) => (
                <Badge key={type} variant="secondary" className="flex items-center space-x-1">
                  <span>{type}</span>
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => toggleJobType(type)}
                  />
                </Badge>
              ))}
              {filters.category.map((cat) => (
                <Badge key={cat} variant="secondary" className="flex items-center space-x-1">
                  <span>{cat}</span>
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => toggleCategory(cat)}
                  />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}