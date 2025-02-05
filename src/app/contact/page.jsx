"use client"

import { useState } from "react"
import {FaEnvelope, FaMapMarkerAlt } from "react-icons"


const page = () => {
  const [ formData , setFormData ] = useState({name:'', email:"", message:""})

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    //handle form submission logic
  };

  return(
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center py-12 px-6">
    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Contact Us</h1>
    
    <div className="w-full max-w-3xl bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl dark:bg-gray-700 dark:text-white"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl dark:bg-gray-700 dark:text-white"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl dark:bg-gray-700 dark:text-white"
          rows="5"
          required
        ></textarea>
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700">Send Message</button>
      </form>
    </div>
    
    <div className="mt-12 w-full max-w-3xl">
      {/* <div className="flex items-center space-x-4 text-gray-800 dark:text-white">
        <FaMapMarkerAlt size={24} />
        <p>Nairobi, Kenya</p>
      </div> */}
      <div className="flex items-center space-x-4 mt-4 text-gray-800 dark:text-white">
        {/* <FaEnvelope size={24} /> */}
        <p>support@scribbly.com</p>
      </div>
    </div>
    
    <div className="mt-8 w-full max-w-3xl h-64">
      <iframe
        className="w-full h-full rounded-xl"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.093172747502!2d36.8219467!3d-1.2863891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d4d2c9a47b%3A0x121faaf3c8f4dd0b!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1639075685105!5m2!1sen!2sus"
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  </div>

  )
}

export default page;