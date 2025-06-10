"use client"

import * as React from "react"
import { JobCard, type Job } from "@/components/JobCard"
import { JobFilter, type JobFilters } from "@/components/ClientSide/JobFilter"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown, Grid, List } from "lucide-react"

// Dummy data - Replace with actual API call
const DUMMY_JOBS: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "Brain Station 23",
    location: "Dhaka",
    type: "Full-time",
    category: "Frontend Developer",
    salary: { min: 80000, max: 120000, currency: "৳" },
    experience: "Senior (5+ years)",
    postedDate: "2024-01-10",
    description: "We are looking for an experienced Frontend Developer to join our dynamic team. You will be responsible for building user-facing features using React, TypeScript, and modern web technologies.",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "JavaScript"],
    applicants: 24,
    isHot: true
  },
  {
    id: "2",
    title: "Backend Developer",
    company: "BJIT Group",
    location: "Chittagong",
    type: "Full-time",
    category: "Backend Developer",
    salary: { min: 60000, max: 90000, currency: "৳" },
    experience: "Mid Level (3-5 years)",
    postedDate: "2024-01-08",
    description: "Join our backend team to develop scalable APIs and microservices. Experience with Node.js, Python, and cloud technologies required.",
    skills: ["Node.js", "Python", "PostgreSQL", "AWS", "Docker"],
    applicants: 18
  },
  {
    id: "3",
    title: "UI/UX Designer",
    company: "Tiger IT",
    location: "Remote",
    type: "Remote",
    category: "UI/UX Designer",
    salary: { min: 50000, max: 75000, currency: "৳" },
    experience: "Junior (1-3 years)",
    postedDate: "2024-01-09",
    description: "Create beautiful and intuitive user interfaces for our web and mobile applications. Strong portfolio and knowledge of design tools required.",
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"],
    applicants: 31,
    isUrgent: true
  },
  {
    id: "4",
    title: "Full Stack Developer",
    company: "DataSoft",
    location: "Dhaka",
    type: "Hybrid",
    category: "Full Stack Developer",
    salary: { min: 70000, max: 100000, currency: "৳" },
    experience: "Mid Level (3-5 years)",
    postedDate: "2024-01-07",
    description: "Work on both frontend and backend development using modern tech stack. Experience with React, Node.js, and database design required.",
    skills: ["React", "Node.js", "MongoDB", "Express.js", "TypeScript"],
    applicants: 42
  },
  {
    id: "5",
    title: "DevOps Engineer",
    company: "Samsung R&D",
    location: "Dhaka",
    type: "Full-time",
    category: "DevOps Engineer",
    salary: { min: 90000, max: 130000, currency: "৳" },
    experience: "Senior (5+ years)",
    postedDate: "2024-01-06",
    description: "Manage and optimize our cloud infrastructure. Experience with Kubernetes, Docker, and CI/CD pipelines essential.",
    skills: ["Kubernetes", "Docker", "AWS", "Jenkins", "Terraform"],
    applicants: 15,
    isHot: true
  },
  {
    id: "6",
    title: "Data Scientist",
    company: "Optimizely",
    location: "Remote",
    type: "Remote",
    category: "Data Scientist",
    salary: { min: 85000, max: 125000, currency: "৳" },
    experience: "Mid Level (3-5 years)",
    postedDate: "2024-01-05",
    description: "Analyze complex datasets and build machine learning models to drive business insights and decision making.",
    skills: ["Python", "R", "Machine Learning", "SQL", "TensorFlow"],
    applicants: 28
  },
  {
    id: "7",
    title: "Mobile App Developer",
    company: "Brain Station 23",
    location: "Sylhet",
    type: "Full-time",
    category: "Mobile Developer",
    salary: { min: 55000, max: 80000, currency: "৳" },
    experience: "Junior (1-3 years)",
    postedDate: "2024-01-04",
    description: "Develop native and cross-platform mobile applications for iOS and Android using React Native and Flutter.",
    skills: ["React Native", "Flutter", "iOS", "Android", "JavaScript"],
    applicants: 36
  },
  {
    id: "8",
    title: "Quality Assurance Engineer",
    company: "Tiger IT",
    location: "Dhaka",
    type: "Part-time",
    category: "Quality Assurance",
    salary: { min: 35000, max: 50000, currency: "৳" },
    experience: "Entry Level (0-1 years)",
    postedDate: "2024-01-03",
    description: "Ensure software quality through manual and automated testing. Create test plans, execute test cases, and report bugs.",
    skills: ["Manual Testing", "Selenium", "API Testing", "Bug Tracking", "Test Planning"],
    applicants: 19
  }
]

