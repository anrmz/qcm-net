"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Plus, BarChart3, Users, FileText, LogOut } from "lucide-react"

// Mock data
const mockQuizzes = [
  {
    id: 1,
    title: "TCP/IP Protocol Suite",
    questions: 15,
    students: 24,
    published: true,
    createdAt: "2025-01-15",
  },
  {
    id: 2,
    title: "OSI Model Fundamentals",
    questions: 20,
    students: 18,
    published: true,
    createdAt: "2025-01-10",
  },
  {
    id: 3,
    title: "IP Addressing & Subnetting",
    questions: 12,
    students: 0,
    published: false,
    createdAt: "2025-01-20",
  },
]

export default function TeacherDashboard() {
  const [quizzes] = useState(mockQuizzes)

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
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">Tableau de bord enseignant</span>
            <Link href="/">
              <Button variant="ghost" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Se déconnecter
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total des quiz</CardTitle>
              <FileText className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{quizzes.length}</div>
              <p className="text-xs text-muted-foreground mt-1">{quizzes.filter((q) => q.published).length} publiés</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total des étudiants</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {quizzes.reduce((acc, q) => acc + q.students, 0)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Sur tous les quiz</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total des questions</CardTitle>
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {quizzes.reduce((acc, q) => acc + q.questions, 0)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Dans la banque de questions</p>
            </CardContent>
          </Card>
        </div>

        {/* Quizzes Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Mes quiz</h2>
            <p className="text-sm text-muted-foreground mt-1">Créez et gérez votre collection de quiz</p>
          </div>
          <Link href="/teacher/quiz/create">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Créer un quiz
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{quiz.title}</CardTitle>
                    <CardDescription>{quiz.questions} questions</CardDescription>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      quiz.published ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {quiz.published ? "Publié" : "Brouillon"}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{quiz.students} étudiants</span>
                  </div>
                  <span>{new Date(quiz.createdAt).toLocaleDateString("fr-FR")}</span>
                </div>
                <div className="flex gap-2">
                  <Link href={`/teacher/quiz/${quiz.id}/edit`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Modifier
                    </Button>
                  </Link>
                  <Link href={`/teacher/quiz/${quiz.id}/results`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <BarChart3 className="w-4 h-4 mr-1" />
                      Résultats
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
