// controllers/contactController.js
import Contact from "../models/contactModel.js";

// Create a new contact message
export const createContact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();
    res.status(201).json({ success: true, message: "Contact message sent successfully!" });
  } catch (error) {
    console.error("Error in saving contact form:", error);
    res.status(500).json({ success: false, message: "Failed to send message. Please try again later." });
  }
};
