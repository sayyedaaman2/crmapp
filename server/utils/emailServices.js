const { companyEmail } = require("./constants");
const sendEmail = require("./notificationClient");

const registerUser = async (data) => {
  try {
    const { email, name } = data;

    const mailOptions = {
      from: companyEmail,
      to: email,
      subject: `Successful Registration for Customer Relationship Management System`,
      text: `convert for the html Subject: 

        Dear ${name},
        
        I am writing to inform you that your registration for our Customer Relationship Management (CRM) system has been successfully completed. You can now access our CRM platform and take advantage of its many features to improve your customer engagement and drive business growth.
        
        Our CRM system is designed to help you manage and organize customer information, track interactions, and streamline communication with your customers. It provides a centralized platform where you can access customer data, generate reports, and analyze customer behavior to make informed decisions.
        
        To access our CRM system, please use the login details you provided during registration. If you have forgotten your login credentials or have any trouble accessing the platform, please contact our support team, and they will be happy to assist you.
        
        We are committed to providing you with the best possible customer service and support, and we believe our CRM system will help you achieve your business goals. We are excited to have you as a customer and look forward to helping you grow your business.
        
        Thank you for choosing our CRM system.
        
        Best regards,
        
        Sayyed Aaman
        
        Customer Relation Management`,
      html: `<div>
        <h2>Successful Registration for Customer Relationship Management System</h2>
        <p>Dear ${name},</p>
        <p>I am writing to inform you that your registration for our Customer Relationship Management (CRM) system has been successfully completed. You can now access our CRM platform and take advantage of its many features to improve your customer engagement and drive business growth.</p>
        <p>Our CRM system is designed to help you manage and organize customer information, track interactions, and streamline communication with your customers. It provides a centralized platform where you can access customer data, generate reports, and analyze customer behavior to make informed decisions.</p>
        <p>To access our CRM system, please use the login details you provided during registration. If you have forgotten your login credentials or have any trouble accessing the platform, please contact our support team, and they will be happy to assist you.</p>
        <p>We are committed to providing you with the best possible customer service and support, and we believe our CRM system will help you achieve your business goals. We are excited to have you as a customer and look forward to helping you grow your business.</p>
        <p>Thank you for choosing our CRM system.</p>
        <p>Best regards,</p>
        <p>Sayyed Aaman</p>
        <p>Customer Relation Management</p>
      </div>
      `,
    };
    const response = await sendEmail(mailOptions);
    console.log(response);
  } catch (error) {
    console.log(`Some Error while the sending register Email`);
    throw error;
  }
};

module.exports = {
  registerUser,
};
