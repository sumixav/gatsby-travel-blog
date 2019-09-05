import React from 'react'
import './home.css'
import { StaticQuery, graphql, navigate } from 'gatsby'

export default () => (
    <StaticQuery
        query={graphql`
query HomeQuery {
    allContentfulBlog (
        limit: 9,
        sort : {fields: [createdAt], order: DESC}
        filter:{
            node_locale: {eq: "en-US"}
            home: {eq: true}
        
        }
    ) {
        edges {
            node {
                id
                slug
                title
                category {
                    title
                    id
                }
                featuredImage {
                    fluid(maxWidth: 1200, quality: 85){
                        src
                        ...GatsbyContentfulFluid
                    }
                }
            }
        }
    }
}

`}
        render={data => {
            console.log(data)
            return (
                <div className='feed'>
                    {data.allContentfulBlog.edges.map(edge => {
                        console.log(edge.node)
                        return (
                            <div key={edge.node.id} className='card'
                                style={
                                    {
                                        backgroundImage: `
                                    linear-gradient(
                                to bottom,
                                rgba(10, 10, 10, 0) 0%,
                                rgba(10, 10, 10, 0) 60%,
                                rgba(10, 10, 10, 0.7) 100%),
                                url(${edge.node.featuredImage.fluid.src})
                              `
                                    }
                                }
                                onClick={() => navigate(`/blog/${edge.node.slug}`)}
                            >
                                {edge.node.category.map(category =>
                                    <p key={category.id} className='card__category'>{category.title}</p>
                                )}
                                <p className='card__title'>{edge.node.title}</p>
                            </div>
                        )
                    })}
                </div>
            )
        }}
    />

)