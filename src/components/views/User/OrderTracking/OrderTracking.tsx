import AppBreadcrumbs from '@/components/ui/AppBreadcrumbs'
import Container from '@/components/ui/Container'
import React from 'react'
import { orderTrackingBreadcrumbs } from './OrderTracking.constant'

const OrderTracking = () => {
  return (
    <Container
        className="flex-col gap-8 py-8 px-4 sm:px-6 lg:px-8"
    >
        <AppBreadcrumbs items={orderTrackingBreadcrumbs} />

        <div className=''>
            <h1 className='text-primary font-semibold text-2xl'>
                Order Tracking
            </h1>
        </div>
    </Container>
  )
}

export default OrderTracking