import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData()
    const status = body.get('MessageStatus')
    const messageSid = body.get('MessageSid')
    const to = body.get('To')

    // Forward delivery status to backend
    const backendUrl = process.env.NEXT_PUBLIC_API_URL
    if (backendUrl && messageSid) {
      await fetch(`${backendUrl}/api/v1/webhooks/twilio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message_sid: messageSid, status, to }),
      })
    }

    return new NextResponse('', { status: 200 })
  } catch (error) {
    console.error('Twilio webhook error:', error)
    return new NextResponse('', { status: 500 })
  }
}
