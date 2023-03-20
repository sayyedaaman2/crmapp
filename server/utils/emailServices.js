const { companyEmail } = require("./constants");
const sendEmail = require("./notificationClient");

const registerUser = async (data) => {
  try {
    const { email, name } = data;

    const mailOptions = {
      from: companyEmail,
      to: email,
      subject: `Successful Registration for Customer Relationship Management System`,
      text: `

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

const createTicket = async (data) => {
  try {

    /**
     * write email for  CUSTOMER:done | ENGINEER;
     */
    const {user, ticket, engineer} = data;
    console.log(data);
    const userEmail = {
      from: companyEmail,
      to: user.email,
      subject: `Your Ticket Has Been Successfully Created`,
      text: `Dear ${user.name},

      I am writing to inform you that your ticket has been successfully created in our CRM app. We are excited to work with you to resolve any issues or concerns you may have.
      
      Your ticket number is ${ticket._id}, which you can use to track the status of your ticket. Our support team will be working diligently to address your concerns as soon as possible.
      
      If you have any further questions or concerns, please do not hesitate to contact us through the CRM app or by replying to this email.
      
      Thank you for choosing our company for your needs. We look forward to resolving your issue and providing you with excellent customer service.
      
      Best regards,
      Sayyed Aaman
      Customer Relation Management`,
      html: `
      <div>
        <p>Dear ${user.name},</p>
        <p>
          I am writing to inform you that your ticket has been successfully created
          in our CRM app. We are excited to work with you to resolve any issues or
          concerns you may have.
        </p>
        <p>
          Your ticket number is ${ticket._id}, which you can use to track the
          status of your ticket. Our support team will be working diligently to
          address your concerns as soon as possible.
        </p>
        <p>
          If you have any further questions or concerns, please do not hesitate to
          contact us through the CRM app or by replying to this email.
        </p>
        <p>
          Thank you for choosing our company for your needs. We look forward to
          resolving your issue and providing you with excellent customer service.
        </p>
        <p>Best regards,</p>
        <p>Sayyed Aaman</p>
        <p> Customer Relation Management</p>
      </div>
      `,
    };





const engMail = {
  from: companyEmail,
  to: engineer.email,
  subject: `New Ticket Assigned to You - ${ticket._id}`,
  text: `Dear ${engineer.name},

  I hope this email finds you well. I am writing to inform you that a new ticket has been assigned to you in our CRM app. The ticket number is [Ticket Number].
  
  As the assigned engineer for this ticket, you will be responsible for investigating and resolving the issue reported by our valued customer. We trust in your expertise and dedication to providing excellent service to our customers.
  
  Please review the ticket details carefully and reach out to the customer as soon as possible to begin resolving the issue. If you need any assistance or have any questions, please do not hesitate to contact me or the support team.
  
  Thank you for your hard work and dedication to our company. We appreciate your efforts in resolving this issue and providing excellent customer service.
  
  Best regards,
  Sayyed Aaman
  Customer Relation Management`,
  html: `
  <div>
    <p>Dear ${engineer.name},</p>
    <p>
      I am writing to inform you that your ticket has been successfully created
      in our CRM app. We are excited to work with you to resolve any issues or
      concerns you may have.
    </p>
    <p>
      Your ticket number is ${ticket._id}, which you can use to track the
      status of your ticket. Our support team will be working diligently to
      address your concerns as soon as possible.
    </p>
    <p>
      If you have any further questions or concerns, please do not hesitate to
      contact us through the CRM app or by replying to this email.
    </p>
    <p>
      Thank you for choosing our company for your needs. We look forward to
      resolving your issue and providing you with excellent customer service.
    </p>
    <p>Best regards,</p>
    <p>Sayyed Aaman</p>
    <p> Customer Relation Management</p>
  </div>
  `,
};
    //todo: solve the email sending problem
    const responseUser = await sendEmail(userEmail);
    // const responseEng = await sendEmail(engMail);

    console.log(responseUser);
    // console.log(responseEng);

  } catch (error) {
    console.log(`Some Error while the sending register Email`);
    throw error;
  }
};

module.exports = {
  registerUser,
  createTicket
};
