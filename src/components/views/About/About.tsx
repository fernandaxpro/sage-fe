import AppBreadcrumbs, { BreadcrumbItemType } from '@/components/ui/AppBreadcrumbs';
import Container from '@/components/ui/Container'
import React from 'react'

const About = () => {
    const breadcrumbItems: BreadcrumbItemType[] = [
        {
          label: 'Home',
          href: '/'
        },
        {
          label: 'About',
        },
      ];
    return (
        <Container className="flex-col gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 py-6">
            <AppBreadcrumbs items={breadcrumbItems} />

            <div></div>
        </Container>
    )
}

export default About