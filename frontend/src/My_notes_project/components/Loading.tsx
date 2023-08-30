import React from 'react'
import { BallTriangle } from 'react-loader-spinner'
import styled from 'styled-components'

export default function Loading() {

    return (
        <StyledLoading>
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
            // wrapperClass={{}}
            // wrapperStyle=""
            // visible={true}
            />
        </StyledLoading>

    )
}
const StyledLoading = styled.div`
min-height:100vh ;
background-color: #fff;
display: flex;
align-items: center;
justify-content: center; 
`
