"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, CheckCircle2, XCircle, Trophy, RotateCcw, Home } from "lucide-react"

// Mock quiz results data
const mockResults = {
  quizTitle: "TCP/IP Protocol Suite",
  totalQuestions: 5,
  questions: [
    {
      id: 1,
      text: "Which layer of the TCP/IP model is responsible for end-to-end communication?",
      options: ["Network Access Layer", "Internet Layer", "Transport Layer", "Application Layer"],
      correctAnswer: 2,
      userAnswer: 2,
      explanation: "The Transport Layer handles end-to-end communication between applications.",
    },
    {
      id: 2,
      text: "What is the primary protocol used at the Internet Layer of TCP/IP?",
      options: ["TCP", "UDP", "IP", "HTTP"],
      correctAnswer: 2,
      userAnswer: 0,
      explanation:
        "IP (Internet Protocol) is the primary protocol at the Internet Layer, responsible for routing packets.",
    },
    {
      id: 3,
      text: "Which protocol provides reliable, connection-oriented communication?",
      options: ["UDP", "TCP", "ICMP", "ARP"],
      correctAnswer: 1,
      userAnswer: 1,
      explanation: "TCP provides reliable, connection-oriented communication with error checking and retransmission.",
    },
    {
      id: 4,
      text: "What is the default port number for HTTP?",
      options: ["21", "22", "80", "443"],
      correctAnswer: 2,
      userAnswer: 2,
      explanation: "Port 80 is the default port for HTTP traffic. Port 443 is used for HTTPS.",
    },
    {
      id: 5,
      text: "Which protocol is used to resolve IP addresses to MAC addresses?",
      options: ["DNS", "DHCP", "ARP", "RARP"],
      correctAnswer: 2,
      userAnswer: 1,
      explanation: "ARP (Address Resolution Protocol) resolves IP addresses to MAC addresses on a local network.",
    },
  ],
}

export default function QuizResultsPage() {
  const searchParams = useSearchParams()
  const score = Number.parseInt(searchParams.get("score") || "0")
  const correctAnswers = mockResults.questions.filter((q) => q.userAnswer === q.correctAnswer).length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">QCM-Net</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Score Card */}
        <Card className="mb-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-4">
                <Trophy className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Quiz Complete!</h1>
              <p className="text-muted-foreground mb-6">{mockResults.quizTitle}</p>
              <div className="flex items-center justify-center gap-8 mb-6">
                <div>
                  <div className="text-5xl font-bold text-primary mb-1">{score}%</div>
                  <p className="text-sm text-muted-foreground">Your Score</p>
                </div>
                <div className="h-16 w-px bg-border" />
                <div>
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {correctAnswers}/{mockResults.totalQuestions}
                  </div>
                  <p className="text-sm text-muted-foreground">Correct Answers</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/student/dashboard">
                  <Button variant="outline">
                    <Home className="w-4 h-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </Link>
                <Link href={`/student/quiz/${mockResults.questions[0].id}`}>
                  <Button>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Retake Quiz
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <h2 className="text-2xl font-bold text-foreground mb-4">Review Your Answers</h2>
        <div className="space-y-6">
          {mockResults.questions.map((question, index) => {
            const isCorrect = question.userAnswer === question.correctAnswer
            return (
              <Card key={question.id} className={isCorrect ? "border-primary/30" : "border-destructive/30"}>
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isCorrect ? "bg-primary/10" : "bg-destructive/10"
                      }`}
                    >
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      ) : (
                        <XCircle className="w-5 h-5 text-destructive" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-muted-foreground">Question {index + 1}</span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            isCorrect ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                          }`}
                        >
                          {isCorrect ? "Correct" : "Incorrect"}
                        </span>
                      </div>
                      <CardTitle className="text-lg text-balance">{question.text}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => {
                      const isUserAnswer = question.userAnswer === optionIndex
                      const isCorrectAnswer = question.correctAnswer === optionIndex

                      return (
                        <div
                          key={optionIndex}
                          className={`p-3 rounded-lg border-2 ${
                            isCorrectAnswer
                              ? "border-primary bg-primary/5"
                              : isUserAnswer
                                ? "border-destructive bg-destructive/5"
                                : "border-border"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {isCorrectAnswer && <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />}
                            {isUserAnswer && !isCorrectAnswer && (
                              <XCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                            )}
                            <span className={isCorrectAnswer || isUserAnswer ? "font-medium" : ""}>{option}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-foreground mb-1">Explanation</p>
                    <p className="text-sm text-muted-foreground">{question.explanation}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
