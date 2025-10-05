"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, CheckCircle2, TrendingUp, LogOut, Play } from "lucide-react"

// Mock data
const mockQuizzes = [
  {
    id: 1,
    title: "Suite de protocoles TCP/IP",
    description: "Testez vos connaissances sur les protocoles TCP/IP et les fondamentaux des réseaux",
    questions: 15,
    duration: 20,
    difficulty: "Intermédiaire",
    completed: true,
    score: 87,
  },
  {
    id: 2,
    title: "Fondamentaux du modèle OSI",
    description: "Quiz complet couvrant les 7 couches du modèle OSI",
    questions: 20,
    duration: 25,
    difficulty: "Débutant",
    completed: true,
    score: 92,
  },
  {
    id: 3,
    title: "Adressage IP et sous-réseaux",
    description: "Maîtrisez l'adressage IP, le sous-réseau et la notation CIDR",
    questions: 12,
    duration: 15,
    difficulty: "Avancé",
    completed: false,
    score: null,
  },
  {
    id: 4,
    title: "Bases de la sécurité réseau",
    description: "Apprenez les pare-feu, le chiffrement et les protocoles de sécurité",
    questions: 18,
    duration: 22,
    difficulty: "Intermédiaire",
    completed: false,
    score: null,
  },
]

export default function StudentDashboard() {
  const [quizzes] = useState(mockQuizzes)
  const completedQuizzes = quizzes.filter((q) => q.completed)
  const averageScore =
    completedQuizzes.length > 0
      ? Math.round(completedQuizzes.reduce((acc, q) => acc + (q.score || 0), 0) / completedQuizzes.length)
      : 0

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
            <span className="text-sm text-muted-foreground hidden sm:inline">Tableau de bord étudiant</span>
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
              <CardTitle className="text-sm font-medium text-muted-foreground">Quiz complétés</CardTitle>
              <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{completedQuizzes.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Sur {quizzes.length} disponibles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Score moyen</CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{averageScore}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                {averageScore >= 80 ? "Excellent travail !" : "Continuez à pratiquer !"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Temps d'étude</CardTitle>
              <Clock className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {completedQuizzes.reduce((acc, q) => acc + q.duration, 0)} min
              </div>
              <p className="text-xs text-muted-foreground mt-1">Temps total investi</p>
            </CardContent>
          </Card>
        </div>

        {/* Available Quizzes */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Quiz disponibles</h2>
          <p className="text-sm text-muted-foreground mb-6">Testez vos connaissances et suivez vos progrès</p>

          <div className="grid md:grid-cols-2 gap-6">
            {quizzes.map((quiz) => (
              <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-lg">{quiz.title}</CardTitle>
                    {quiz.completed && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Complété
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{quiz.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{quiz.questions} questions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{quiz.duration} min</span>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${
                        quiz.difficulty === "Débutant"
                          ? "border-chart-4 text-chart-4"
                          : quiz.difficulty === "Intermédiaire"
                            ? "border-accent text-accent"
                            : "border-destructive text-destructive"
                      }`}
                    >
                      {quiz.difficulty}
                    </Badge>
                  </div>

                  {quiz.completed && quiz.score !== null ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Votre score</span>
                        <span className="text-2xl font-bold text-primary">{quiz.score}%</span>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/student/quiz/${quiz.id}/results`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full bg-transparent">
                            Voir les résultats
                          </Button>
                        </Link>
                        <Link href={`/student/quiz/${quiz.id}`} className="flex-1">
                          <Button size="sm" className="w-full">
                            Refaire le quiz
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <Link href={`/student/quiz/${quiz.id}`}>
                      <Button className="w-full">
                        <Play className="w-4 h-4 mr-2" />
                        Commencer le quiz
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
