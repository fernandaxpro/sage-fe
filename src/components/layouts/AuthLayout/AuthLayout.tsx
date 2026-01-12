import PageHead from "@/components/commons/PageHead"
import { Fragment, ReactNode } from "react";

interface PropTypes {
    children: ReactNode;
    title?: string;
}

const AuthLayout = (props: PropTypes) => {
    const { children, title } = props

    return (
        <Fragment>
            <PageHead title={title} />
            <>
                {children}
            </>
        </Fragment>
    )
}

export default AuthLayout