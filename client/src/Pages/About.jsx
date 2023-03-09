
function About() {
    return (
        <>
        <div id="about-container">
            <div className="about-title">
                <h1>About Us</h1>
            </div>
            <div className="aboutUs-information">
                <h1 className="about-heading">What is Customer Realtionship Management (CRM) ?</h1>
                <p className="about-paragraph">Customer relationship management refers to the art of managing good customer relationships and prospective customers. It is all about understanding who your customers and potential customers are, and nurturing the relationships you have with them. It is about identifying client expectations and how you meet or go beyond their expectations.</p>
                <p className="about-paragraph">A customer relationship model seeks to improve the relationship between a business and the customer. For this, they drive new trends and provide profits for current and future operations and investments.</p>
                <p className="about-paragraph">The below model is one approach to implement CRM.</p>
                {/* <img src="https://www.revechat.com/wp-content/uploads/2019/09/customer-relationship-model-1.jpg" alt="about-crm-img"/> */}
                <p className="about-paragraph">Customer relationship management model can be further categorized into below stages</p>
                <ul className="about-unorderlist">
                    <li className="about-list"><b>Awareness –</b><p className="list-par">It is the first touchpoint where prospects try to know more about your brand as a whole.</p></li>
                    <li className="about-list"><b>Discovery –</b><p className="list-par">Then you learn and identify the needs of the prospects and share information to fulfill their requirements.</p></li>
                    <li className="about-list"><b>Evaluation –</b><p className="list-par">Moving ahead the prospects compare and evaluate your products/services with your competitors.</p></li>
                    <li className="about-list"><b>Intent –</b><p className="list-par">Finally your prospect is convinced and made a decision of buying from you.</p></li>
                    <li className="about-list"><b>Purchase – </b><p className="list-par">After making the payment the deal is done and the prospect converts into your customer.</p></li>
                    <li className="about-list"><b>Loyalty – </b><p className="list-par">Make a follow-up after purchase to determine customer success with your product and ask for referrals. </p></li>

                </ul>


            </div>

            <div className="about-footer"></div>
        </div>
        </>
    )
}

export default About;