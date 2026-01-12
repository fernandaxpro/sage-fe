import PageHead from '@/components/commons/PageHead';
import React, { Fragment, ReactNode } from 'react'
import HomepageLayoutNavbar from './HomepageLayoutNavbar';
import HomepageLayoutFooter from './HomepageLayoutFooter';

interface PropTypes {
    title: string;
    children: ReactNode
}

const HomepageLayout = (props: PropTypes) => {
    const { children, title } = props

  return (
    <Fragment>
        <PageHead title={title} />
        <HomepageLayoutNavbar />
        <div>
            {children}
        </div>
        <HomepageLayoutFooter />
    </Fragment>
  )
}

export default HomepageLayout