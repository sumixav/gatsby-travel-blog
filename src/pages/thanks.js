import React from "react"
import { Link } from "gatsby"
import Nav from '../components/nav'
import Layout from "../components/layout"

// import Image from "../components/image"
import SEO from "../components/seo"
import './contact.css'

const ThanksPage = () => (
  <Layout>
    <SEO title="Contact" />
    <Nav />
    <div className="contact__header"></div>
    <div className="contact__thanks">

      <h1>Thanks. I'll be in contact soon</h1>

    </div>


  </Layout>
)

export default ThanksPage
