import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { message } = body

    if (message?.type === 'end-of-call-report') {
      const { call, transcript, recordingUrl, summary } = message

      // Forward to FastAPI backend for processing
      const backendUrl = process.env.NEXT_PUBLIC_API_URL
      if (backendUrl) {
        await fetch(`${backendUrl}/api/v1/webhooks/vapi`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            call_id: call?.id,
            transcript,
            recording_url: recordingUrl,
            summary,
            metadata: call?.metadata,
          }),
        })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Vapi webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
