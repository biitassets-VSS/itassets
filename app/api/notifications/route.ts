import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    notifications: [],
    message: "Notifications API ready - connect database to see data"
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  return NextResponse.json({
    message: "Notification creation endpoint ready - connect database to save data",
    received: body
  })
}