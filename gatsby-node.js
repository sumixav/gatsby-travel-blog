const path = require('path');

const makeRequest = (graphql, request) => new Promise((resolve, reject) => {
  resolve(
    graphql(request).then(result => {
      if (result.errors) {
        reject(result.errors)
      }
      return result;
    })
  )
})

//create pages for each blog
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const blogPostTemplate = path.resolve(`src/templates/blog.js`);
  const getBlog = makeRequest(graphql, `
    {
        allContentfulBlog(sort: {fields: createdAt, order: DESC}, filter: {node_locale: {eq: "en-US"}}) {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
      
    `).then(result => {
    result.data.allContentfulBlog.edges.forEach(({ node }) =>
      createPage({
        path: `blog/${node.slug}`,
        component: blogPostTemplate,
        context: { //pass as props to page
          id: node.id
        }
      })
    )
  });

  //create archive page for all blogs, including pagination for each blog
  const getArchive = makeRequest(graphql, `
    {
        allContentfulBlog(sort: {fields: createdAt, order: DESC}, filter: {node_locale: {eq: "en-US"}}) {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
      
    `).then(result => {
    const archiveTemplate = path.resolve(`src/templates/archive.js`);
    const blogs = result.data.allContentfulBlog.edges
    const blogsPerPage = 9;
    const noOfPages = Math.ceil(blogs.length / 9)
    Array.from({ length: noOfPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? '/blog' : `/blog/${i + 1}`,
        component: path.resolve(archiveTemplate),
        context: {
          limit: blogsPerPage,
          skip: i * blogsPerPage,
          noOfPages,
          currentPage: i + 1
        }
      })
    })
  })

  //create travel categry page, including pagination 
  const getTravel = makeRequest(graphql, `
    query MyQuery {
      allContentfulBlog(filter: {node_locale: {eq: "en-US"}, category: {elemMatch: {title: {eq: "Travel"}}}}, sort: {order: DESC, fields: createdAt}) {
        edges {
          node {
            id
            title
          }
        }
      }
    }
    
      
    `).then(result => {
    const travelTemplate = path.resolve(`src/templates/travel.js`);
    const blogs = result.data.allContentfulBlog.edges
    const blogsPerPage = 9;
    const noOfPages = Math.ceil(blogs.length / 9)
    Array.from({ length: noOfPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? '/category/travel' : `/category/travel/${i + 1}`,
        component: path.resolve(travelTemplate),
        context: {
          limit: blogsPerPage,
          skip: i * blogsPerPage,
          noOfPages,
          currentPage: i + 1
        }
      })
    })
  })

  //create guide categry page, including pagination 
  const getGuide = makeRequest(graphql, `
        query MyQuery {
          allContentfulBlog(filter: {node_locale: {eq: "en-US"}, category: {elemMatch: {title: {eq: "Guide"}}}}, sort: {order: DESC, fields: createdAt}) {
            edges {
              node {
                id
                title
              }
            }
          }
        }
        
          
        `).then(result => {
    const guideTemplate = path.resolve(`src/templates/guide.js`);
    const blogs = result.data.allContentfulBlog.edges
    const blogsPerPage = 9;
    const noOfPages = Math.ceil(blogs.length / 9)
    Array.from({ length: noOfPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? '/category/guide' : `/category/guide/${i + 1}`,
        component: path.resolve(guideTemplate),
        context: {
          limit: blogsPerPage,
          skip: i * blogsPerPage,
          noOfPages,
          currentPage: i + 1
        }
      })
    })
  })

  //create opinion categry page, including pagination 
  const getOpinion = makeRequest(graphql, `
        query MyQuery {
          allContentfulBlog(filter: {node_locale: {eq: "en-US"}, category: {elemMatch: {title: {eq: "Opinion"}}}}, sort: {order: DESC, fields: createdAt}) {
            edges {
              node {
                id
                title
              }
            }
          }
        }
        
          
        `).then(result => {
    const opinionTemplate = path.resolve(`src/templates/opinion.js`);
    const blogs = result.data.allContentfulBlog.edges
    const blogsPerPage = 9;
    const noOfPages = Math.ceil(blogs.length / 9)
    Array.from({ length: noOfPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? '/category/opinion' : `/category/opinion/${i + 1}`,
        component: path.resolve(opinionTemplate),
        context: {
          limit: blogsPerPage,
          skip: i * blogsPerPage,
          noOfPages,
          currentPage: i + 1
        }
      })
    })
  })

  //create guide categry page, including pagination 
  const getTech = makeRequest(graphql, `
        query MyQuery {
          allContentfulBlog(filter: {node_locale: {eq: "en-US"}, category: {elemMatch: {title: {eq: "Tech"}}}}, sort: {order: DESC, fields: createdAt}) {
            edges {
              node {
                id
                title
              }
            }
          }
        }
        
          
        `).then(result => {
    const techTemplate = path.resolve(`src/templates/tech.js`);
    const blogs = result.data.allContentfulBlog.edges
    const blogsPerPage = 9;
    const noOfPages = Math.ceil(blogs.length / 9)
    Array.from({ length: noOfPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? '/category/tech' : `/category/tech/${i + 1}`,
        component: path.resolve(techTemplate),
        context: {
          limit: blogsPerPage,
          skip: i * blogsPerPage,
          noOfPages,
          currentPage: i + 1
        }
      })
    })
  })



  return Promise.all([
    getBlog,
    getArchive,
    getTravel,
    getOpinion,
    getGuide,
    getTech,
  ])
}

