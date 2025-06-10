import Link from "next/link"
import { MapPin, Clock, DollarSign, Building2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export type JobType = "Full-time" | "Part-time" | "Contract" | "Remote" | "Hybrid"
export type JobCategory = "Frontend Developer" | "Backend Developer" | "Full Stack Developer" | "DevOps Engineer" | "Data Scientist" | "UI/UX Designer" | "Mobile Developer" | "Quality Assurance"

export interface Job {
  id: string
  title: string
  company: string
  companyLogo?: string
  location: string
  type: JobType
  category: JobCategory
  salary: {
    min: number
    max: number
    currency: string
  }
  experience: string
  postedDate: string
  description: string
  skills: string[]
  applicants?: number
  isHot?: boolean
  isUrgent?: boolean
}

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  const formatSalary = (min: number, max: number, currency: string) => {
    if (min === max) {
      return `${currency} ${min.toLocaleString()}`
    }
    return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return `${Math.floor(diffDays / 30)} months ago`
  }

  const getTypeVariant = (type: string) => {
    switch (type) {
      case "Remote":
        return "default"
      case "Full-time":
        return "secondary"
      case "Part-time":
        return "outline"
      case "Contract":
        return "destructive"
      case "Hybrid":
        return "secondary"
      default:
        return "outline"
    }
  }

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const jobSlug = `${slugify(job.title)}-${slugify(job.company)}-${job.id}`

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border-border/50 hover:border-border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            {/* Company Logo */}
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <Link 
                  href={`/jobs/${jobSlug}`}
                  className="font-semibold text-lg hover:text-blue-600 transition-colors line-clamp-1"
                >
                  {job.title}
                </Link>
                {job.isHot && (
                  <Badge className="bg-red-500 text-white text-xs">Hot</Badge>
                )}
                {job.isUrgent && (
                  <Badge variant="destructive" className="text-xs">Urgent</Badge>
                )}
              </div>
              
              <Link 
                href={`/companies/${slugify(job.company)}`}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {job.company}
              </Link>
              
              <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatDate(job.postedDate)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="py-3">
        <div className="space-y-3">
          {/* Job Type and Category */}
          <div className="flex items-center space-x-2 flex-wrap gap-1">
            <Badge variant={getTypeVariant(job.type)}>{job.type}</Badge>
            <Badge variant="outline">{job.category}</Badge>
            <Badge variant="outline">{job.experience}</Badge>
          </div>

          {/* Salary */}
          <div className="flex items-center space-x-1 text-sm">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span className="font-medium text-green-600">
              {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
            </span>
            <span className="text-muted-foreground">per month</span>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {job.description}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-1">
            {job.skills.slice(0, 4).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {job.skills.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{job.skills.length - 4} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            {job.applicants && (
              <>
                <Users className="h-4 w-4" />
                <span>{job.applicants} applicants</span>
              </>
            )}
          </div>
          
          <Link href={`/jobs/${jobSlug}`}>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
            >
              View Details
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}