export default function JobsPage() {
  const [filters, setFilters] = React.useState<JobFilters>({
    search: "",
    location: "all",
    jobType: [],
    category: [],
    experience: "all",
    salaryRange: [0, 200000],
    postedWithin: "all"
  })
  
  const [sortBy, setSortBy] = React.useState("date")
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")

  // Filter jobs based on current filters
  const filteredJobs = React.useMemo(() => {
    let jobs = [...DUMMY_JOBS]

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      jobs = jobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm))
      )
    }

    // Location filter
    if (filters.location && filters.location !== "all") {
      jobs = jobs.filter(job => 
        job.location.toLowerCase() === filters.location ||
        (filters.location === "remote" && job.type === "Remote") ||
        (filters.location === "hybrid" && job.type === "Hybrid")
      )
    }

    // Job type filter
    if (filters.jobType.length > 0) {
      jobs = jobs.filter(job => 
        filters.jobType.some(type => 
          job.type.toLowerCase().replace("-", "").includes(type.replace("-", ""))
        )
      )
    }

    // Category filter
    if (filters.category.length > 0) {
      jobs = jobs.filter(job => 
        filters.category.some(cat => 
          job.category.toLowerCase().replace(/\s+/g, "-").includes(cat)
        )
      )
    }

    // Experience filter
    if (filters.experience && filters.experience !== "all") {
      const expMap: { [key: string]: string[] } = {
        "entry": ["Entry Level"],
        "junior": ["Junior"],
        "mid": ["Mid Level"],
        "senior": ["Senior"],
        "lead": ["Lead", "Principal"]
      }
      const expTerms = expMap[filters.experience] || []
      jobs = jobs.filter(job => 
        expTerms.some(term => job.experience.includes(term))
      )
    }

    // Salary range filter
    if (filters.salaryRange[0] > 0 || filters.salaryRange[1] < 200000) {
      jobs = jobs.filter(job => 
        job.salary.min >= filters.salaryRange[0] &&
        job.salary.max <= filters.salaryRange[1]
      )
    }

    // Posted within filter
    if (filters.postedWithin && filters.postedWithin !== "all") {
      const now = new Date()
      let dateThreshold = new Date()
      
      switch (filters.postedWithin) {
        case "24h":
          dateThreshold.setDate(now.getDate() - 1)
          break
        case "3d":
          dateThreshold.setDate(now.getDate() - 3)
          break
        case "week":
          dateThreshold.setDate(now.getDate() - 7)
          break
        case "month":
          dateThreshold.setMonth(now.getMonth() - 1)
          break
        default:
          dateThreshold = new Date(0) // All time
      }
      
      jobs = jobs.filter(job => new Date(job.postedDate) >= dateThreshold)
    }

    return jobs
  }, [filters])

  // Sort jobs
  const sortedJobs = React.useMemo(() => {
    const jobs = [...filteredJobs]
    
    switch (sortBy) {
      case "date":
        return jobs.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())
      case "salary":
        return jobs.sort((a, b) => b.salary.max - a.salary.max)
      case "title":
        return jobs.sort((a, b) => a.title.localeCompare(b.title))
      case "company":
        return jobs.sort((a, b) => a.company.localeCompare(b.company))
      default:
        return jobs
    }
  }, [filteredJobs, sortBy])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Your Dream IT Job</h1>
        <p className="text-muted-foreground">
          Discover {DUMMY_JOBS.length}+ opportunities from top companies in Bangladesh
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <JobFilter 
          filters={filters} 
          onFiltersChange={setFilters} 
          totalJobs={filteredJobs.length} 
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">
            Showing {sortedJobs.length} of {filteredJobs.length} jobs
          </span>
        </div>

        <div className="flex items-center space-x-4">
          {/* Sort */}
          <div className="flex items-center space-x-2">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Latest First</SelectItem>
                <SelectItem value="salary">Highest Salary</SelectItem>
                <SelectItem value="title">Job Title A-Z</SelectItem>
                <SelectItem value="company">Company A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* View Mode */}
          <div className="flex items-center border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Jobs Grid/List */}
      {sortedJobs.length > 0 ? (
        <div className={viewMode === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
        }>
          {sortedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            <Grid className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No jobs found</h3>
            <p>Try adjusting your filters to find more opportunities</p>
          </div>
          <Button variant="outline" onClick={() => setFilters({
            search: "",
            location: "all",
            jobType: [],
            category: [],
            experience: "all",
            salaryRange: [0, 200000],
            postedWithin: "all"
          })}>
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Load More (for pagination) */}
      {sortedJobs.length > 0 && sortedJobs.length >= 20 && (
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Jobs
          </Button>
        </div>
      )}
    </div>
  )
}