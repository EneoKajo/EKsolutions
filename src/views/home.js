import React from "react";
import '../style/home.css'
import laptop from '../images/laptop.jpg'
import { useState } from 'react';
import step1 from '../images/step1.png';
import step2 from '../images/step2.png';
import step3 from '../images/step3.png';
import step4 from '../images/step4.png';
import step5 from '../images/step5.png';


function Home(){
  const [currentStep, setCurrentStep] = useState(0);
  const[formData, setFormData] = useState({
    name:"",
    email: "",
    phone:"",
    business:"",
    message:"",

  })

  const[status, setStatus] = useState("idle");


  const steps = [
    {
      number: 1,
      title: "Open the Converter",
      description: "Launch the bank statement converter application on your computer",
      image: step1
    },
    {
      number: 2,
      title: "Upload Your Statement",
      description: "Click the upload button and select your PDF bank statement",
      image: step2
    },
    {
      number: 3,
      title: "Select Bank & Extract",
      description: "Choose your bank (BKT, Union Bank, Raiffeisen, or OTP) and click extract",
      image: step3
    },
    {
      number: 4,
      title: "Wait for Processing",
      description: "The software automatically extracts and organizes all transaction data",
      image: step4
    },
    {
      number: 5,
      title: "Open Excel Workbook",
      description: "Click to open your converted spreadsheet, ready for accounting software",
      image: step5
    }
  ];

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  const goToStep = (index) => {
    setCurrentStep(index);
  };

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value});

  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setStatus("loading");

    try{
      const response = await fetch("https://formspree.io/f/xaqdaokl", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData),
      });

      if (response.ok){
        setStatus("success");
        setFormData({name:"", email:"", phone:"", business:"", message:""});
      }else{
        setStatus("error");
      }
    }catch{
      setStatus("error")
    }


  }

  return(
    <div className="home-container">

      {/* Header */}
      <div className="header">
        <div className="title-container">
          <p className="title">EK Solutions</p>
        </div>
        <div className="banner-container">
          <p className="banner">Software, Web Apps & Automation for Finance Professionals</p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero-continaer">
        <div className="hero-left">
          <div className="hero-title-container">
            <p className="hero-title">What we do</p>
          </div>

          <div className="hero-description-container">
            <p className="hero-description">
              We build custom software and automation tools for finance professionals in Albania.
              Our solutions streamline accounting workflows, eliminate manual data entry, and help
              businesses save time on repetitive tasks.
            </p>
          </div>
        </div>

        <div className="hero-rigth">
          <div className="image-container">
            <img src={laptop} alt="Laptop" />
          </div>
        </div>
      </div>

      {/* First product introduction */}
      <div className="first-product-wrapper">
        <div className="first-product">
          <p className="first-prod-1">Introducing EKonverter</p>
          <p className="first-prod-2">From bank statement to Excel with ease</p>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="how-it-works">
        <div className="how-container">

          <h2 className="how-title">How It Works</h2>

          <p className="how-subtitle">
            Transform your bank statements in five simple steps
          </p>

          {/* Slideshow */}
          <div className="slideshow-container">

            {/* Navigation Arrows - Desktop only */}
            <button className="slide-arrow slide-arrow-left" onClick={prevStep}>
              ‹
            </button>

            {/* Slides */}
            <div className="slides-wrapper">
              <div
                className="slides-track"
                style={{ transform: `translateX(-${currentStep * 100}%)` }}
              >
                {steps.map((step, index) => (
                  <div className="slide" key={index}>
                    <div className="slide-content">
                      <div className="step-number">{step.number}</div>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                      <div className="step-image">
                        <img src={step.image} alt={step.title} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows - Desktop only */}
            <button className="slide-arrow slide-arrow-right" onClick={nextStep}>
              ›
            </button>

            {/* Dots Navigation */}
            <div className="slide-dots">
              {steps.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${currentStep === index ? 'dot-active' : ''}`}
                  onClick={() => goToStep(index)}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>

          </div>

          {/* Demo Download Section */}
          <div className="demo-section">
            <h3>Try It Yourself</h3>
            <p>Download our demo converter and test it with your own bank statements</p>
            <a href="https://drive.google.com/drive/folders/1630Q6b444IOV5hYxX3DVFn7-QQFO59V_?usp=sharing" target="_blank" rel="noopener noreferrer">
            <button className="demo-button">Download Free Demo</button>
            <br></br>
            <br></br>
            <p>If Google Drive shows a virus scan warning, click 'Download anyway' — this is normal for zip files and the software is safe.</p>
            </a>
          </div>

          {/* Features Grid */}
          <div className="features-grid">
            <div className="feature">
              <h3>Supports Multiple Banks</h3>
              <p>Currently works with BKT, Union Bank, Raiffeisen, and OTP, with more Albanian banks coming soon</p>
            </div>

            <div className="feature">
              <h3>Saves Hours of Manual Work</h3>
              <p>Convert months of transactions in seconds, not hours</p>
            </div>

            <div className="feature">
              <h3>Preserves All Transaction Data</h3>
              <p>Dates, amounts, descriptions, and balances—nothing gets lost</p>
            </div>

            <div className="feature">
              <h3>Works Offline</h3>
              <p>Your financial data stays on your computer, completely private</p>
            </div>

            <div className="feature">
              <h3>Handles Multi-Page Statements</h3>
              <p>Process entire statement files, no matter how long</p>
            </div>

            <div className="feature">
              <h3>Affordable Pricing</h3>
              <p>Professional-grade tool at a price small businesses can afford</p>
            </div>
          </div>

        </div>
      </div>

      {/* Contact Section */}
      <div className="contact-section">
        <div className="contact-section-inner">
          <h2 className="contact-title">Contact Us</h2>
          <p className="contact-subtitle">Get in touch — we'd love to hear from you.</p>

          <div className="contact-layout">

            {/* Info Panel */}
            <div className="contact-info-panel">
              <h3>Reach Us Directly</h3>
              <p>Prefer to reach out right away? Send us an email at:</p>
              <a href="mailto:kajoeneo2001@gmail.com" className="direct-email">
                kajoeneo2001@gmail.com
              </a>
              <p className="contact-or">Or fill out the form and we'll get back to you shortly.</p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input type="text" id="name" name="name" value={formData.name}
                  onChange={handleChange} required placeholder="Your name" />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" name="email" value={formData.email}
                  onChange={handleChange} required placeholder="you@example.com" />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <input type="tel" id="phone" name="phone" value={formData.phone}
                  onChange={handleChange} required placeholder="+1 234 567 8900" />
              </div>

              <div className="form-group">
                <label htmlFor="business">Business Name <span className="optional">(optional)</span></label>
                <input type="text" id="business" name="business" value={formData.business}
                  onChange={handleChange} placeholder="Your company" />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea id="message" name="message" value={formData.message}
                  onChange={handleChange} required placeholder="How can we help?" rows={5} />
              </div>

              <button type="submit" disabled={status === "loading"} className="submit-btn">
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && <p className="msg success">Thanks! We'll be in touch soon.</p>}
              {status === "error" && <p className="msg error">Something went wrong. Please try again.</p>}
            </form>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Home
