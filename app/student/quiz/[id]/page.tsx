"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, ArrowLeft, ArrowRight } from "lucide-react"

// Mock quiz data
const mockQuiz = {
  id: 1,
  title: "TCP/IP Protocol Suite",
  duration: 20,
  questions: [
    {
      id: 1,
      text: "Which layer of the TCP/IP model is responsible for end-to-end communication?",
      options: ["Network Access Layer", "Internet Layer", "Transport Layer", "Application Layer"],
      correctAnswer: 2,
    },
    {
      id: 2,
      text: "What is the primary protocol used at the Internet Layer of TCP/IP?",
      options: ["TCP", "UDP", "IP", "HTTP"],
      correctAnswer: 2,
    },
    {
      id: 3,
      text: "Which protocol provides reliable, connection-oriented communication?",
      options: ["UDP", "TCP", "ICMP", "ARP"],
      correctAnswer: 1,
    },
    {
      id: 4,
      text: "What is the default port number for HTTP?",
      options: ["21", "22", "80", "443"],
      correctAnswer: 2,
    },
    {
      id: 5,
      text: "Which protocol is used to resolve IP addresses to MAC addresses?",
      options: ["DNS", "DHCP", "ARP", "RARP"],
      correctAnswer: 2,
    },
  ],
}

export default function QuizPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(mockQuiz.questions.length).fill(null))
  const [timeRemaining, setTimeRemaining] = useState(mockQuiz.duration * 60) // in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answerIndex
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < mockQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    // Calculate score
    const score = answers.reduce((acc, answer, index) => {
      return answer === mockQuiz.questions[index].correctAnswer ? acc + 1 : acc
    }, 0)
    const percentage = Math.round((score / mockQuiz.questions.length) * 100)

    // Redirect to results page
    router.push(`/student/quiz/${mockQuiz.id}/results?score=${percentage}`)
  }

  const progress = ((currentQuestion + 1) / mockQuiz.questions.length) * 100
  const answeredCount = answers.filter((a) => a !== null).length
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60

  const question = mockQuiz.questions[currentQuestion]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">QCM-Net</span>
            </Link>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span
                  className={`font-mono font-semibold ${timeRemaining < 60 ? "text-destructive" : "text-foreground"}`}
                >
                  {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{mockQuiz.title}</span>
              <span className="text-muted-foreground">
                {answeredCount} / {mockQuiz.questions.length} answered
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {mockQuiz.questions.length}
              </span>
              {answers[currentQuestion] !== null && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Answered</span>
              )}
            </div>
            <CardTitle className="text-xl text-balance">{question.text}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  answers[currentQuestion] === index
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      answers[currentQuestion] === index ? "border-primary bg-primary" : "border-muted-foreground/30"
                    }`}
                  >
                    {answers[currentQuestion] === index && (
                      <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                    )}
                  </div>
                  <span className="text-foreground">{option}</span>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentQuestion === mockQuiz.questions.length - 1 ? (
            <Button onClick={handleSubmit} disabled={answeredCount < mockQuiz.questions.length}>
              Submit Quiz
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>

        {/* Question Navigator */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-sm">Question Navigator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {mockQuiz.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`aspect-square rounded-lg border-2 text-sm font-medium transition-all ${
                    currentQuestion === index
                      ? "border-primary bg-primary text-primary-foreground"
                      : answers[index] !== null
                        ? "border-primary/30 bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
