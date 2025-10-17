'use server'

import { redirect } from 'next/navigation'
import { createApplication } from '@/app/repository/applications-repository'

export async function applyOrder(orderId: string, formData: FormData) {
  const message = String(formData.get('message') || '')
  const proposedBudget = Number(formData.get('proposedBudget') || 0)

  if (!orderId || !message || !proposedBudget || Number.isNaN(proposedBudget) || proposedBudget <= 0) {
    return
  }

  await createApplication({
    projectId: orderId,
    applicantId: '2',
    message,
    proposedBudget,
    status: 'pending',
  })

  redirect('/orders')
}