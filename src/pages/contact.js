import React from "react"
import { Link, navigate } from "gatsby"
import Nav from '../components/nav'
import Featured from '../components/featured'
import Home from '../components/home'
import Layout from "../components/layout"
import Footer from "../components/footer"
// import Image from "../components/image"
import SEO from "../components/seo"
import './contact.css'


const ContactPage = () => {
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const form = e.target;
    //     navigate(form.getAttribute('action'));
    // }

    return (<Layout>
        <SEO title="Contact" />
        <Nav />
        <div className="contact__header"></div>
        <div className="contact__section">
            <div className="contact__form">
                <h1>Contact</h1>
                <div className="inner">
                    <form method='post' name='contact' action='/thanks' data-netlify='true' netlify-honeypot='bot'>
                        <input type="hidden" name='form-name' value='contact' />
                        <div className="field__hidden">
                            <label>Don't fill this out, human</label>
                            <input name="bot" />
                        </div>
                        <div className="field">
                            <label>Name</label>
                            <input type="text" name="name" />
                        </div>
                        <div className="field">
                            <label>Email</label>
                            <input type="text" name="email" />
                        </div>
                        <div className="field">
                            <label>Message</label>
                            <textarea name="message" rows='6'></textarea>
                        </div>
                        <div className="submit">
                            <button type="submit" className="btn__med">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </Layout>
    )
}

export default ContactPage
