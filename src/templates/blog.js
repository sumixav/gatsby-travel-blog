import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Nav from '../components/nav'
import SEO from '../components/seo'
import './blog.css'

export const query = graphql`
query MyQuery($id: String) {
  contentfulBlog(id: {eq: $id}) {
    category {
      id
      slug
      title
    }
    content {
      childMarkdownRemark{
        html
      }
    }
    id
    seoAuthor
    seoDescription
    seoKeywords
    seoImage {
      fluid(maxWidth: 1200, quality: 100) {
        ...GatsbyContentfulFluid,
        src
      }
    }
    seoTitle
    title
    seoUrl
    shortDescription
    featuredImage {
      fluid(maxWidth: 1200, quality: 100) {
        ...GatsbyContentfulFluid,
        src
      }
    }
  }
}

`



const BlogTemplate = (props) => {
  const { data } = props
  const { contentfulBlog } = data
  const { seoTitle, seoDescription, seoKeywords, featuredImage, title, content } = contentfulBlog;
  console.log(featuredImage.fluid.src)
  console.log(title)
  return (
    <Layout>
      <SEO title={seoTitle} description={seoDescription} keywords={seoKeywords} />
      <Nav />
      <div className="blog__header">
        <div className='blog__hero' style={{
          backgroundImage: `url(${featuredImage.fluid.src})`
        }}>
        </div>
        <div className='blog__info'>
          <h1 className='blog__title'>{title}</h1>
        </div>
      </div>
      <div className="blog__wrapper">
        <div className="blog__content">
          <div dangerouslySetInnerHTML={
            { __html: `${content.childMarkdownRemark.html}` }
          }></div>
        </div>
      </div>
    </Layout>
  )
}

export default BlogTemplate;




