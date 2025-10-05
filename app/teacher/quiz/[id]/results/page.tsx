"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, ArrowLeft, TrendingUp, Users, Award } from "lucide-react"

// Mock teacher results data
const mockTeacherResults = {
  quizTitle: "TCP/IP Protocol Suite",
  totalQuestions: 5,
  students: [
    { id: 1, name: "Alice Johnson", score: 100, completedAt: "2025-01-20 14:30", timeSpent: 18 },
    { id: 2, name: "Bob Smith", score: 80, completedAt: "2025-01-20 15:45", timeSpent: 20 },
    { id: 3, name: "Carol Williams", score: 60, completedAt: "2025-01-21 09:15", timeSpent: 22 },
    { id: 4, name: "David Brown", score: 100, completedAt: "2025-01-21 10:30", timeSpent: 16 },
    { id: 5, name: "Emma Davis", score: 80, completedAt: "2025-01-21 11:20", timeSpent: 19 },
  ],
  questionStats: [
    { question: "Which layer handles end-to-end communication?", correctRate: 100 },
    { question: "Primary protocol at Internet Layer?", correctRate: 60 },
    { question: "Which protocol is connection-oriented?", correctRate: 100 },
    { question: "Default port for HTTP?", correctRate: 80 },
    { question: "Protocol to resolve IP to MAC?", correctRate: 60 },
  ],
}

export default function TeacherResultsPage() {
  const averageScore =
    mockTeacherResults.students.reduce((acc, s) => acc + s.score, 0) / mockTeacherResults.students.length
  const averageTime =
    mockTeacherResults.students.reduce((acc, s) => acc + s.timeSpent, 0) / mockTeacherResults.students.length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">QCM-Net</span>
          </Link>
          <Link href="/teacher/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{mockTeacherResults.quizTitle}</h1>
          <p className="text-muted-foreground">Student performance and quiz analytics</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Students Completed</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{mockTeacherResults.students.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Total submissions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Score</CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{Math.round(averageScore)}%</div>
              <p className="text-xs text-muted-foreground mt-1">Class performance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Time</CardTitle>
              <Award className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{Math.round(averageTime)} min</div>
              <p className="text-xs text-muted-foreground mt-1">Completion time</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Student Results */}
          <Card>
            <CardHeader>
              <CardTitle>Student Results</CardTitle>
              <CardDescription>Individual performance breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockTeacherResults.students.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{student.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(student.completedAt).toLocaleString()} • {student.timeSpent} min
                      </p>
                    </div>
                    <div
                      className={`text-lg font-bold ${
                        student.score >= 80 ? "text-primary" : student.score >= 60 ? "text-accent" : "text-destructive"
                      }`}
                    >
                      {student.score}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Question Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Question Statistics</CardTitle>
              <CardDescription>Success rate per question</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTeacherResults.questionStats.map((stat, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-foreground font-medium">Q{index + 1}</p>
                      <span className="text-sm font-semibold text-foreground">{stat.correctRate}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          stat.correctRate >= 80
                            ? "bg-primary"
                            : stat.correctRate >= 60
                              ? "bg-accent"
                              : "bg-destructive"
                        }`}
                        style={{ width: `${stat.correctRate}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 text-pretty">{stat.question}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
