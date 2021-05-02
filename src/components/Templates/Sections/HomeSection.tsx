import React from 'react'

const HomeSection = (props: any) => {
    const { image, descriptions } = props
    return (
        <div>
            <img src={image} alt="" />
        </div>
    )
}

export default HomeSection
