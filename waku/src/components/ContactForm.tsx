"use client"

import React, { useEffect, useRef, useState } from "react"
import { useActionState } from "react"
import { Loader2, CheckCircle2, XCircle } from "lucide-react"
import { sendMessage } from "../actions/actions"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Button } from "../components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"

const ContactForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [response, submitAction, pending] = useActionState(sendMessage, null);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleSubmit = async (formData: FormData) => {
    console.log('handleSubmit run');
    const result = await submitAction(formData);
    setShowAlert(true);
    // @ts-expect-error
    if (result === "ok") {
      formRef.current?.reset();;
    }
  }

  useEffect(() => {
    if (response && response.message !== null) {
      const timer = setTimeout(() => {
        setShowAlert(false)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [response])

  return (
    <Card className="max-w-md w-full mx-auto mt-10 shadow-xl rounded-2xl p-6">
      <CardContent>
        <form
          ref={formRef}
          action={handleSubmit}
          className="space-y-4"
        >
          <Input name="name" placeholder="Your Name" required />
          <Input name="email" type="email" placeholder="Your Email" required />
          <Input name="subject" placeholder="Subject" required />
          <Textarea name="message" placeholder="Your Message" rows={5} required />

          <Button
            type="submit"
            className="w-full"
            disabled={pending}
          >
            {pending && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
            {pending ? "Sending..." : "Send Message"}
          </Button>

          {showAlert && response && response.message === "ok" && (
            <Alert variant="default" className="mt-4">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <AlertTitle>Message Sent</AlertTitle>
              <AlertDescription>Your message was successfully sent!</AlertDescription>
            </Alert>
          )}

          {showAlert && response && response.message !== 'ok' && (
            <Alert variant="destructive" className="mt-4">
              <XCircle className="h-4 w-4 text-red-500" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{response.message}</AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

export default ContactForm;